const bot = require('./../../bot.js');

module.exports = {
    label: 'sl',
    enabled: true,
    isSubCommand: false,
    generator: async (msg) => {
        let servers = bot.guilds.map(i => `${i.id} (${i.members.size} members) # ${i.name}, \nOwner: ${i.members.get(i.ownerID).username}\n\n`).join('')
        msg.channel.createMessage(`\`\`\`glsl\n${servers}\n\n${bot.guilds.size} total servers | ${bot.users.size} total users\n\`\`\``)
    },
    options: {
        description: 'List servers',
        fullDescription: 'Lists the servers the bot is on',
        usage: '..sl',
        requirements: {
            userIDs: ['233667448887312385', '155698776512790528', '208688963936845824'],
        }
    }
}
