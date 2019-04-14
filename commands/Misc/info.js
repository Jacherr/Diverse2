const randomColour = require('../../utils/utils.js').getRandomColor()
module.exports = {
    label: 'information',
    enabled: true,
    isSubcommand: false,
    generator: (msg) => {
        msg.channel.createMessage({
            embed: {
                color: randomColour,
                description: 'Diverse has been privatised recently so I (Jacher#9891) can focus on making new and better features for it.\nInterested in contributing? DM me (Jacher#9891) or [join the discord](https://discord.gg/upvJaYq)'
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