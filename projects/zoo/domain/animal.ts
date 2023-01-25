export class Animal {
  constructor(public sound: string) {
  }

  speak(text: string) {
    return text
      .split(' ')
      .map(word => `${word} ${this.sound}`)
      .join(' ');
  }
}
