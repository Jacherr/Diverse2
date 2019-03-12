const config = require('../../config.json')
const utils = require('../../utils/utils.js')
const superagent = require('superagent')
module.exports = {
    label: 'rextester',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        if(args[0] == undefined) return msg.channel.createMessage(`\`..rex help\``)
        if(args[0] == 'help') return msg.channel.createMessage(`https://hb.wrmsr.io/siraqazugo`)
        let language = args[0]
        args.shift()
        let message = await msg.channel.createMessage("Processing, please wait...")
        let code = args.join(" ")
        let value = await superagent
        .post('https://fapi.wrmsr.io/rextester')
        .set({
            Authorization: config.api,
            "Content-Type": "application/json"
        })
        .send({
            args: {
                text: code,
                language: language
            }
        })
        .end((err, response) => {
            if (err) {
                message.edit(`${err.toString()}`);
            }
            else {
                message.delete();
                if (response.text > 1900) {
                    let responsetext = utils.splitMessage(response.text, 1900)
                    if (responsetext[2]) {
                        return msg.channel.createMessage("Response is too long")
                    }
                    return responsetext.forEach((message) => {
                        msg.channel.createMessage(`\`\`\`js\n${message}\`\`\``);
                        return;
                    })
                } else {
                    msg.channel.createMessage(`\`\`\`${response.text}\`\`\``)
                }
            };
        });
    },
    options: {
        description: 'Run code via rextester',
        fullDescription: 'Run code via rextester in a range of languages - do \`..rex help\` for a list of supported languages',
        usage: '..rextester [help|lang] [code]',
        aliases: ['rex', 'debug'],
    }
};