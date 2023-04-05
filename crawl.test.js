const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL strips protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL strips trailing slashes', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL removes capitals', () => {
    const input = 'https://BLOG.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL strips protocol', () => {
    const input = 'http://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML absolute URLs', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href='https://blog.boot.dev/path/'>Boot.dev blog</a>
            </body>
        </html>
    `;
    const inputBaseURL = 'blog.boot.dev/path/';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
        'https://blog.boot.dev/path/'
    ];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML relative URLs', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href='/path/'>Boot.dev blog</a>
            </body>
        </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
        'https://blog.boot.dev/path/'
    ];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML multiple URLs', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href='/path1/'>Boot.dev blog 1</a>
                <a href='https://blog.boot.dev/path2/'>Boot.dev blog 2</a>
            </body>
        </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
        'https://blog.boot.dev/path1/',
        'https://blog.boot.dev/path2/'
    ];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML dont include invalid URL', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href='invalid'>Bad URL</a>
            </body>
        </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})