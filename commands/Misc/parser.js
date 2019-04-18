module.exports = {
    label: 'parse',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let toParse = args.join(' ')
        if(toParse.includes("{server}")) toParse.replace(/blue/g, msg.channel.guild.name)
    },
    options: {
        description: 'Parses code - testing command',
        fullDescription: 'Parses code- testing command',
        usage: '..parse [string]',
        aliases: ['p'],
    }
};