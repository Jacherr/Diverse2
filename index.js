const Eris = require('eris');
const each = require('async-each');
const bot = require('./bot.js');
const glob = require('glob-promise')
const mysql = require('mysql')
const xp = require('config.json')

async function loadCommands() {
    try {       
        let files = await glob('**/*.js', {
            cwd: './commands',
            root: './commands',
            absolute: true
        });
        each(files, (file, next) => {
            if (!file.endsWith('.js')) {
                return next();
            };
            let c = require(file);
            if (c.enabled === true && !c.isSubcommand) {
                let cmd = bot.registerCommand(c.label, c.generator, c.options);
                registerSubcommands(c, cmd);

                function registerSubcommands(cmd, parent) {
                    cmd.subcommands = cmd.subcommands || [];
                    cmd.subcommands.forEach((subcmd) => {
                        if (subcmd.enabled) {
                            let c = parent.registerSubcommand(subcmd.label, subcmd.generator, subcmd.options);
                            registerSubcommands(subcmd, c);
                        }
                    });
                }
            }
            return next();
        }, err => {
            if (err) {
                console.log(err);
            };
        });
        console.log(`Registered ${Object.keys(bot.commands).length} commands`);
    } catch (err) {
        console.error(err);
    };
};

process.on('uncaughtException', (err) => { console.log(err.stack) });
process.on('unhandledRejection', (err) => { console.log(err.stack) });

bot.on('messageCreate', (msg) => {
    let con = mysql.createConnection(xp.mysqlxp)
    
});

bot.on('ready', () => {
    console.log('Ready!');
    bot.editStatus(null, {
        name: '..help',
        type: 0
    });
    loadCommands();
});

bot.on('error', (err) => { console.log(err.stack) });

bot.connect();
