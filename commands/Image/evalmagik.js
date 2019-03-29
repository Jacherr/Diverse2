let utils = require('../../utils/utils.js')
let superagent = require('superagent')

module.exports = {
    label: 'evalmagik',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        user.push(args[0])
        let botuser = await utils.resolveMember(msg, user, false);
        if(!args[0]) botuser = undefined
        if(msg.attachments.length > 0) {
            msg.attachments.forEach(attachment => {
                files.push(attachment.url)
            });
        } else if(!botuser && !args[0] && msg.attachments.length == 0) {
            files.push(msg.member.avatarURL)
        } else if(botuser && args[0]) {
            files.push(botuser.avatarURL)
        } else if(args[0] && !botuser) {
            files.push(args[0])
        }
        args.shift()
        let i = 0
        let textArray = []
        let currentArray = []
        args.forEach(element, () => {
            if(element.endsWith(';')) {
                element.slice(0, element.length - 1)
                for(let j = 0; j < i; j++) {
                    currentArray.push(args[0])
                    args.shift()
                }
                textArray.push(currentArray.join(' '))
                i = 0
            } else {
                i++
            }
        })
        msg.channel.createMessage(textArray)
        superagent
        .post(`https://fapi.wrmsr.io/eval_magik`)
        .set({
            Authorization: config.api,
            "Content-Type": "application/json"
        })
        .send({
            args: {
                text: []
            }
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
        description: 'Use evalmagik on an image',
        fullDescription: 'Use evalmagik on an imaghe',
        usage: '..evalmagik [stuff] [array of effects]',
        aliases: ['em'],
        requirements: {
            userIDs: ['233667448887312385']
        }
    }
};