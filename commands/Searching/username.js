const bot = require('../../bot.js')

module.exports = {
    label: 'username',
    enabled: true,
    isSubcommand: true,
    generator: async (msg, args) => {
        let discrimSearch = args[0] ? args[0] : msg.member.user.username
        if (discrimSearch.length > 32 || discrimSearch.length < 2) return msg.channel.createMessage("Not a valid username!")
        let b = []
        let a = bot.users.filter(i => i.username.toLowerCase() == discrimSearch.toLowerCase() && i.username != msg.member.user.username).map(i => `${i.username}#${i.discriminator}`)
        if (a.length > 30) {
            b = []
            for (let i = 0; i < 30; i++) {
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
        description: 'Search for a username',
        fullDescription: 'Finds users with a specified username, or your own username.',
        usage: '..search username [username]',
        aliases: ['uname'],
    }
};