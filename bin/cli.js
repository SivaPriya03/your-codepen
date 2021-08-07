#!/usr/bin/env node

// const { tellHi } = require("../utils/params");
import boxen from "boxen";
import chalk from "chalk";
import yargs from "yargs";
import optionConstants from "../src/constants/index.js";
import startServer from "../src/server/index.js";
import { getCommand } from "../src/utils/index.js";

const options = yargs
 .usage("Usage: -n <name>")
 .options(optionConstants)
 .argv;

const command = getCommand();

switch(command){
    case 'startApp':{
        startServer();
        break;
    }
    default:{
        console.log('Invalid argument');
    }
}


// const greeting2 = chalk.white.bold("Hello!");

// const boxenOptions = {
//  padding: 1,
//  margin: 1,
//  borderStyle: "round",
//  borderColor: "green",
//  backgroundColor: "#555555"
// };
// const msgBox = boxen( greeting2, boxenOptions );

// console.log(msgBox);