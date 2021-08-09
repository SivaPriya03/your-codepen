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
        <h1> Your CodePen </h1>
        <script>
            var folders = ${folderStr.length > 0 } ? [${folderStr}] : [];
        </script>
    `
    const styles = fs.readFileSync(cssFilePath, 'utf-8');
    const jsContent = fs.readFileSync(jsFilePath, 'utf-8');

    return getHTMLStr(globalVariableScript, styles, jsContent);
}