const { commands } = require("./index.js");

const getReadMe = (name) => {
    return `
# ${name.toUpperCase()}
- Run \`npm run ${commands.CREATE_NEW} -- --app:name=<new-app-name>\` for creating new pen
- Run \`npm run start -- app:port=3000\` for running mock server and access your pen at localhost:port/your-app. 

P.S Providing port is optional
    `
}

module.exports = getReadMe;
