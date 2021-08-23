const { fileURLToPath } = require('url');
const { dirname } = require('path');
const chalk = require("chalk");
const { appConst, commandObj, commands, appRegex, defaultSchema, PACKAGE_NAME, DEFAULT_APP_PREFIX } = require('../constants/index.js');
const fs = require('fs');
const child_process = require('child_process');
const os = require('os');
const getReadMe = require('../constants/readMe.js');

const getCommand = () => {
    return process.argv[2];
}
const log = console.log;

const getArguments = (userSchema = defaultSchema) => {
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
const getDirName = (url) => { // import.meta.url
    const __filename = fileURLToPath(url);
    return dirname(__filename);
}

const getCrntWrkingDir = process.cwd;

const validateCommands = () => {

}
function align(text, length = 3){
    let spaces = ``;
    for(let i = 0;i< length;i++){
        spaces = spaces + ` `;
    }
    log(spaces + text);
}

function printNewLine(){
    log('\n');
    
}

function displayHelp(){
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

const parsePackageJSON = (dirName) => {
    const packageJSONPath = `${dirName.slice(0, -4)}/package.json`
    const data = fs.readFileSync(packageJSONPath, {encoding:'utf8', flag:'r'});
    return JSON.parse(data);
}

const isValidPort = (port) => {
    return !isNaN(port);
}

const getFilesInDir = source => 
     fs.readdirSync(source, { withFileTypes: true })

const getDirectories = source =>
  getFilesInDir(source)
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)


const getUniqueAppName = (folderName) => {
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

const createNewApp = (folderName) => {
    try{
        fs.mkdirSync(folderName);
        const dirName = __dirname;
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

const createRootFolder = (folder) => {
    if(!fs.existsSync(folder)){
        fs.mkdirSync(folder);
    }
}

const initApp = (folder, name, onSuccess) => {
    /* Creates a folder with user specified name and a package.json by running npm init */
    fs.mkdirSync(name);
    // process.chdir(name);
    const cwd = `${getCrntWrkingDir()}/${name}`;
    child_process.exec('npm init -y', {
        cwd
    }, (err, stdout, stderr) => {
        if(err || stderr){
            log(chalk.red('An error occurred', err || stderr));
        }
        else{
            const packageJSONPath = `${cwd}/package.json`;
            const data = fs.readFileSync(packageJSONPath, 'utf-8');
            const parsedJSON = JSON.parse(data);
            parsedJSON.scripts = {
                [commands.START]: `${PACKAGE_NAME} ${commands.START}`,
                [commands.CREATE_NEW]: `${PACKAGE_NAME} ${commands.CREATE_NEW}`
            }
            const newPackageJsonStr = JSON.stringify(parsedJSON, null, 4);
            fs.writeFileSync(packageJSONPath,  newPackageJsonStr+ os.EOL, { encoding: 'utf-8'});
            child_process.exec(`npm run ${commands.CREATE_NEW} -- --app:name=${name}`, { cwd }, (err, out, stderr) => {
                if(err || stderr){
                    log(chalk.red('An error occurred while creating new app', err || stderr));
                    console.log(stderr);
                    console.log(err);
                }
                else{
                    onSuccess();
                    const readMeContent = getReadMe(name);
                    fs.writeFileSync(`${cwd}/README.md`, readMeContent , { encoding: 'utf-8'})
                }
            })
        }
    })
}

module.exports = {
    getCommand,
    log,
    getArguments,
    getDirName,
    getCrntWrkingDir,
    validateCommands,
    align,
    printNewLine,
    displayHelp,
    parsePackageJSON,
    isValidPort,
    getDirectories,
    getUniqueAppName,
    createNewApp,
    createRootFolder,
    initApp
}