import getHTMLStr from './constants/htmlStr.js'
import browserSync from 'browser-sync'
import { getCrntWrkingDir } from '../utils/index.js';
import { getPathNameOfStatic } from './utils/index.js';
import generateIndexHTML from './utils/home/generateIndexHTML.js';

function startServer(options = {}){
    const { port = 3000, rootFolder } = options;
    const bs = browserSync.init({
        server: 'app',
        watch: true,
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
export default startServer;