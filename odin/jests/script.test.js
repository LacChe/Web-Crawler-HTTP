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

test('caesarCipher', () => {
    expect(caesarCipher('abc', -1)).toBe(null);
    expect(caesarCipher('', 1)).toBe('');
    expect(caesarCipher('abc', 3)).toBe('def');
    expect(caesarCipher('aBc', 3)).toBe('dEf');
    expect(caesarCipher('Defend the east wall of the castle!', 1)).toBe('Efgfoe uif fbtu xbmm pg uif dbtumf!');
});

test('analyzeArray', () => {
    let object = {
        average: 4,
        min: 1,
        max: 8,
        length: 6
      };
      expect(analyzeArray([1,8,3,4,2,6])).toStrictEqual(object);
      expect(analyzeArray([1,8,3,4,'a',6])).toStrictEqual(null);
});