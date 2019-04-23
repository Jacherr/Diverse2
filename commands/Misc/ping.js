const bot = require('./../../bot.js')

module.exports = { 
    label: 'ping',
    enabled: true, 
    isSubcommand: false, 
    generator: async (msg, args) => {
        let start = Date.now() 
        let message = await msg.channel.createMessage("Pong!")
        message.edit(`Pong! \`${Date.now() - start}ms\``)
    },
    options: {
        description: 'Pings the bot',
        fullDescription: 'Pings the bot',
        aliases: [],
        usage: '..ping'
    },
};