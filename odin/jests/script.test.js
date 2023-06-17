import { capitalize, reverseString, calculator, caesarCipher, analyzeArray } from './script.js';

test('capitalize', () => {
    expect(capitalize('asd')).toBe('Asd');
    expect(capitalize('123')).toBe('123');
    expect(capitalize('ZXC')).toBe('ZXC');
});

test('reverseString', () => {
    expect(reverseString('ada')).toBe('ada');
    expect(reverseString('word')).toBe('drow');
});

test('calculator', () => {
    let calc = calculator();
    expect(calc.add(1, 2)).toBe(3);
    expect(calc.add(6, -2)).toBe(4);
    expect(calc.subtract(1, 2)).toBe(-1);
    expect(calc.subtract(6, -2)).toBe(8);
    expect(calc.divide(1, 2)).toBe(0.5);
    expect(calc.divide(6, -2)).toBe(-3);
    expect(calc.multiply(1, 2)).toBe(2);
    expect(calc.multiply(6, -2)).toBe(-12);
});