const config = require('../../config.json')

module.exports = {
    label: 'serverinfo',
    isSubCommand: false,
    enabled: true,
    generator: async (msg) => {
        let msgArray = [];
        let roles = msg.channel.guild.roles;
        roles.forEach(r => msgArray.push(r));
        roles = msgArray.sort((a, b) => { return b.position - a.position; }).map(i => `<@&${i.id}>`).toString().split(`,`).join(`, `);
        if (roles.length > 1024) {
            roles = `Too many roles to display`
        }
        let created = new Date(msg.channel.guild.createdAt);
        let createdMins = created.getMinutes();
        if (created.getMinutes() <= 9) {
            createdMins = `0${created.getMinutes()}`;
        }
        let partnered = config.redTickEmote
        let verified = config.redTickEmote
        if(msg.channel.guild.features.includes('VERIFIED')) {
            verified = config.greenTickEmote
        }
        if(msg.channel.guild.features.includes('INVITE_SPLASH') || msg.channel.guild.features.includes('VANITY_URL') || msg.channel.guild.features.includes('VIP_REGIONS')) {
            partnered = config.greenTickEmote
        }
        msg.channel.createMessage({
            embed: {
                author: {
                    name: msg.channel.guild.name,
                    icon_url: msg.channel.guild.iconURL,
                },
                thumbnail: {
                    url: msg.channel.guild.iconURL
                },
                description: `<:verified:560210126066155530>: ${verified}, <:discordpartner:560209313872871465>: ${partnered}`,
                color: msg.channel.guild.roles.size && msg.channel.guild.roles.filter(i => i.color).length ? msg.channel.guild.roles.filter(i => i.color).map(i => i).sort((a, b) => b.position - a.position)[0].color : undefined,
                fields: [
                    {
                        name: 'Region',
                        value: msg.channel.guild.region,
                        inline: true,
                    },
                    {
                        name: 'AFK Timeout (Secs)',
                        value: msg.channel.guild.afkTimeout,
                        inline: true,
                    },
                    {
                        name: 'Total Members',
                        value: msg.channel.guild.memberCount,
                        inline: true,
                    },
                    {
                        name: 'Owner',
                        value: `<@${msg.channel.guild.ownerID}>`,
                        inline: true,
                    },
                    {
                        name: 'Creation Date',
                        value: `${created.getDate()}/${created.getMonth() + 1}/${created.getFullYear()} ${created.getHours()}:${createdMins}`,
                        inline: true,
                    },
                    {
                        name: `Roles [${msg.channel.guild.roles.size}]`,
                        value: `${roles}`,
                        inline: false,
                    }
                ],
                footer: { // Footer text
                    text: `ID: ${msg.channel.guild.id}`
                },
                timestamp: new Date()
            }
        })
    },
    options: {
        description: 'Check guild information',
        fullDescription: 'Check the information of the current guild',
        usage: '..serverinfo',
    }
}