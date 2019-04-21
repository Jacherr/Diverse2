module.exports = {
label: 'flag',
enabled: true,
isSubcommand: false,
generator: async (msg, args) => {
    let splits = args.join(" ").split("|")
    let result = require('util').inspect(require('../../utils/utils.js').resolveFlags(splits[0].split(" "), splits[1].split(" ")));
    msg.channel.createMessage(`\`\`\`js\n${result}\`\`\``)
},
options: {
description: 'Resolve flags',
fullDescription: 'Resolvbe flags',
usage: '..flag [text to resolve | flags with an argument]',
aliases: ['f'],
}
};