const superagent = require("superagent")
const bot = require('../../bot.js');
const utils = require('../../utils/utils.js');
const config = require('../../config.json')

module.exports = {
    label: 'magik',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let message = await msg.channel.createMessage('Processing, please wait...');
        msg.channel.sendTyping()
        let start = Date.now();
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
            .post('https://fapi.wrmsr.io/evalmagik')
            .accept('image/gif')
            .buffer(true)
            .parse(superagent.parse.image)
            .set({
                Authorization: config.api,
                "Content-Type": "application/json"
            })
            .send({
                "args": {
                    text: ['-liquid-rescale', '50%', '-liquid-rescale', '150%']
                },
                "images": files
            })
            .end((err, response) => {
                if (err) return message.edit(`${err.toString()}`);
                else {
                    message.delete();
                    msg.channel.createMessage({ file: response.body, name: `magik.gif` });
                };
            });
    },
    options: {
        description: 'Applies a magik effect to an image',
        fullDescription: 'Distorts input image by applying a magik effect to it',
        usage: '..magik [attachment|image url|user]',
        aliases: ['magic', 'magick'],
    }
};