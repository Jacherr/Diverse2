module.exports = {
    label: 'invite',
    enabled: true,
    isSubcommand: false,
    generator: (msg) => {
        msg.channel.createMessage({
            embed: {
                title: 'Invite',
                description: `[Click here](https://discordapp.com/api/oauth2/authorize?client_id=490810263717675019&permissions=0&scope=bot)`,
            }
        })
    },
    options: {
        description: 'Invite the bot',
        fullDescription: 'Fetch link to invite the bot',
        usage: '..invite'
    }
};
