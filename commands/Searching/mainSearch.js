module.exports = {
    label: 'search',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        msg.channel.createMessage( { 
            embed: {
                description: `\`..search discriminator [discrim]\`\n\`..search username [username]\`\n\`..search role [role]\`\n`
            }
        });
    },
    options: {
        description: 'Search for various properties',
        fullDescription: 'Search for various properties, listed with \`..search\`',
        usage: '..search [property]',
        aliases: ['s'],
    },
    subcommands: [require('./discriminator.js'), require('./username.js')]
};