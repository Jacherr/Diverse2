const bot = require('./../../bot.js');
const utils = require('./../../utils/utils.js');

module.exports = {
    label: 'eval',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let evaled;
        try {
            evaled = await eval(args.join(' '));
            switch (typeof evaled) {
                case 'object':
                    evaled = require('util').inspect(evaled, { depth: 0 })
                    break;
                default:
            }
        } catch (err) {
            return msg.channel.createMessage(`${err.message}`);
        }
        if (typeof evaled === 'string') {
            evaled = evaled.replace(bot.token, '')
        }
        if(evaled == undefined) {
            evaled = 'undefined'
        }
        if (evaled.length > 1900) {
            evaled = utils.splitMessage(evaled, 1900)
            if (evaled[5]) {
                return msg.channel.createMessage("Response is too long for ratelimits to handle!")
            }
            return evaled.forEach((message) => {
                msg.channel.createMessage(`\`\`\`js\n${message}\`\`\``);
                return;
            })
        }
        return msg.channel.createMessage(`\`\`\`js\n${evaled}\`\`\``)
    },
    options: {
        description: 'Eval some code',
        fullDescription: 'Evaluates some js code',
        aliases: ['e'],
        usage: '..eval [code]',
        requirements: {
            userIDs: ['233667448887312385', '155698776512790528'],
        }
    }
};