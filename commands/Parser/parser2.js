module.exports = {
    label: 'parse2',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        const ParseStatements = [
            {
                subject: 'User',
                types: [
                    {
                        name: 'owner',
                        location: msg.channel.guild.members.find(i => i.id == msg.channel.guild.ownerID)
                    },
                    {
                        name: 'user',
                        location: msg.member
                    },
                    {
                        name: 'randomuser',
                        location: msg.channel.guild.members.map(i => id)[Math.floor(Math.random() * Math.floor(msg.channel.guild.members.size))]
                    },
                    {
                        name: 'founduser',
                        location: founduser
                    }
                ]                
            }
        ]
    },
    options: {
        description: 'New parser',
        fullDescription: 'New parser',
        usage: '..parse2 [stuff]',
        aliases: ['p2'],
        requirements: {
            userIDs: ['233667448887312385']
        }
    }
};