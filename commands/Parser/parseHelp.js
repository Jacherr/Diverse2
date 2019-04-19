const utils = require('../../utils/utils.js')
module.exports = {
    label: 'help',
    enabled: true,
    isSubcommand: true,
    generator: async (msg, args) => {
        msg.channel.createMessage({
            embed: {
                title: "Parser help",
                color: utils.getRandomColor(),
                description: 'This is a list of all the currently implemented parser options.',
                author: {
                    icon: msg.author.avatarURL,
                    text: msg.author.username
                }
            }
        })
    },
    options: {
        description: 'Help for the parser',
        fullDescription: 'Help for the parser',
        usage: '..parse help',
        aliases: ['h'],
    }
};