const each = require('async-each');
const bot = require('./bot.js');
const glob = require('glob-promise')
async function loadCommands() {
    try {       
        let files = walkSync('./commands/', [])
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


var walkSync = function (dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist = walkSync(dir + file + '/', filelist);
        }
        else {
            filelist.push(file);
        }
    });
    return filelist;
};

process.on('uncaughtException', (err) => { console.log(err.stack) });
process.on('unhandledRejection', (err) => { console.log(err.stack) });

bot.on('ready', () => {
    console.log('Ready!');
    bot.editStatus(null, {
        name: '..help | Diverse',
        type: 0
    });
    loadCommands();
});

bot.on('error', (err) => { console.log(err.stack) });

bot.connect();
