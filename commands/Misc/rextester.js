const config = require('../../config.json')
const utils = require('../../utils/utils.js')
const superagent = require('superagent')
module.exports = {
    label: 'rextester',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let imports = []
        let language = args[0]
        if(args[0] == undefined) return msg.channel.createMessage(`\`..rex help\``)
        if(args[0] == 'help') return msg.channel.createMessage("https://hb.wrmsr.io/siraqazugo")       
        let message = await msg.channel.createMessage("Processing, please wait...")
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
        if(args[1] == 'import') {
            fetchImports()
            args.splice(0, imports.length + 2)
        } else {
            args.splice(0, 1)
        }
        let code = args.join(" ")
        if(language == 'c#') {
            genCSharp()
        } else if(language == 'java') {
            genJava()
        } else if(language == 'vb') {
            genVisualBasic()
        } else if(language == 'py') {
            genPython3()
        }
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
        fullDescription: 'Run code via rextester in a range of languages - do \`..rex help\` for a list of supported languages',
        usage: '..rextester [help|lang] <import [imports];> [code]',
        aliases: ['rex', 'debug'],
    }
};