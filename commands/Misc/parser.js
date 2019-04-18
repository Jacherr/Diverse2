module.exports = {
    label: 'parse',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let toParse = args.join(' ')
        if(toParse.includes("{server}")) toParse.replace(/{server}/g, msg.channel.guild.name)
        msg.channel.createMessage(toParse)
    },
    options: {
        description: 'Parses code - testing command',
        fullDescription: 'Parses code- testing command',
        usage: '..parse [string]',
        aliases: ['p'],
    }
};