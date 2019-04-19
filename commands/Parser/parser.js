let rnduser;
const utils = require('../../utils/utils.js')
const resetRnd = (msg) => {
    rnduser = msg.channel.guild.members.map(i => i)[Math.floor(Math.random() * msg.channel.guild.members.size)]
}
module.exports = {
    label: 'parse',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        resetRnd(msg)
        const objectValues = {
            server: {
                main: '{server.{property}}',
                name: ['name', msg.channel.guild.name],
                members: ['size', msg.channel.guild.members.size],
                owner: ['owner', msg.channel.guild.members.get(msg.channel.guild.ownerID).username]
            },
            user: {
                main: '{user.{property}}',
                name: ['name', msg.author.username],
                joindate: ['joined', new Date(msg.member.joinedAt).toUTCString()],
                discriminator: ['discrim', msg.author.discriminator]
            },
            randomuser: {
                main: '{randomuser.{property}}',
                name: ['name', rnduser.username],
                joindate: ['joined', new Date(rnduser.joinedAt).toUTCString()],
                discriminator: ['discrim', rnduser.discriminator],
            }
        }
        const individualValues = {
            randomcolor: ['randomcolor', utils.getRandomColor().toString(16)]
        }
        let toParse = args.join(' ')
        Object.keys(objectValues).forEach(function (baseKey) {
            Object.keys(objectValues[baseKey]).forEach(function (subKey) {
                toParse = toParse.replace(new RegExp(objectValues[baseKey]['main'].replace('{property}', objectValues[baseKey][subKey][0]), 'g'), objectValues[baseKey][subKey][1])
            });
        });
        Object.keys(individualValues).forEach(function (baseKey) {
            toParse = toParse.replace(new RegExp(`{${individualValues[baseKey][0]}}`, 'g'), individualValues[baseKey][1])
        });
        msg.channel.createMessage(toParse)
    },
    options: {
        description: 'Parses code - testing command',
        fullDescription: 'Parses code - testing command',
        usage: '..parse [string]',
        aliases: ['p'],
    },
    subcommands: [require('./parseHelp.js')],
};