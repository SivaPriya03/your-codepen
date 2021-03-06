const { promises } = require('fs');
const errorPage = require('../constants/errorPage.js');
const getHTMLStr = require('../constants/htmlStr.js');
const getAllFilePaths = (reqPath, serverDIR, appConst) => {
    const getParentDirPath = (ext) => {
        let pathResource = reqPath.split('/')[1];
        return `${serverDIR}/${appConst}/${pathResource}/index.${ext}`;
    }
    return { html: getParentDirPath('html'), css: getParentDirPath('css'), js: getParentDirPath('js') } 
}

const readFile = (filePath) => {
    return promises.readFile(filePath, "utf8")
}

const getPathNameOfStatic = (reqPath, serverDIR, appConst) => {
    const { html, css, js } = getAllFilePaths(reqPath, serverDIR, appConst);
    return Promise.all([
        readFile(html),
        readFile(css),
        readFile(js)
    ]).then(([html, css, js]) => {
        return getHTMLStr(html, css, js);
    }).catch(err => {
        if(err.code === 'ENOENT')
            return errorPage;
        else {
            return 'Unexpected error occurred'
        }
    })
}

const isBlackListedURL = (reqPath) => {
    const blackList = ['/favicon.ico'];
    return blackList.indexOf(reqPath) !== -1;
}
module.exports = {
    getPathNameOfStatic,
    isBlackListedURL
}