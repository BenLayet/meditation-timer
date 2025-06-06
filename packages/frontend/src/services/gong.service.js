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
    this.audio.currentTime = 0;
  };

  volumeOff = () => {
    this.audio.volume = 0;
  };
  volumeOn = () => {
    this.audio.volume = 1;
  };
}

export const gongService = new GongService("/bowl.ogg");
