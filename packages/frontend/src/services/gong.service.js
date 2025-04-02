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
        console.log('Setting volume to', volume);
        this.audio.volume = volume;
    }
}

export const gongService = new GongService('/bowl.ogg');