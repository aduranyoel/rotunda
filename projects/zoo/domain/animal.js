export class Animal {
    constructor(sound) {
        this.sound = sound;
    }

    speak(text) {
        return text.split(' ').map(word => `${ word } ${ this.sound }`).join(' ');
    }
}
