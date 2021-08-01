import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const getCommand = () => {
    return process.argv[2];
}

export const getDirName = (url) => { // import.meta.url
    const __filename = fileURLToPath(url);
    return dirname(__filename);
}

export const getCrntWrkingDir = process.cwd;

export const validateCommands = () => {

}