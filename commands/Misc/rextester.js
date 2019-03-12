const config = require('../../config.json')
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
                msg.channel.createMessage(response);
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