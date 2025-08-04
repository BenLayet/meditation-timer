export class GongService {
  constructor(audioFilePath) {
    this.audio = new Audio(audioFilePath);
  }

  play = async () => {
    await this.stop();
    this.audio.currentTime = 0;
    await this.audio.play();
  };

  stop = async () => {
    await this.audio.pause();
    this.audio.currentTime = 0;
  };

  volumeOff = () => {
    this.audio.volume = 0;
  };
  volumeOn = () => {
    this.audio.volume = 1;
  };
}
