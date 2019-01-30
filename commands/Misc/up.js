const bot = require('./../../bot.js');

module.exports = {
    label: 'uptime',
    enabled: true,
    isSubcommand: false,
    generator: (msg) => {
        let uptime = new Date(bot.uptime);
        uptime = `The bot has been running for ${uptime.getUTCDate() - 1} days, ${uptime.getUTCHours()} hours, ${uptime.getMinutes()} minutes, and ${uptime.getSeconds()} seconds`;
        msg.channel.createMessage(uptime);
    },
    options: {
        description: 'Check the bot\'s uptime',
        fullDescription: 'Check the bot\'s uptime',
        usage: '..uptime',
        aliases: ['up']
    }
};
