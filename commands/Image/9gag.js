const superagent = require("superagent")
const bot = require('../../bot.js');
const utils = require('../../utils/utils.js');

module.exports = {
    label: '9gag',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let message = await msg.channel.createMessage('Processing, please wait...');
        msg.channel.sendTyping()
        let start = Date.now();
        let files = [];
        let botuser = await utils.resolveMember(msg, args, true);

        if(!botuser && !args && !msg.attachments) {
            files.push(msg.member.avatarURL)
        } else if(botuser) {
            files.push(botuser.avatarURL)
        } else if(msg.attachments) {
            msg.attachments.forEach(element => {
                files.push(element)
            });
        } else if(args) {
            files.push(args[0])
        }
        
    
        let value = await superagent
            .post('https://fapi.wrmsr.io/9gag')
            .set({
                Authorization: 'Bearer f50b00c829a3269a84a03025c414bb1a',
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
                    msg.channel.createMessage(`${Date.now() - start}ms`, { file: response.body, name: `perfection.png` });
                };
            });
    },
    options: {
        description: 'Via 9gag.com',
        fullDescription: 'Overlays \'Via 9gag.com\' on image',
        usage: '..9gag <url|user mention/id/username| >',
        aliases: ['9g']
    }
}