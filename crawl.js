const { JSDOM } = require('jsdom');

async function crawlPage(currentPage){
    console.log('crawling');
    try {
        const resp = await fetch(currentPage);
        if(resp.status > 399){
            console.log(`error in fetch with status code ${resp.status} on page ${currentPage}`);
            return;
        }

        const contentType = resp.headers.get('content-type');
        if(!contentType.includes('text/html')){
            console.log(`non html response, content type ${contentType}`);
            return;
        }

        console.log(await resp.text());

    } catch(err) {
        console.log(`error in fetch: ${err.message}`)
    }
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls =[];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const le of linkElements){
        if(le.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${le.href}`);
                urls.push(urlObj.href);
            } catch (err){
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            try {
                const urlObj = new URL(`${le.href}`);
                urls.push(urlObj.href);
            } catch (err){
                console.log(`error with relative url: ${err.message}`)
            }
        }
    }
    return urls;
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) ==='/') {
        return hostPath.slice(0, -1);
    }
    return `${urlObj.hostname}${urlObj.pathname}`;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}