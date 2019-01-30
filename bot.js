const Eris = require('eris');
hide = require('./config.json')

let bot = new Eris.CommandClient(hide.token, {
    defaultImageFormat: "png",
    defaultImageSize: 1024,
    getAllUsers: true 
}, {
    description: "Another Discord Bot",
    owner: "Jacher#9891 (233667448887312385)",
    prefix: ["..", "<@490810263717675019> ", "<@!490810263717675019> ", "$", ""],
    defaultHelpCommand: false,
    defaultCommandOptions: {
        cooldown: 1000,
        guildOnly: true,
        cooldownMessage: function (msg) {
            msg.channel.createMessage(`${msg.author.mention} Please use commands a little slower.`).then(m => {
                setTimeout(() => m.delete(), 5000);
            });
        },
    }
});

module.exports = bot;
