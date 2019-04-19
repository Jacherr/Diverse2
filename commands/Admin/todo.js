const utils = require('../../utils/utils.js')
const bot = require('../../bot.js')
module.exports = {
    label: 'todo',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let sendChnnel = bot.guilds.find(i => i.id == '541033778655526912').channels.find(i => i.id == '566259448750800897')
        sendChnnel.createMessage({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: `https://cdn.discordapp.com/avatars/490810263717675019/a7661bff9d044b43f0cf46bd2b1d49b9.png?size=256
                    `
                },
                title: `Todo`,
                color: utils.getRandomColor(),
                description: args.join(' ')
            }
        })
        msg.channel.createMessage('it was sent to the channel lol')
    },
    options: {
        description: 'Add a todo',
        fullDescription: 'Add a todo',
        usage: '..todo [thing]',
        aliases: ['td'],
    }
};