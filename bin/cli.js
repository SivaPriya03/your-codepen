#!/usr/bin/env node
import chalk from "chalk";
import startServer from "../src/server/index.js";
import { getArguments, getCommand, getDirName, displayHelp, align, log, isValidPort, getUniqueAppName, createNewApp, parsePackageJSON, initApp, createRootFolder } from "../src/utils/index.js";
import { PACKAGE_NAME, commandObj, commands, rootFolder } from "../src/constants/index.js";

const command = getCommand();

switch(command){
    case commands.START:{
        const { errorString, options } = getArguments(commandObj[commands.START].schema);
        if(errorString){
            log(chalk.red(errorString));
            displayHelp();
        }
        else{
            const { port = 3000 } = options;
            if(isValidPort(port)){
                startServer({ port, rootFolder: rootFolder });
            }
            else{
                log(chalk.red('Port number specified is invalid'));
            }
        }
        break;
    }
    case commands.INIT:{
        const { errorString, options } = getArguments();
        if(errorString){
            log(chalk.red(errorString));
            displayHelp();
        }
        else{
            let { name } = options;
            if(!name){
                name = getUniqueAppName(rootFolder);
            }
            initApp(rootFolder, name, () => {
                align(chalk.green(`Run ${PACKAGE_NAME} ${commands.START} or npm ${commands.START} -- --app:port=<port>[optional] and access https://localhost:3000/${name} to see your app`))
            });
            
        }
        break;
    }
    case commands.CREATE_NEW:{
        const { errorString, options } = getArguments();
        if(errorString){
            log(chalk.red(errorString));
            displayHelp();
        }
        else{
            let { name } = options;
            createRootFolder(rootFolder); // Creates Root folder if it doesn't exists
            if(!name){
                name = getUniqueAppName(rootFolder);
            }
            createNewApp(`${rootFolder}/${name}`);
            align(chalk.green(`Run ${PACKAGE_NAME} ${commands.START} and access http://localhost:3000/${name} to see your app`))
        }
        break;
    }
    case '-v':
    case '--version':{
        const packageJSON = parsePackageJSON(getDirName(import.meta.url));
        log(packageJSON.version);
        break;
    }
    case '-h':
    case '--help':{
        displayHelp();
        break;
    }
    default:{
        align(chalk.red('Invalid command', command));
        align('Run '+chalk.green(`${PACKAGE_NAME} --help `) + 'to see all options')
    }
}
