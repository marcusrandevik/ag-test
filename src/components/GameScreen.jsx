import React, { useState, useEffect, useRef } from 'react';
import Grid from './Grid';
import storageService from '../services/StorageService';
import audioService from '../services/AudioService';
import i18n from '../i18n/i18n';

const GameScreen = ({ selectedTables, onEndGame, onGameComplete, limitQuestions, questionLimit }) => {
    const [gridState, setGridState] = useState({});
    const gridStateRef = useRef({});
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isGameActive, setIsGameActive] = useState(true);
    const [correctGuesses, setCorrectGuesses] = useState(0);
    const [totalGuesses, setTotalGuesses] = useState(0);
    const correctGuessesRef = useRef(0);
    const totalGuessesRef = useRef(0);
    const inputRef = useRef(null);

    // Store the available questions for this game session
    const [availableQuestions, setAvailableQuestions] = useState([]);
    const availableQuestionsRef = useRef([]);

    // Ref to store the start time of the game
    const startTimeRef = useRef(Date.now());
    // Ref to store the interval ID
    const timerIntervalRef = useRef(null);

    // Update ref whenever gridState changes
    useEffect(() => {
        gridStateRef.current = gridState;
    }, [gridState]);

    // Initialize game and start timer
    useEffect(() => {
        // Generate all possible questions
        const allQuestions = [];
        selectedTables.forEach(row => {
            for (let col = 1; col <= 10; col++) {
                allQuestions.push({ row, col });
            }
        });

        // If limiting questions, randomly select a subset
        let questionsToUse;
        if (limitQuestions && questionLimit < allQuestions.length) {
            // Shuffle and take the first N questions
            const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
            questionsToUse = shuffled.slice(0, questionLimit);
        } else {
            questionsToUse = allQuestions;
        }

        setAvailableQuestions(questionsToUse);
        availableQuestionsRef.current = questionsToUse;

        generateQuestion();
        startTimeRef.current = Date.now();
        setIsGameActive(true);
    }, []);

    // Effect to manage the timer interval
    useEffect(() => {
        if (isGameActive) {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
            timerIntervalRef.current = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
            }, 1000);
        } else {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        }

        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, [isGameActive]);

    // Focus input when question changes
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentQuestion]);

    const generateQuestion = () => {
        const currentGridState = gridStateRef.current;
        const possibleQuestions = [];

        // Use the predefined available questions instead of all possible questions
        availableQuestionsRef.current.forEach(({ row, col }) => {
            const key = `${row}-${col}`;
            if (currentGridState[key] !== 'correct' && currentGridState[key] !== 'incorrect') {
                possibleQuestions.push({ row, col });
            }
        });

        if (possibleQuestions.length === 0) {
            setIsGameActive(false);

            // Play completion sound
            audioService.playGameComplete();

            // Save game result to storage using ref values for accuracy
            const gameResult = {
                correctGuesses: correctGuessesRef.current,
                totalGuesses: totalGuessesRef.current,
                timeSeconds: elapsedTime,
                selectedTables: selectedTables
            };

            storageService.saveGameResult(selectedTables, gameResult);

            // Notify parent component that game is complete
            if (onGameComplete) {
                onGameComplete(gameResult);
            }

            setMessage(i18n.t('common.gameOver', {
                correct: correctGuessesRef.current,
                total: totalGuessesRef.current,
                time: elapsedTime
            }));
            setCurrentQuestion(null);
            return;
        }

        const randomIndex = Math.floor(Math.random() * possibleQuestions.length);
        setCurrentQuestion(possibleQuestions[randomIndex]);
        setUserAnswer('');
        setMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentQuestion) return;

        // Initialize audio on first interaction
        audioService.init();

        const correctAnswer = currentQuestion.row * currentQuestion.col;
        const userInt = parseInt(userAnswer, 10);
        const cellKey = `${currentQuestion.row}-${currentQuestion.col}`;

        // Increment total guesses
        totalGuessesRef.current += 1;
        setTotalGuesses(prev => prev + 1);

        if (userInt === correctAnswer) {
            // Increment correct guesses
            correctGuessesRef.current += 1;
            setCorrectGuesses(prev => prev + 1);

            const newGridState = {
                ...gridStateRef.current,
                [cellKey]: 'correct'
            };
            setGridState(newGridState);
            gridStateRef.current = newGridState;
            audioService.playCorrect();
            generateQuestion();
        } else {
            const newGridState = {
                ...gridStateRef.current,
                [cellKey]: 'incorrect'
            };
            setGridState(newGridState);
            gridStateRef.current = newGridState;
            audioService.playIncorrect();
            generateQuestion();
        }
    };

    return (
        <div className="game-screen">
            <div className="game-header">
                <button className="back-btn" onClick={onEndGame}>{i18n.t('game.back')}</button>
                <h2>{i18n.t('game.timeLabel', { time: elapsedTime })}</h2>
            </div>

            <div className="game-layout">
                <div className="grid-wrapper">
                    <Grid gridState={gridState} selectedTables={selectedTables} />
                </div>

                <div className="control-panel">
                    {currentQuestion ? (
                        <form onSubmit={handleSubmit} className="question-form">
                            <div className="question-display">
                                {i18n.t('game.questionFormat', { a: currentQuestion.row, b: currentQuestion.col })}
                            </div>
                            <input
                                ref={inputRef}
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className="answer-input"
                                placeholder={i18n.t('game.placeholder')}
                            />
                            <button type="submit" className="submit-btn">{i18n.t('game.checkButton')}</button>
                        </form>
                    ) : (
                        <div className="game-over">
                            <h3>{i18n.t('common.allDone')}</h3>
                            <button className="restart-btn" onClick={onEndGame}>{i18n.t('results.playAgain')}</button>
                        </div>
                    )}
                    {message && <div className={`message ${message.includes('!') ? 'success' : 'error'}`}>{message}</div>}
                </div>
            </div>
        </div>
    );
};

export default GameScreen;
