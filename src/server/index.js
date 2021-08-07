import express from 'express'
import fs from 'fs'
import getHTMLStr from './constants/htmlStr.js'
import browserSync from 'browser-sync'
import { getDirName, getCrntWrkingDir } from '../utils/index.js';
import { getPathNameOfStatic, isBlackListedURL } from './utils/index.js';
const APP_NAME = 'app'
function startServer(){
    const currentDirectory = getDirName(import.meta.url);
    const bs = browserSync.init({
        server: 'app',
        watch: true,
        files: [APP_NAME],
        reloadDebounce: 500, // Wait 1 sec
        injectChanges: false,
        middleware: [
            async function (req, res, next) {
                const { originalUrl = '/' } = req;
                if(originalUrl === '/' || originalUrl === '/favicon.ico'){
                    res.write(getHTMLStr());
                    res.end();
                }
                // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                // else if( originalUrl === '/favicon.ico'){
                //     var img = fs.readFileSync('.\\assets\\favicon.ico');
                //     res.writeHead(200, {'Content-Type': 'image/x-icon' });
                //     res.end(img, 'binary');
                // }
                else{
                    const htmlContent = await getPathNameOfStatic(originalUrl, getCrntWrkingDir());
                    res.write(htmlContent);
                    res.end();
                }
            }
        ]
    });
    
    // browserSync.watch("*.css").on("change", browserSync.reload);
    // browserSync.watch("*", function (event, file) {
    //     console.log('came')
    //     if (event === "change") {
    //         console.log(file);
    //         browserSync.reload();
    //     }
    // });
    // bs.watch(`${APP_NAME}/**/*.css`).on('change', (path) => {
    //    const clientSideSocket = bs.sockets;
    //    console.log(clientSideSocket);
    // });
}
// startServer();

export default startServer;