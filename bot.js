const Eris = require('eris');
const hide = require('./config.json')

let bot = new Eris.CommandClient(hide.token, {
    defaultImageFormat: "png",
    defaultImageSize: 1024,
    getAllUsers: true,
    messageLimit: 300 
}, {
    description: "AAAAAAAAA",
    owner: "Jacher#9891 (233667448887312385)",
    prefix: ["..", "<@490810263717675019> ", "<@!490810263717675019> ",],
    defaultHelpCommand: false,
    defaultCommandOptions: {
        cooldown: 1000,
        guildOnly: true,
        cooldownMessage: function (msg) {
            msg.channel.createMessage(`${msg.author.mention}, please use commands a little slower.`).then(m => {
                setTimeout(() => m.delete(), 5000);
            });
        },
    }
});

module.exports = bot;
