
module.exports = {
    label: '8ball',
    enabled: true,
    isSubCommand: false,
    generator: (msg, args) => {
        let question = args.join(' ');
        let responses = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful']
        let responsechoice = Math.floor(Math.random() * responses.length)
        let response = responses[responsechoice]
        if (question.length <= 0)  {
            return msg.channel.createMessage('You need to ask the great 8ball a question!');
        } else {
            return msg.channel.createMessage(`🔈 \`${question}\`\n\n🎱 \`${response}\``);
        }
    },
    options: {
        description: 'Shake an 8 ball',
        fullDescription: 'Ask a question with a yes/no answer and the 8ball will determine the outcome of your question',
    }
};
