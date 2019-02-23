const bot = require('../../bot.js')

module.exports = {
    label: 'discrim',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let discrimSearch = args[0] ? args[0] : msg.member.user.discriminator
        if(discrimSearch.length != 4) return msg.channel.createMessage("Not a valid discriminator!")
        let a = bot.users.filter(i => i.discriminator == discrimSearch && i.username != msg.member.user.username).map(i => `${i.username}#${i.discriminator}`).join('\n')
        msg.channel.createMessage({
            embed: {
                description: a,
                color: 0x22BB55
            }
        });
    },
    options: {
        description: 'Search for a discriminator',
        fullDescription: 'Finds users with a specified discriminator, or your own discriminator.',
        usage: '..search discriminator [discriminator]',
        aliases: ['discrim'],
    }
};