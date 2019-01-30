let utils = require('./../../utils/utils.js');

module.exports = {
    label: 'av',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let avatar;
        let botuser = await utils.resolveMember(msg, args);
        if (!botuser) return;
        if (botuser.id == '179908288337412096') {
                avatar = 'https://cdn.discordapp.com/emojis/463030163454558209.gif?v=1'
        } else {
            avatar = botuser.avatarURL
        }
        msg.channel.createMessage({
            embed: {
                title: botuser.username,
                description: `[Original image](${avatar})`,
                image: {
                    url: avatar
                },
                timestamp: new Date(),
            }
        })
    },    
    options: {
        description: 'Fetch a user\'s avatar',
        fullDescription: 'Fetch a user\'s avatar, with a link to the original image.',
        usage: 'mention, ID, username or nickname'
    }
}; 
