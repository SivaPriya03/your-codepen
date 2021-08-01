const OPTION_FLAGS = {
    NAME: 'n',

}
export default {
    [OPTION_FLAGS.NAME]: {
        alias: 'name',
        demandOption: false,
        describe: 'Name of the folder for the new app',
        type: 'string'
    }
}