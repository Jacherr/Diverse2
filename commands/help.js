const bot = require('../bot.js');

module.exports = {
    label: 'help',
    enabled: true,
    isSubcommand: false,
    generator: (msg, args) => {
        let result = '';
        if (args.length > 0) {
            let cur = bot.commands[bot.commandAliases[args[0]] || args[0]];
            if (!cur) {
                return 'Command not found';
            }
            let label = cur.label;
            for (let i = 1; i < args.length; ++i) {
                cur = cur.subcommands[cur.subcommandAliases[args[i]] || args[i]];
                if (!cur) {
                    return 'Command not found';
                }
                label += ' ' + cur.label;
            }
            result += `**Command:** [${msg.prefix}${label}]() \n**Usage:** ${cur.usage}\n**Description:** ${cur.fullDescription}`;
            let fulldesc = 'No Description.'
            if (cur.fullDescription !== '') {
                fulldesc = cur.fullDescription
            }
            let usage = 'No extra usage info.'
            if (cur.usage !== '') {
                usage = cur.usage
            }
            let aliases = 'No Aliases'
            if (Object.keys(cur.aliases).length > 0) {
                aliases = cur.aliases.join(', ');
            }
            let sub = 'No Sub Commands'
            if (Object.keys(cur.subcommands).length > 0) {
                sub = ''
                for (let subLabel in cur.subcommands) {
                    if (cur.subcommands[subLabel].permissionCheck(msg)) {
                        sub += `\n**${subLabel}** - ${cur.subcommands[subLabel].description}`;
                    }
                }
            }
            if (sub != 'No Sub Commands') {
                if (aliases != 'No Aliases') {
                    msg.channel.createMessage({
                        embed: {
                            color: 15844367,
                            author: {
                                name: 'Help Command',
                                icon_url: bot.user.avatarURL
                            },
                            footer: {
                                text: `Help command, called by ${msg.author.username}`
                            },
                            thumbnail: {
                                url: bot.user.avatarURL
                            },
                            fields: [{
                                name: 'Command',
                                value: label,
                                inline: true
                            },
                            {
                                name: 'Usage',
                                value: usage,
                                inline: true
                            }, {
                                name: 'Aliases',
                                value: aliases,
                                inline: true
                            }, {
                                name: 'Description',
                                value: fulldesc,
                                inline: false
                            }, {
                                name: 'Sub Commands',
                                value: sub,
                                inline: false
                            }
                            ]
                        }
                    })
                }
            }
            if (sub == 'No Sub Commands') {
                if (aliases == 'No Aliases')
                    msg.channel.createMessage({
                        embed: {
                            color: 15844367,
                            author: {
                                name: 'Help Command',
                                icon_url: bot.user.avatarURL
                            },
                            footer: {
                                text: `Help command, called by ${msg.author.username}`
                            },
                            thumbnail: {
                                url: bot.user.avatarURL
                            },
                            fields: [{
                                name: 'Command',
                                value: label,
                                inline: true
                            },
                            {
                                name: 'Usage',
                                value: usage,
                                inline: true
                            }, {
                                name: 'Description',
                                value: fulldesc,
                                inline: false
                            }
                            ]
                        }
                    })
            }
            if (aliases != 'No Aliases') {
                if (sub == 'No Sub Commands') {
                    msg.channel.createMessage({
                        embed: {
                            color: 15844367,
                            author: {
                                name: 'Help Command',
                                icon_url: bot.user.avatarURL
                            },
                            footer: {
                                text: `Help command, called by ${msg.author.username}`
                            },
                            thumbnail: {
                                url: bot.user.avatarURL
                            },
                            fields: [{
                                name: 'Command',
                                value: label,
                                inline: true
                            },
                            {
                                name: 'Usage',
                                value: usage,
                                inline: true
                            }, {
                                name: 'Aliases',
                                value: aliases,
                                inline: true
                            }, {
                                name: 'Description',
                                value: fulldesc,
                                inline: false
                            }
                            ]
                        }
                    })
                }
            }
            if (aliases == 'No Aliases') {
                if (sub != 'No Sub Commands') {
                    msg.channel.createMessage({
                        embed: {
                            color: 15844367,
                            author: {
                                name: 'Help Command',
                                icon_url: bot.user.avatarURL
                            },
                            footer: {
                                text: `Help command, called by ${msg.author.username}`
                            },
                            thumbnail: {
                                url: bot.user.avatarURL
                            },
                            fields: [{
                                name: 'Command',
                                value: label,
                                inline: true
                            },
                            {
                                name: 'Usage',
                                value: usage,
                                inline: true
                            }, {
                                name: 'Description',
                                value: fulldesc,
                                inline: false
                            }, {
                                name: 'Sub Commands',
                                value: sub,
                                inline: false
                            }
                            ]
                        }
                    })
                }
            }
            if (Object.keys(cur.subcommands).length > 0) {
                result += '\n\n**Subcommands:**';
                for (let subLabel in cur.subcommands) {
                    if (cur.subcommands[subLabel].permissionCheck(msg)) {
                        result += `\n  **${subLabel}** - ${cur.subcommands[subLabel].description}`;
                    }
                }
            }
        } else {
            result += `${bot.commandOptions.name} - ${bot.commandOptions.description}\n`;
            if (bot.commandOptions.owner) {
                result += `by ${bot.commandOptions.owner}\n`;
            }
            result += '\n';
            result += '**Commands:**\n';
            for (label in bot.commands) {
                if (bot.commands[label] && bot.commands[label].permissionCheck(msg)) {
                    result += `  [${msg.prefix}${label}]() - ${bot.commands[label].description}\n`;
                }
            }    
        }
        let footer = `\nType ${msg.prefix}help <command> for more info on a command.`;
        if (!args.length > 0) {
            bot.getDMChannel(msg.author.id).then(dm => {
                bot.createMessage(dm.id, {
                    embed: {
                        color: 15844367,
                        title: `${bot.user.username}`,
                        description: result,
                        author: {
                            name: 'Commands',
                            icon_url: bot.user.avatarURL
                        },
                        footer: {
                            text: footer,
                        }
                    }
                })
                bot.addMessageReaction(msg.channel.id,msg.id,':mailbox_with_mail:',msg.author.id)
                .catch(err => {
                    msg.channel.createMessage('Check your DMs')
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    options: {
        description: 'This help text',
        usage: '..help <command>',
        fullDescription: 'This command is used to view information of different bot commands, including this one.',
        guildOnly: true,
        aliases: ['halp']
    }
}