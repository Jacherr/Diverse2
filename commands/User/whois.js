const utils = require('./../../utils/utils.js');
const acks = require('./../../goodguys.json')

module.exports = {
    label: 'whois',
    enabled: true,
    isSubCommand: false,
    generator: async (msg, args) => {
        let botuser = await utils.resolveMember(msg, args)       
        let roles = `No Roles`;
        let msgArray = [];
        let userstatus;
        let joined = new Date(botuser.joinedAt);
        let joinedMins = joined.getMinutes();
        if (joined.getMinutes() <= 9) {
            joinedMins = `0${joined.getMinutes()}`;
        }
        let created = new Date(botuser.createdAt);
        let createdMins = created.getMinutes();
        if (created.getMinutes() <= 9) {
            createdMins = `0${created.getMinutes()}`;
        }
        if (botuser.status === "dnd") {
            userstatus = "Do Not Disturb"
        } else if (botuser.status === "idle") {
            userstatus = "Idle"
        } else if (botuser.status === "online") {
            userstatus = "Online"
        } else if (botuser.status === "offline") {
            userstatus = "Offline/Invisible"
        }
        if (botuser.roles.length > 0) {
            roles = botuser.roles;
            roles.forEach(r => msgArray.push(msg.channel.guild.roles.get(r)));
            roles = msgArray.sort((a, b) => { return b.position - a.position; })
        }
        if (roles.length > 1024) {
            roles = `Too many roles to display!`;
        }
        function getAcks() {
            let acknowledgements = [];
            if(botuser.id == '490810263717675019') acknowledgements.push("The Real Diverse");
            if(acks.Developer.includes(botuser.id)) acknowledgements.push('Developer');
            if(acks.Contributor.includes(botuser.id)) acknowledgements.push('Contributor');
            if(acks.CoolGuy.includes(botuser.id)) acknowledgements.push('Cool guy');
            return acknowledgements;
        }
        let aks = getAcks()
        let fields = [ 
            {
                name: 'Game',
                value: botuser.game ? botuser.game.name : 'Nothing',
                inline: true
            },
            {
                name: `Registration date`,
                value: `${created.getDate()}/${created.getMonth() + 1}/${created.getFullYear()} ${created.getHours()}:${createdMins}`,
                inline: true
            },
            {
                name: `Join date`,
                value: `${joined.getDate()}/${joined.getMonth() + 1}/${joined.getFullYear()} ${joined.getHours()}:${joinedMins}`,
                inline: true
            },
            {
                name: 'Status',
                value: userstatus,
                inline: true
            },
            {
                name: `Roles [${msg.member.roles.length}]`,
                value: roles.map(i => `<@&` + i.id + `>`).join(', '),
                inline: false
            }
        ]
        if(aks.length > 0) {
            fields.push(
                {
                    name: 'Acknowledgements',
                    value: aks.join(', '),
                    inline: true
                }
            )
        }
        msg.channel.createMessage({
            embed: {
                description: botuser.mention,
                author: { // Author property
                    name: botuser.username,
                    icon_url: botuser.avatarURL
                },
                thumbnail: {
                    url: botuser.avatarURL
                },
                color: roles.filter(i => i.color != 0)[0].color,
                fields: fields,
                footer: {
                    text: `ID: ${botuser.id}`
                },
                timestamp: new Date()
            }
        });
    },
    options: {
        description: 'Check a user\'s information',
        fullDescription: 'Displays information about a user (or yourself).',
        aliases: ['who', 'userinfo', 'whomst', 'whomstve', 'whomstve\'d'],
        usage: 'mention, ID, username or nickname'
    }
};