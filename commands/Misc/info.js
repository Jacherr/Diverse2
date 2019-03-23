const bot = require('./../../bot.js');
const os = require("os")

module.exports = {
    label: 'info',
    enabled: true,
    isSubCommand: false,
    generator: async (msg) => {
        let uptime = new Date(bot.uptime);
        msg.channel.createMessage({
            embed: {
                description: "A generic discord bot made with love by <@233667448887312385>",
                author: { 
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                thumbnail: {
                    url: bot.user.avatarURL
                },
                color: 0x5FF4D3,
                fields: [ // Array of field objects
                    {
                        name: 'Version', 
                        value: 'Some prerelease build idk', 
                        inline: true 
                    },
                    {
                        name: 'Language',
                        value: 'Javascript',
                        inline: true
                    },
                    {
                        name: 'Library',
                        value: 'eris',
                        inline: true
                    },
                    {
                        name: 'Servers',
                        value: bot.guilds.size,
                        inline: true
                    },
                    {
                        name: 'Users',
                        value: bot.users.size,
                        inline: true
                    },
                    {
                        name: 'Memory Usage',
                        value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.ceil(os.totalmem() / 1024 / 1024 / 1024)} GB`,
                        inline: true 
                    },
                    {
                        name: 'Contributors',
                        value: '<@155698776512790528> CoalSephos#7566 - huge help with most commands\n<@310145094684639235> oathompsonjones#5337 - whois role mapping and other various things\n<@179908288337412096> KhaaZ#0001 - helping me learn javascript back when i was a scrub at it\n<@191294695802929152> Crylis#9132 - permission resolver',
                        inline: false
                    },
                    {
                        name: 'Uptime',
                        value: `${uptime.getUTCDate() - 1} days, ${uptime.getUTCHours()} hours, ${uptime.getMinutes()} minutes, and ${uptime.getSeconds()} seconds`,
                        inline: false
                    }
                ]}
        })
    },
    options: {
        description: 'Fetch bot info',
        fullDescription: 'Fetches bot-related information like version, general information, who made the bot happen, etc.',
        usage: '..info',
        
    }
}