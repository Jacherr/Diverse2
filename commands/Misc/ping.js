const bot = require('./../../bot.js')

module.exports = { // export file metadata as an object to base index.js file
    label: 'ping', // name of command
    enabled: true, // if command is enabled
    isSubcommand: false, // if command is a sub command
    generator: (msg) => { // (client.registerCommand(label, (<stuff>) => {}))
        let start = Date.now();
        msg.channel.createMessage('Pong!').then(msg => msg.edit(`Pong! \`${Date.now() - start}ms\``));
    }, // end command shit
    options: { // options
        description: 'Pings the bot', // to show when a user does "..help"
        fullDescription: '', // to show when a user does "..help <command name>"
        aliases: [], // array of aliases (optional)
        usage: '..ping' // usage to show in "..help <command name>" (default make it command name)
    },
};