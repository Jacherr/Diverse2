const bot = require('../../bot.js')
const utils = require('../../utils/utils.js')
module.exports = {
    label: 'view',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let command = args[0]
        if(bot.commands[command]) {
            let output = bot.commands[command].execute.toString()
            if (output.length > 1900) {
                output = utils.splitMessage(output, 1900)
                if (output[5]) {
                    return msg.channel.createMessage("The command is too long.")
                }
                return output.forEach((message) => {
                    msg.channel.createMessage(`\`\`\`js\n${message}\`\`\``);
                    return;
                })
            }
        }
    },
    options: {
        description: 'View a command file or utility function',
        fullDescription: 'Display a command or utility in text form',
        usage: '..view [file path, starting from root/Bots/Diverse/Diverse2]',
        aliases: ['v'],
        requirements: {
            userIDs: ['233667448887312385']
        }
    }
};