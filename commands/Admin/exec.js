const bot = require('./../../bot.js');
const { exec } = require('child_process');

module.exports = {
    label: 'execute',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        exec(args.join(' '), (err, stdout, stderr) => {
            if (err) {
                return msg.channel.createMessage(`\`\`\`bash\n${err}\`\`\``);
            };
            if (stdout.length > 2000) {
                return msg.channel.createMessage('Response too long');
            }
            if (stdout.length !== 0)
                msg.channel.createMessage(`\`\`\`bash\n${stdout}\`\`\``);
            if (stderr.length !== 0)
                msg.channel.createMessage(`\`\`\`bash\n${stderr}\`\`\``);
        });
    },
    options: {
        description: 'Execute code',
        fullDescription: 'Execute code',
        aliases: ['ex'],
        usage: '..execute [code]',
        requirements: {
            userIDs: ['233667448887312385', '155698776512790528'],
        }
    }
};