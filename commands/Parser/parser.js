const utils = require('../../utils/utils.js')
module.exports = {
    label: 'parse',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        const parseTypes = {
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
            randomcolor: utils.getRandomColor()
        }
        let toParse = args.join(' ')
        Object.keys(parseTypes).forEach(function(baseKey) {
            Object.keys(parseTypes[baseKey]).forEach(function(subKey) {
                if(subKey != 'main') {
                    toParse = toParse.replace(new RegExp(parseTypes[baseKey]['main'].replace('{property}', parseTypes[baseKey][subKey][0]), 'g'), parseTypes[baseKey][subKey][1])
                }
            });
            if(!Object.keys(parseTypes[baseKey]).includes('main')) {
                toParse = toParse.replace(new RegExp(`{${Object.keys(parseTypes[baseKey])}}`, 'g'), parseTypes[baseKey])
            }
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