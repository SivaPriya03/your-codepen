#!/usr/bin/env node
import chalk from "chalk";
import startServer from "../src/server/index.js";
import { getArguments, getCommand, getDirName, displayHelp, align, log, isValidPort } from "../src/utils/index.js";
import fs from 'fs'
import { PACKAGE_NAME, commandObj, commands } from "../src/constants/index.js";
const command = getCommand();

switch(command){
    case commands.START:{
        const { errorString, options } = getArguments(commandObj[commands.START].schema);
        if(errorString){
            log(chalk.red(errorString));
            displayHelp();
        }
        else{
            const { port } = options;
            if(isValidPort(port)){
                startServer(options);
            }
            else{
                log(chalk.red('Port number specified is invalid'));
            }
        }
        break;
    }
    case commands.INIT:{

    }
    case commands.CREATE_NEW:{
        
    }
    case '-v':
    case '--version':{
        const dirName = getDirName(import.meta.url);
        const packageJSONPath = `${dirName.slice(0, -4)}/package.json`
        const data = fs.readFileSync(packageJSONPath, {encoding:'utf8', flag:'r'});
        const packageJSON = JSON.parse(data);
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
