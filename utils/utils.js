function resolveMember(msg, args, send) {
    let botuser;
    if (args.length > 0) {
        let arg = args.join(" ");
        if (msg.mentions[0] !== undefined) {
            botuser = msg.channel.guild.members.get(msg.mentions[0].id);
        } else {
            if (msg.channel.guild.members.get(`${args[0]}`) === undefined) {
                if (msg.channel.guild.members.find(m => m.username.toLowerCase().includes(`${arg.toLowerCase()}`)) !== undefined) {
                    botuser = msg.channel.guild.members.find(m => m.username.toLowerCase().includes(`${arg.toLowerCase()}`));
                } else if (msg.channel.guild.members.find(m => m.username + "#" + m.discriminator === `${arg}`) !== undefined) {
                    botuser = msg.channel.guild.members.find(m => m.username + "#" + m.discriminator === `${arg}`);
                } else if (msg.channel.guild.members.filter(m => m.nick).find(m => m.nick.toLowerCase() === `${arg.toLowerCase()}`) !== undefined) {
                    botuser = msg.channel.guild.members.filter(m => m.nick).find(m => m.nick.toLowerCase() === `${arg.toLowerCase()}`);
                } else {
                    if (send = false) {
                        msg.channel.createMessage(`<:redtick:495959132180840449> Nothing found for "${arg}"`);
                    }
                    return botuser = undefined;
                }
            } else {
                botuser = msg.channel.guild.members.get(`${args[0]}`);
            }
        }
    } else {
        botuser = msg.channel.guild.members.get(msg.member.id);
    }
    return botuser;
}

module.exports = {
    resolveMember: resolveMember
};