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
                    if (!send) {
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

function resolveFlags(args, noArgFlags) {
    let flags = []
    for(let i = 0; i < args.length - 1; i++) {
        if(args[i].startsWith('--')) {
            if(noArgFlags.includes(args[i].substr(2, args[i].length)) || i == args.length - 1) {
                flags.push({flagName: args[i].substr(2, args[i].length), flagContent: null})
            } else {
                flags.push({flagName: args[i].substr(2, args[i].length), flagContent: args[i + 1]})
            }
            i++
        }
    }
    console.log(flags)
    return flags
}

function resolvePermission(permission) {
    let permsArray = { 'high': [], 'mid': [], 'low': [] };
    if (permission == undefined)
        return permsArray;
    let permissions = [
        { name: 'administrator', type: 'high', value: 'Administrator' },
        { name: 'viewAuditLogs', type: 'high', value: 'View Audit Logs' },
        { name: 'manageGuild', type: 'high', value: 'Manage Server' },
        { name: 'manageRoles', type: 'high', value: 'Manage Roles' },
        { name: 'manageChannels', type: 'high', value: 'Manage Channels' },
        { name: 'manageMessages', type: 'high', value: 'Manage Messages' },
        { name: 'manageNicknames', type: 'high', value: 'Manage Nicknames' },
        { name: 'manageEmojis', type: 'high', value: 'Manage Emojis' },
        { name: 'manageWebhooks', type: 'high', value: 'Manage Webhooks' },
        { name: 'kickMembers', type: 'high', value: 'Kick Members' },
        { name: 'banMembers', type: 'high', value: 'Ban Members' },
        { name: 'createInstantInvite', type: 'mid', value: 'Create Instant Invite' },
        { name: 'mentionEveryone', type: 'mid', value: 'Mention Everyone' },
        { name: 'embedLinks', type: 'mid', value: 'Embed Links' },
        { name: 'attachFiles', type: 'mid', value: 'Attach Files' },
        { name: 'addReactions', type: 'mid', value: 'Add Reactions' },
        { name: 'useExternalEmojis', type: 'mid', value: 'Use External Emojis' },
        { name: 'readMessages', type: 'low', value: 'Read Messages' },
        { name: 'sendMessages', type: 'low', value: 'Send Messages' },
        { name: 'readMessageHistory', type: 'low', value: 'Read Message History' },
    ];
    for (let i = 0; i < permissions.length; i++) {
        let perm = permissions[i];
        if (permission[perm.name] == true || (typeof permission.allow) == 'number' && permission.has(perm.name))
            permsArray[perm.type].push(perm.value);
    }
    return permsArray;
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

function db(db, query) {
    let mysql = require('mysql')
    let dbdetails = require('../config.json')
    if(db == 'test') con = mysql.createConnection(dbdetails.mysqltest)
    else if(db == 'xpdb') con = mysql.createConnection(dbdetails.mysqlxp)
    else return 'not valid'
    con.query(query, (err, rows) => {
        if(err) return err.message
        else if(rows != undefined) return `${require('util').inspect(rows)}`
        else return 'something went wrong'
    })
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return parseInt(color);
  }
  
module.exports = {
    resolveMember: resolveMember,
    splitMessage : splitMessage,
    getRandomColor : getRandomColor,
    db : db,
    resolvePermission : resolvePermission,
    resolveFlags : resolveFlags
};