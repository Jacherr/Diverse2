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
                    icon: bot.user.avatarURL
                },
                title: `Todo`,
                color: utils.getRandomColor(),
                description: args.join(' ')
            }
        })
    },
    options: {
        description: 'Add a todo',
        fullDescription: 'Add a todo',
        usage: '..todo [thing]',
        aliases: ['td'],
    }
};