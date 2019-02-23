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

function splitMessage(message, len) {
    const msgArray = [];
    if (!message) {
        return [];
    }
    if (Array.isArray(message)) {
        message = message.join("\n");
    }
    if (message.length > len) {
        let str = "";
        let pos;
        while (message.length > 0) {
            pos = message.length > len ? message.lastIndexOf("\n", len) : message.length;
            if (pos > len) {
                pos = len;
            }
            str = message.substr(0, pos);
            message = message.substr(pos);
            msgArray.push(str);
        }
    }
    else {
        msgArray.push(message);
    }
    return msgArray;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = 0xF;
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    color = color.splice(0,2) + color.splice(4,6)
    return color;
  }
  
module.exports = {
    resolveMember: resolveMember,
    splitMessage : splitMessage
};