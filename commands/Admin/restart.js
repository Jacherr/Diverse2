module.exports = {
    label: 'restart',
    enabled: true,
    isSubCommand: false,
    generator: async (msg) => {
        await msg.channel.createMessage(`Restarting`)
        process.exit(0)
    },
    options: {
        description: 'Restart the bot',
        fullDescription: 'Restarts the bot process',
        usage: '..restart [code]',
        aliases: ["r"],
        requirements: {
            userIDs: ["233667448887312385", "155698776512790528"]
        }
    }
}