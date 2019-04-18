module.exports = {
    label: 'parse',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let toParse = args.join(' ')
        msg.channel.createMessage(`1 ${toParse}`)
        let a = toParse.replace(/{server}/g, msg.channel.guild.name)
        msg.channel.createMessage(`2 ${a}`)
    },
    options: {
        description: 'Parses code - testing command',
        fullDescription: 'Parses code - testing command',
        usage: '..parse [string]',
        aliases: ['p'],
    }
};