import {Lion} from "./domain/lion.js";
import {Tiger} from "./domain/tiger.js";


describe('Zoo', () => {
    describe('When animals speak', () => {
        test('should interspersed sound', () => {
            const lion = new Lion();
            const tiger = new Tiger();

            const lionSay = lion.speak(`I'm a lion`);
            const tigerSay = tiger.speak('Lions suck');

            expect(lionSay).toBe(`I'm roar a roar lion roar`);
            expect(tigerSay).toBe('Lions grrr suck grrr');
        });
    })
});
