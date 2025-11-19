/**
 * Audio utility for game sound effects
 * Uses Web Audio API to generate simple tones
 */
class AudioService {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
    }

    /**
     * Initialize audio context (must be called after user interaction)
     */
    init() {
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (error) {
                console.warn('Web Audio API not supported:', error);
                this.enabled = false;
            }
        }
    }

    /**
     * Play a tone
     * @param {number} frequency - Frequency in Hz
     * @param {number} duration - Duration in milliseconds
     * @param {string} type - Oscillator type ('sine', 'square', 'sawtooth', 'triangle')
     */
    playTone(frequency, duration, type = 'sine') {
        if (!this.enabled || !this.audioContext) {
            this.init();
            if (!this.enabled || !this.audioContext) return;
        }

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        // Envelope for smoother sound
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }

    /**
     * Play success sound (ascending tones)
     */
    playCorrect() {
        this.playTone(523.25, 100); // C5
        setTimeout(() => this.playTone(659.25, 150), 80); // E5
    }

    /**
     * Play error sound (descending tone)
     */
    playIncorrect() {
        this.playTone(392, 200, 'square'); // G4
        setTimeout(() => this.playTone(293.66, 200, 'square'), 100); // D4
    }

    /**
     * Play game complete sound
     */
    playGameComplete() {
        this.playTone(523.25, 150); // C5
        setTimeout(() => this.playTone(659.25, 150), 120); // E5
        setTimeout(() => this.playTone(783.99, 300), 240); // G5
    }

    /**
     * Toggle audio on/off
     */
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// Export singleton instance
const audioService = new AudioService();
export default audioService;
