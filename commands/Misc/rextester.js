const config = require('../../config.json')
const utils = require('../../utils/utils.js')
const superagent = require('superagent')
module.exports = {
    label: 'rextester',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let imports = []
        let language
        if(args[0] != undefined) language = args[0].toLowerCase()  
        let importLangs = ['vb', 'visualbasic', '2', 'c#', '1', 'java', '4']
        if(args[0] == undefined) return outputFullHelp()
        if(args[0] == 'list') return msg.channel.createMessage("https://hb.wrmsr.io/siraqazugo")
        if(args[0] == 'imports') return outputDefaultImports()      
        let message = await msg.channel.createMessage("Processing, please wait...")
        function outputDefaultImports() {
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
                            value: `\`math\`, \`random\``
                        }
                    ],
                    footer: {
                        text: `Duplicate imports are ignored for languages that can parse imports.`
                    }
                }
            })
        }
        function outputFullHelp() {
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
                            value: `The general usage for all languages is \`..rextester [language] [code]\`, but some languages support imports as well as code and language.\nIn this case, you can use \`..rextester [language] [import <imports>]; [code] and your imports will be parsed for you at the top of the code.`,
                            inline: false
                        },
                        {
                            name: `Examples`,
                            value: `**For most languages:**\n \`..rextester node console.log('Hello World!')\`\n\`..rextester py print('Hello World')\`\n\n**For C#, Visual Basic and Java:**\n\`..rextester c# import System; Console.WriteLine("Hello World!");\`\n\`..rextester java import java.lang.*; System.out.println("Hello World!");\`\n*Inports are not mandatory for these languages - in other words, you can completely disregard the \`import\` statement if you want and the code will still run.*`,
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
        function parseImports(importType, postImport) {
            imports.forEach(element => {
                code = `${importType} ${element}${postImport}\n${code}`
            });
        }
        function fetchImports() {
            for(let i = 2; i < args.length; i++){  
                if(args[i].endsWith(';')) {
                    imports.push(args[i].substr(0, args[i].length - 1))
                    i = args.length + 1
                } else {
                    imports.push(args[i])
                }
            };
        }
        function removeDuplicates(defaultImports) {
            let i = 0
            imports.forEach(element => {
                if(defaultImports.includes(element)) {
                    imports.splice(i, 1)
                }
                i++
            });
            defaultImports.forEach(element => {
                imports.push(element)
            })
        }
        function genCSharp() {
            code = `namespace Rextester\n
                    {\n
                        public class Program\n
                        {\n
                            public static void Main(string[] args)\n
                            {\n
                                ${code}
                            }\n
                        }\n
                    }`
            removeDuplicates(['System'])
            parseImports('using', ';')
        }
        function genJava() {
            code = `class Rextester\n
            {\n
                public static void main(String args[])\n
                {\n
                    ${code}
                }\n
            }`
            parseImports('import', ';')
        }
        function genVisualBasic() {
            code = `         
            Namespace Rextester\n
                Public Module Program\n
                    Public Sub Main(args() As string)\n
                        ${code}
                    End Sub\n
                End Module\n
            End Namespace`
            parseImports('Imports', '')
        }
        function genPython() {
            imports = ['math', 'random']
            parseImports('import', '')
        }
        if(args[1] == 'import' && importLangs.includes(language)) {
            fetchImports()
            args.splice(0, imports.length + 2)
        } else {
            args.splice(0, 1)
        }
        let code = args.join(" ")
        if(language == 'c#' || language == '1') {
            genCSharp()
        } else if(language == 'java' || language == '4') {
            genJava()
        } else if(language == 'vb' || language == 'visualbasic' || language == '2') {
            genVisualBasic()
        } else if(language == 'py' || language == 'py3' || language == 'python' || language == 'python3' || language == '24') {
            genPython()
        }
        console.log(code)
        let value = await superagent
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
                if(response.text.length == 0) return msg.channel.createMessage("Empty response")
                if (response.text.length > 1900) {
                    let responsetext = response.text.substr(0, 1900)
                    msg.channel.createMessage(`\`\`\`${responsetext}\`\`\``)
                } else {
                    msg.channel.createMessage(`\`\`\`${response.text}\`\`\``)
                }
            };
        });
    },
    options: {
        description: 'Run code via rextester',
        fullDescription: 'Run code via rextester in a range of languages - do \`..rextester\` for a full help dialogue',
        usage: '..rextester [help|lang] <import [imports];> [code]',
        aliases: ['rex', 'debug'],
    }
};