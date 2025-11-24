export default {
    // Selection Screen
    selection: {
        title: "Juego de Multiplicación",
        subtitle: "Selecciona las tablas que quieres practicar:",
        start: "Comenzar juego",
        viewHistory: "Ver historial",
        limitQuestions: "Limitar número de preguntas",
        outOf: "de {total} preguntas",
    },

    // Game Screen
    game: {
        back: "Atrás",
        timeLabel: "Tiempo: {time} segundos",
        questionFormat: "{a} x {b} =",
        placeholder: "?",
        checkButton: "Comprobar",
    },

    // Game Results
    results: {
        title: "¡Juego completado! 🎉",
        scoreLabel: "Puntuación",
        score: "Puntuación",
        correct: "Correcto",
        time: "Tiempo",
        avgTime: "Tiempo prom.",
        date: "Fecha",
        scoreFormat: "{correct}/{total}",
        accuracyFormat: "{accuracy}% de precisión",
        timeLabel: "Tiempo",
        timeValue: "{time}s",
        timeFeedback: {
            fast: "¡Rapidísimo!",
            good: "¡Buen ritmo!",
            slow: "¡Sigue practicando!",
        },
        tablesLabel: "Tablas",
        tables: "Tablas",
        tablesCount: "{count} tabla",
        tablesCountPlural: "{count} tablas",
        avgTimeLabel: "Tiempo prom.",
        avgTimeSubtitle: "Por pregunta",
        playAgain: "Jugar de nuevo",
        backToMenu: "Volver al menú",
        share: "Compartir resultados",
        generating: "Generando...",
    },

    // History Screen
    history: {
        title: "Historial",
        noData: "Aún no se han jugado partidas.",
        noDataForFilter: "No se encontraron partidas para este filtro.",
        detailsTitle: "Detalles de la partida",
        filterLabel: "Filtrar por tablas",
        allTables: "Todas las tablas",
        boardState: "Resultados",
    },

    // Progress Chart
    chart: {
        title: "Historial de progreso",
        noData: "Aún no hay intentos previos. ¡Sigue jugando para seguir tu progreso!",
        attemptLabel: "#{number}",
        bestLabel: "Mejor:",
        averageLabel: "Promedio:",
        totalAttemptsLabel: "Total de intentos:",
    },

    // Common
    common: {
        correct: "¡Correcto!",
        incorrect: "¡Incorrecto! Era {answer}",
        gameOver: "¡Juego terminado! Puntuación: {correct}/{total} correctas. Tiempo: {time}s",
        allDone: "¡Completado!",
    },
};
