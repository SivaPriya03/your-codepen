import { promises } from 'fs'
import { appConst } from '../../constants/index.js';
import getHTMLStr from '../constants/htmlStr.js';
const getAllFilePaths = (reqPath, serverDIR) => {
    const getParentDirPath = (ext) => {
        let pathResource = reqPath.split('/')[1];
        return `${serverDIR}/${appConst}/${pathResource}/index.${ext}`;
    }
    return { html: getParentDirPath('html'), css: getParentDirPath('css'), js: getParentDirPath('js') } 
}

const readFile = (filePath, onSucess, onError) => {
    return promises.readFile(filePath, "utf8").catch(err => {
        console.log('Unexpected error occurred', err)
    })
}

export const getPathNameOfStatic = (reqPath, serverDIR) => {
    const { html, css, js } = getAllFilePaths(reqPath, serverDIR);
    return Promise.all([
        readFile(html),
        readFile(css),
        readFile(js)
    ]).then(([html, css, js]) => {
        return getHTMLStr(html, css, js);
    })
}

export const isBlackListedURL = (reqPath) => {
    const blackList = ['/favicon.ico'];
    return blackList.indexOf(reqPath) !== -1;
}