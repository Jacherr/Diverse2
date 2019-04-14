const randomColour = require('../../utils/utils.js').getRandomColor()
const bot = require('../../bot.js')
module.exports = {
    label: 'information',
    enabled: true,
    isSubcommand: false,
    generator: (msg) => {
        msg.channel.createMessage({
            embed: {
                color: randomColour,
                description: 'Diverse has been privatised recently so I (Jacher#9891) can focus on making new and better features for it.\nInterested in contributing? DM me (Jacher#9891) or [join the server](https://discord.gg/upvJaYq)',
                author: {
                    name: 'Diverse',
                    url: 'https://github.com/Jacherr/Diverse2',
                    icon_url: bot.user.avatarURL
                  },
                fields: [
                    {
                        title: 'Contributors',
                        value: 'Diverse would not have been possible without the help and support from these amazing people:\nCoalSephos#7566\nKhaaZ#0001\nCrylis#9132\noathompsonjones#5337\nAnd everyone who has contributed code or knowledge to the bot or has supported me in any way!',
                        inline: false
                    }
                ]
            }
        })
    },
    options: {
        description: 'Bot information',
        fullDescription: 'All the information you need regarding Diverse',
        usage: '..information',
        aliases: ['info']
    }
};