
const commands = {
    INIT: 'init',
    CREATE_NEW: 'createnew',
    START: 'start'
}
const appConst = 'app'

const rootFolder = 'app';

const defaultSchema = {
    parentOptions: [appConst],
    userOptions: ['name']
}

const commandObj = {
    [commands.INIT]: {
        name: commands.INIT,
        description: 'Initialize a new directory with sample app',
        options:[
            {
                name: `--${appConst}:name=<app-name>`,
                description: 'User can provide the default app name while initializing'
            }
        ],
        schema: defaultSchema
    },
    [commands.CREATE_NEW]: {
        name: commands.CREATE_NEW,
        description: 'Create a new code pen app in an existing directory',
        options:[
            {
                name: `--${appConst}:name=<app-name>`,
                description: 'User can provide the name of the app'
            }
        ],
        schema: defaultSchema
    },
    [commands.START]: {
        name: commands.START,
        description: 'Run all apps with a mock server in watch mode',
        more: 'Run this command and access your app at https://localhost:3000/<your-app-name>',
        options:[
            {
                name: `--${appConst}:port=<port>`,
                description: 'Port for running the mock server. Default: 3000'
            }
        ],
        schema: {
            parentOptions: [appConst],
            userOptions: ['port']
        }
    }
};

const PACKAGE_NAME = 'your-codepen'

const DEFAULT_APP_PREFIX = 'untitled' 

const appRegex = /--(\w+):(\w+)=(\w+)/;

module.exports = {
    appRegex, 
    DEFAULT_APP_PREFIX,
    PACKAGE_NAME,
    commands,
    appConst,
    rootFolder,
    defaultSchema,
    commandObj
}
