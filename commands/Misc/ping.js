const bot = require('./../../bot.js')

module.exports = { // export file metadata as an object to base index.js file
    label: 'ping', // name of command
    enabled: true, // if command is enabled
    isSubcommand: false, // if command is a sub command
    generator: async (msg, args) => { // (client.registerCommand(label, (<stuff>) => {}))
        let results = []
        let repeat;
        let flags = require('../../utils/utils.js').resolveFlags(args)
        if (flags.map(i => i.flagName).includes('c')) repeat = flags.find(i => i.flagName = 'c').flagContent 
        else repeat = 1
        if (repeat = NaN || repeat > 5 || repeat < 1) {
            return msg.channel.createMessage('Invalid count! It needs to be between 1 and 5.')
        }
        for (let i = 0; i < repeat; i++) {
            let start = Date.now();
            let message = await msg.channel.createMessage('Pong!').then(msg => msg.edit(`Pong! \`${Date.now() - start}ms\``));
            results.push(`${Date.now() - start}`)
            await message.delete()
        }
        let values = results;
        let sum = values.reduce((previous, current) => current += previous);
        let avg = sum / values.length;
        msg.channel.createMessage('Mean ping: \`' + avg + 'ms\`') 
    }, // end command shit
    options: { // options
        description: 'Pings the bot', // to show when a user does "..help"
        fullDescription: 'Pings the bot', // to show when a user does "..help <command name>"
        aliases: [], // array of aliases (optional)
        usage: '..ping' // usage to show in "..help <command name>" (default make it command name)
    },
};