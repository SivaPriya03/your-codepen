import fs from 'fs';
import { getDirectories, getDirName } from '../../../utils/index.js';
import getHTMLStr from '../../constants/htmlStr.js';
export default function generateIndexHTML(rootFolder){
    const dirName = getDirName(import.meta.url)
    const cssFilePath = `${dirName}/homepage.css`;
    const jsFilePath = `${dirName}/homepage.js`;
    let folders = getDirectories(rootFolder) || [];
    let folderStr = '';
    folders.forEach((ele, index) => {
        folderStr = folderStr + `'${ele}'`;
        if(index !== folders.length - 1){
            folderStr = folderStr + ',';
        }
    });
    const globalVariableScript = `
        <header>
            <h1 class="heading"> Your Work </h1>
        </header>
        <main class="app" id='root'>
        </main>  
        <footer>
            <div class="footer">
                <div class="name">
                    Created by <a class='link' target="_blank" href='https://twitter.com/thepurplecoder'>thepurplecoder</a>
                </div>
                <div class="contribution">
                    Find source code in <a class='link' target="_blank" href='https://github.com/SivaPriya03/your-codepen'>Github</a>
                </div>
            </div>
        </footer>
        <script>
            var folders = ${folderStr.length > 0 } ? [${folderStr}] : [];
        </script>
    `
    const styles = fs.readFileSync(cssFilePath, 'utf-8');
    const jsContent = fs.readFileSync(jsFilePath, 'utf-8');

    return getHTMLStr(globalVariableScript, styles, jsContent);
}