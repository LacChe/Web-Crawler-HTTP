const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sortPages sorts pages', () => {
    const input = {
        'url1': 3,
        'url2': 5,
        'url3': 7,
        'url4': 9
    }
    const actual = sortPages(input);
    const expected = [
        ['url4', 9],
        ['url3', 7],
        ['url2', 5],
        ['url1', 3]
    ]
    expect(actual).toEqual(expected);
})