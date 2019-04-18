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
                joindate: ['joined', msg.author.joindate]
            }
        }
        let toParse = args.join(' ')
        Object.keys(parseTypes).forEach(function(baseKey) {
            Object.keys(parseTypes[baseKey]).forEach(function(subKey) {
                if(subKey != 'main') {
                    toParse = toParse.replace(parseTypes[baseKey]['main'].replace('{property}', parseTypes[baseKey][subKey][0]), parseTypes[baseKey][subKey][1])
                }
            });
        });
        msg.channel.createMessage(toParse)
    },
    options: {
        description: 'Parses code - testing command',
        fullDescription: 'Parses code - testing command',
        usage: '..parse [string]',
        aliases: ['p'],
    }
};