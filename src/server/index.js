const getHTMLStr = require('./constants/htmlStr.js');
const browserSync = require('browser-sync');
const { getCrntWrkingDir } = require('../utils/index.js');
const { getPathNameOfStatic } = require('./utils/index.js');
const generateIndexHTML = require('./utils/home/generateIndexHTML.js');

function startServer(options = {}){
    const { port = 3000, rootFolder } = options;
    const bs = browserSync.init({
        server: 'app',
        watch: true,
        https: true,
        files: [rootFolder],
        reloadDebounce: 500, // Wait 1 sec
        injectChanges: false,
        port,
        middleware: [
            async function (req, res, next) {
                const { originalUrl = '/' } = req;
                if(originalUrl === '/' || originalUrl === '/favicon.ico'){
                    const html = generateIndexHTML(rootFolder);
                    res.write(html);
                    res.end();
                }
                else{
                    const htmlContent = await getPathNameOfStatic(originalUrl, getCrntWrkingDir(), rootFolder);
                    res.write(htmlContent);
                    res.end();
                }
            }
        ]
    });
}
module.exports =  startServer;
