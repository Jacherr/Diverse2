module.exports = {
    label: 'echo',
    enabled: true,
    isSubcommand: false,
    generator: (msg, args) => {
        if(args.length === 0) { // If the user just typed "!echo", say "Invalid input"
        return "Invalid input";
        }
        if (msg.member.id === '233667448887312385') {
            msg.delete();                                               //Delete the invocation
        }
        let text = args.join(" "); // Make a string of the text after the command label
        return text; // Return the generated string
    }, 
    options: {
        description: "Make the bot say something",
        fullDescription: "The bot will echo whatever is after the command label.",
        usage: "..echo <text>",
        aliases: ['say']
    },
    subcommands: [require('./echo-sub.js')],
}