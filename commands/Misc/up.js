const bot = require('./../../bot.js');

module.exports = {
    label: 'uptime',
    enabled: true,
    isSubcommand: false,
    generator: (msg) => {
        let uptime = new Date(bot.uptime);
        uptime = `Uptime: \`${uptime.getUTCDate() - 1}d, ${uptime.getUTCHours()}h, ${uptime.getMinutes()}m, ${uptime.getSeconds()}s\``;
        msg.channel.createMessage(uptime);
    },
    options: {
        description: 'Check the bot\'s uptime',
        fullDescription: 'Check the bot\'s uptime',
        usage: '..uptime',
        aliases: ['up']
    }
};
