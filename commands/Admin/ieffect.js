const superagent = require("superagent")
const bot = require('../../bot.js');
const utils = require('../../utils/utils.js');
const config = require('../../config.json')

module.exports = {
    label: 'feffect',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let message = await msg.channel.createMessage('Processing, please wait...');
        msg.channel.sendTyping()
        let files = [];
        let user = []
        user.push(args[1])
        let botuser = await utils.resolveMember(msg, user, true);

        if(msg.attachments.length > 0) {
            msg.attachments.forEach(attachment => {
                files.push(attachment.url)
            });
        } else if(!botuser && !args && !msg.attachments) {
            files.push(msg.member.avatarURL)
        } else if(botuser && args) {
            files.push(botuser.avatarURL)
        } else if(args) {
            files.push(args[0])
        }
    
        let value = await superagent
            .post(`https://fapi.wrmsr.io/${args[0]}`)
            .set({
                Authorization: config.api,
                "Content-Type": "application/json"
            })
            .send({
                "images": files
            })
            .end((err, response) => {
                if (err) {
                    message.edit(`${err.toString()}`);
                }
                else {
                    message.delete();
                    msg.channel.createMessage(` `,{ file: response.body, name: `output.png` });
                };
            });
    },
    options: {
        description: 'Apply any API image effect to command',
        fullDescription: 'Apply any API image effect to command',
        usage: '..feffect [attachment etc] [effect]',
        aliases: ['fe'],
        requirements: {
            userIDs: ['233667448887312385', '155698776512790528']
        }
    }
};