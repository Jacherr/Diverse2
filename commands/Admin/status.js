const bot = require('./../../bot.js');

module.exports = {
    label: 'status',
    enabled: true,
    isSubcommand: false,
    generator: (msg, args) =>{

        let status = args.slice(0).join(` `);

        bot.editStatus(null, {
            name: `${status} | ..help`,
            type: 0
        });
        
        msg.channel.createMessage(':ok_hand:')
    },
    options: {
        description: 'Change the status',
        fullDescription: 'Change the status of the bot, appends \' | ..help on to the end',
        usage: '..status <status>',
        requirements: {
            userIDs: ['233667448887312385', '155698776512790528', '208688963936845824'],
        }
    }
};