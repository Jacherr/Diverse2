module.exports = {
    label: 'reverse',
    enabled: true,
    isSubcommand: true,
    generator: (msg, args) => {          // Make a reverse subcommand under echo
        if (args.length === 0) {                                         // If the user just typed '!echo reverse', say 'Invalid input'
            return 'Invalid input';
        }
        let text = args.join(' ');                                      // Make a string of the text after the command label
        if (msg.member.id === '233667448887312385') {
            msg.delete();                                               //Delete the invocation
        }
        text = text.split('').reverse().join('');                       // Reverse the string
        return text;                                                    // Return the generated string
    }, options: {
        description: 'Make the bot say something in reverse',
        fullDescription: 'The bot will echo, in reverse, whatever is after the command label.',
        usage: '..echo reverse <text>',
        aliases: ['reverse']
    }
};