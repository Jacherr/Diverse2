const { exec } = require('child_process');
module.exports = {
    label: 'pr',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        await msg.channel.createMessage("doing the shit")
        exec('pm2 restart index', (err, stdout, stderr) => {});
        process.exit();
    },
    options: {
        description: 'pull and restart',
        fullDescription: 'pull and restart',
        usage: '..pr',
        aliases: [],
        requirements: {
            userIDs: ['233667448887312385']
        }
    }
};