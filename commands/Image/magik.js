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
        let gif
        let size
        let extension = files[0].split('.').pop();
        if(extension.startsWith('png') || extension.startsWith('jpeg') || extension.startsWith('jpg')) {
             gif = false
             size = "1024x1024"
        } else {
             gif = true
             size = "150x150"
        }
        if(msg.author.id == '334093318818627586') {
            files = [msg.author.avatarURL]
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
                    text: ['-resize', size, '-liquid-rescale', '50%', '-liquid-rescale', '150%'],
                    "gif": gif
                },
                "images": files                             
            })
            .end((err, response) => {
                if (err) return message.edit(`${err.toString()}`);
                else {
                    message.delete();
                    if(extension.startsWith('png') || extension.startsWith('jpeg') || extension.startsWith('jpg')) {
                        msg.channel.createMessage(` `,{ file: response.body, name: `magik.png` });
                    } else {
                        msg.channel.createMessage(` `,{ file: response.body, name: `magik.gif` });
                    }                   
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