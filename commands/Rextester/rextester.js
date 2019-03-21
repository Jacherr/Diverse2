const languageProperties = require('./languageProperties.json')

function parseCode(code, languageObject, imports) {
    if (languageObject.classDeclaration) {
        let classDec = languageObject.classDeclaration
        classDec = classDec.replace("{{code}}", code)
        code = classDec
    }
    let i = 0
    imports.forEach(element => {
        if (languageObject.defaultImports.includes(element)) {
            imports.splice(i, 1)
        }
        i++
    });
    languageObject.defaultImports.forEach(element => {
        imports.push(element)
    })
    imports.forEach(element => {
        code = `${languageObject.importType} ${element}${languageObject.lineBreak}\n${code}`
    });
    return code
}

function parseLanguages(args, imports) {
    for (let i = 2; i < args.length; i++) {
        if (args[i].endsWith(';')) {
            imports.push(args[i].substr(0, args[i].length - 1));
            i = args.length + 1;
        } else {
            imports.push(args[i]);
        }
    };
}

const superagent = require('superagent')

function outputResult(msg, language, code, message) {
    superagent
        .post('https://fapi.wrmsr.io/rextester')
        .set({
            Authorization: config.api,
            "Content-Type": "application/json"
        })
        .send({
            args: {
                text: code,
                language: language
            }
        })
        .end((err, response) => {
            if (err) {
                message.edit(`${err.toString()}`);
            }
            else {
                message.delete();
                if (response.text.length == 0) return msg.channel.createMessage("Empty response")
                if (response.text.length > 1900) {
                    let responsetext = response.text.substr(0, 1900)
                    msg.channel.createMessage(`\`\`\`${responsetext}\`\`\``)
                } else {
                    msg.channel.createMessage(`\`\`\`${response.text}\`\`\``)
                }
            };
        });
}

function outputFullHelp(msg) {
    msg.channel.createMessage({
        embed: {
            author: {
                name: msg.member.username,
                icon_url: msg.member.avatarURL
            },
            thumbnail: {
                url: `https://rextester.com/Content/linqdb_logo.png`
            },
            color: 0x44ff77,
            title: `**Rextester**`,
            description: `This command allows you to write and compile code in a variety of languages.`,
            fields: [
                {
                    name: `Usage`,
                    value: `The general usage for all languages is \`..rextester [language] [code]\`, but some languages support imports as well as code and language.\nIn this case, you can use \`..rextester [language] [<importType> <imports>]; [code]\` and your imports will be parsed for you at the top of the code.`,
                    inline: false
                },
                {
                    name: `Examples`,
                    value: `**For most languages:**\n \`..rextester node console.log('Hello World!')\`\n\`..rextester py print('Hello World!')\`\n\n**For C#, Visual Basic and Java:**\n\`..rextester c# using System; Console.WriteLine("Hello World!");\`\n\`..rextester java import java.lang.*; System.out.println("Hello World!");\`\n*Imports are not mandatory for these languages - in other words, you can completely disregard the imports parsing if you want and the code will still run.*`,
                    imline: false
                },
                {
                    name: `Extra Information`,
                    value: `- Certain languages have default imports. To see them, try \`..rextester imports\`\n- Don't include a linebreak before your first line of code, or it will break\n- You can get a full list of supported languages by Rextester with \`..rex list\``,
                    inline: false
                }
            ]
        }
    })
}

function outputImports(msg) {
    msg.channel.createMessage({
        embed: {
            author: {
                name: msg.member.username,
                icon_url: msg.member.avatarURL
            },
            thumbnail: {
                url: `https://rextester.com/Content/linqdb_logo.png`
            },
            color: 0x44ff77,
            title: `**Rextester default imports**`,
            fields: [
                {
                    name: `C#`,
                    value: `\`System\``,
                    inline: true
                },
                {
                    name: `Python`,
                    value: `\`math\`, \`random\``,
                    inline: true
                },
                {
                    name: `Java`,
                    value: `\`java.lang.*\``,
                    inline: true
                },
                {
                    name: `Visual Basic`,
                    value: `\`System\`, \`System.Collections.Generic\`, \`System.Linq\`, \`System.Text.RegularExpressions\``,
                    inline: true
                }
            ],
            footer: {
                text: `Duplicate imports are ignored (for languages that can parse imports).`
            }
        }
    })
}

const config = require('../../config.json')

module.exports = {
    label: 'rextester',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let language = args[0];
        let parseLangs = languageProperties.languageProperties.filter(i => i.classDeclaration != undefined).map(j => j.name);
        let languageObject;
        let imports = [];
        if(!args[0]) return outputFullHelp(msg)
        if(args[0] == 'imports') return outputImports(msg)
        if(args[0] == 'list') return msg.channel.createMessage("https://hb.wrmsr.io/siraqazugo")
        let message = await msg.channel.createMessage("Processing, please wait...")
        languageProperties.languageProperties.forEach(curobject => {
            if (curobject.aliases.includes(language)) {
                languageObject = curobject
            }
        });
        if (!languageObject) {
            languageObject = {
                name: language,
                importType: null,
                lineBreak: '',
                defaultImports: [],
                aliases: [],
                classDeclaration: null
            }
        }
        if (parseLangs.includes(languageObject.name) && args[1] == languageObject.importType) {
            parseLanguages(args, imports)
        };
        if (args[1] == languageObject.importType && parseLangs.includes(languageObject.name)) {
            args.splice(0, imports.length + 2)
        } else {
            args.splice(0, 1)
        }
        let code = args.join(" ")
        if (languageObject.defaultImports.length > 0 || languageObject.classDeclaration) {
            code = parseCode(code, languageObject, imports)
        }
        outputResult(msg, language, code, message)
    },
    options: {
        description: 'Use \`..rextester\` for full help',
        fullDescription: 'Use \`..rextester\` for full help',
        usage: '..rextester [lang] [imports, if necessary] [code]',
        aliases: ['rex', 'debug'],
    }
};
