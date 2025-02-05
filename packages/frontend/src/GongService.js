class GongService {
    constructor(audioFilePath) {
        this.audio = new Audio(audioFilePath);
    }

    play() {
        this.stop();
        this.audio.currentTime = 0;
        this.audio.volume = 1;
        this.audio.play();
    }

    fadeOut() {
        const fadeOutInterval = setInterval(() => {
            if (this.audio.volume > 0.2) {
                this.audio.volume -= 0.2;
            } else {
                clearInterval(fadeOutInterval);
            }
        }, 100);
    }

    stop() {
        this.audio.pause();
    }
    getDuration() {
        return this.audio.duration;
    }

    isPlaying(){
        return !this.audio.paused;
    }
}

export const gongService = new GongService('/bowl.ogg');