import { fileURLToPath } from 'url';
import { dirname } from 'path';
import chalk from "chalk";
import { appConst, commandObj, commands, appRegex, defaultSchema, PACKAGE_NAME, DEFAULT_APP_PREFIX } from '../constants/index.js'
import fs from 'fs'

export const getCommand = () => {
    return process.argv[2];
}
export const log = console.log;

export const getArguments = (userSchema = defaultSchema) => {
    const userArgs = process.argv.slice(3);
    let errorString = '';
    const options = {};
    userArgs.forEach(arg => {
        const matches = arg.match(appRegex);
        if(errorString){
            return;
        }
        if(matches){
            const [ parentOption, userOption, userValue ] = matches.slice(1,4);
            const isValid = userSchema.parentOptions.indexOf(parentOption) !== -1 && userSchema.userOptions.indexOf(userOption) !== -1;
            if(isValid){
                options[userOption] = userValue;
            }
            else{
                errorString = `Unsupported option: ${userOption}`;
            }
        }
        else{
            errorString = `Invalid command ${arg}`;
        }
    });
    return { options, errorString }
}
export const getDirName = (url) => { // import.meta.url
    const __filename = fileURLToPath(url);
    return dirname(__filename);
}

export const getCrntWrkingDir = process.cwd;

export const validateCommands = () => {

}
export function align(text, length = 3){
    let spaces = ``;
    for(let i = 0;i< length;i++){
        spaces = spaces + ` `;
    }
    log(spaces + text);
}

export function printNewLine(){
    log('\n');
    
}

export function displayHelp(){
    log(`Usage: ${PACKAGE_NAME} `+ chalk.greenBright('<command>'));
    printNewLine();
    log('where command is one of:');
    printNewLine();
    align(`${commands.INIT}                ${PACKAGE_NAME} ${commands.INIT} `+chalk.green('<project-directory> ') + chalk.yellow(`[optional] --${appConst}:name=mycodepen`));
    align(`                                ${commandObj[commands.INIT].description}`);
    
    printNewLine();
    align(`${commands.CREATE_NEW}           ${PACKAGE_NAME} ${commands.CREATE_NEW} `+chalk.green('<project-directory ' + chalk.yellow(`[optional] --${appConst}:name=mycodepen`)));
    align(`                                ${commandObj[commands.CREATE_NEW].description}`);
    printNewLine();
    align(`${commands.START}               ${PACKAGE_NAME} ${commands.START} `+chalk.green('<project-directory ' + chalk.yellow(`[optional] --${appConst}:port=<port>`)));
    align(`                                ${commandObj[commands.START].description} - ${commandObj[commands.START].more}`);
    printNewLine();
}

export const parsePackageJSON = (dirName) => {
    const packageJSONPath = `${dirName.slice(0, -4)}/package.json`
    const data = fs.readFileSync(packageJSONPath, {encoding:'utf8', flag:'r'});
    return JSON.parse(data);
}

export const isValidPort = (port) => {
    return !isNaN(port);
}

const getFilesInDir = source => 
     fs.readdirSync(source, { withFileTypes: true })

const getDirectories = source =>
  getFilesInDir(source)
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)


export const getUniqueAppName = (folderName) => {
    const directories = getDirectories(folderName);
    let i = 1;
    const getName = () => `${DEFAULT_APP_PREFIX}${i}`;
    let uniqueName = getName();
    while(directories.indexOf(uniqueName) !== -1){
        i = i+1;
        uniqueName = getName();
    }
    return uniqueName;
}

export const createNewApp = (folderName) => {
    try{
        fs.mkdirSync(folderName);
        const dirName = getDirName(import.meta.url);
        const skeletonFolder = `${dirName.slice(0, -6)}/skeleton`;
        let files = getFilesInDir(skeletonFolder).filter(ele => ele.isFile());
        files.forEach(file => {
            const { name } = file;
            fs.copyFile(`${skeletonFolder}/${name}`, `${folderName}/${name}`, err => {
                if(err){
                    log(chalk.red('Error while creating new app') + err)
                }
            });
        })
    }
    catch(err){
        if(err.code === 'EEXIST'){
            log(chalk.red('Folder already exists. Kindly provide a unique name'));
        }
    }
}