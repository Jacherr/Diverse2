const bot = require('../../bot.js')

module.exports = {
    label: 'discriminator',
    enabled: true,
    isSubcommand: true,
    generator: async (msg, args) => {
        let discrimSearch = args[0] ? args[0] : msg.member.user.discriminator
        if(discrimSearch.length != 4) return msg.channel.createMessage("Not a valid discriminator!")
        let b = []
        let a = bot.users.filter(i => i.discriminator == discrimSearch && i.username != msg.member.user.username).map(i => `${i.username}#${i.discriminator}`)
        if(a.length > 30) {
            b = []
            for(let i = 0; i < 30; i++) {
                b.push(a[i])
            }
        } else {
            b = a
        }
        if(b.length < 1) return msg.channel.createMessage('No results!')
        msg.channel.createMessage({
            embed: {
                description: b.join('\n'),
                color: Math.floor(Math.random() * 16777214) + 1
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