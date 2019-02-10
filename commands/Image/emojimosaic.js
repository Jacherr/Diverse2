const superagent = require("superagent")
const bot = require('../../bot.js');
const utils = require('../../utils/utils.js');
const config = require('../../config.json')

module.exports = {
    label: 'emojimosaic',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let message = await msg.channel.createMessage('Processing, please wait...');
        msg.channel.sendTyping()
        let files = [];
        let botuser = await utils.resolveMember(msg, args, true);

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
            .post('https://fapi.wrmsr.io/emojimosaic')
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
                    msg.channel.createMessage(` `,{ file: response.body, name: `9gag.png` });
                };
            });
    },
    options: {
        description: 'Turns an image into an emoji mosaic',
        fullDescription: 'Replaces the image with a twitter emoji mosaic version',
        usage: '..emojimosaic <url|user mention/id/username| >',
        aliases: ['e2m', 'em']
    }
}