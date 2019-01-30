module.exports = {
    label: 'diceroll',
    enabled: true,
    isSubCommand: false,
    generator: async (msg, args) => {
        var result = Math.floor(Math.random() * (6)) + 1
        msg.channel.createMessage(`Result: ${result}`)
    },
    options: {
        description: 'Roll a dice',
        fullDescription: 'Roll. a dice that may land on a number between 1 and 6',
        usage: '..diceroll',
        aliases: ['dr']
    }
}