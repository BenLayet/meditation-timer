class GongService {
    constructor(audioFilePath) {
        this.audio = new Audio(audioFilePath);
    }

    play = () => {
        this.stop();
        this.audio.currentTime = 0;
        this.audio.play().then();
    };

    stop = () => {
        this.audio.pause();
    };

    setVolume = (volume) => {
        this.audio.volume = volume / 100;
    }
}

export const gongService = new GongService('/bowl.ogg');