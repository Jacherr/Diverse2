module.exports = {
    label: 'coinflip',
    enabled: true,
    isSubCommand: false,
    generator: async (msg, args) => {
        var result = Math.floor(Math.random() * (2)) + 1
        if (result == 1) result = "Heads"
        else result = "Tails"
        msg.channel.createMessage(`Result: ${result}`)
    },
    options: {
        description: 'Flip a coin',
        fullDescription: 'Flip a coin that may land on heads or tails',
        usage: '..coinflip',
        aliases: ['cf']
    }
}