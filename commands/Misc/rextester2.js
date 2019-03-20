const languageProperties = [
    {
        name: 'c#',
        importType: 'using',
        lineBreak: ';',
        defaultImports: ['System'],
        aliases: ['1', 'c#'],
        classDeclaration: `namespace Rextester
        {
            public class Program
            {
                public static void Main(string[] args)
                {
                    {{code}}
                }
            }
        }`
    },
    {
        name: 'java',
        importType: 'import',
        lineBreak: ';',
        defaultImports: ['java.lang.*'],
        aliases: ['4', 'java'],
        classDeclaration: `class Rextester
        {
            public static void main(String args[])
            {
                {{code}}
            }
        }`
    },
    {
        name: 'vb',
        importType: 'Imports',
        lineBreak: '',
        defaultImports: ['System', 'System.Collections.Generic', 'System.Linq', 'System.Text.RegularExpressions'],
        aliases: ['visualbasic', '2', 'vb'],
        classDeclaration: `Namespace Rextester
            Public Module Program
                Public Sub Main(args() As string)
                    {{code}}
                End Sub
            End Module
        End Namespace`
    },
    {
        name: 'py',
        importType: 'import',
        lineBreak: '',
        defaultImports: ['math', 'random'],
        aliases: ['python', 'python3', 'py3', 'python2.7', 'py2.7', 'py2', 'python2', '5', '24', 'py'],
        classDeclaration: undefined
    }
]

function parseCode(code, languageObject, imports) {
    if (languageObject.classDeclaration != undefined) {
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
    imports.forEach(element => {
        code = `${languageObject.importType} ${element}${languageObject.lineBreak}\n${code}`
    });
    languageObject.defaultImports.forEach(element => {
        imports.push(element)
    })
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

const config = require('../../config.json')

module.exports = {
    label: 'rextester2',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let language = args[0];
        let parseLangs = languageProperties.filter(i => i.classDeclaration != undefined).map(j => j.name);
        let languageObject;
        let imports = [];
        let message = await msg.channel.createMessage("Processing, please wait...")
        languageProperties.forEach(curobject => {
            if (curobject.aliases.includes(language)) {
                languageObject = curobject
            }
        });
        if (!languageObject) {
            languageObject = {
                name: language,
                importType: undefined,
                lineBreak: '',
                defaultImports: [],
                aliases: [],
                classDeclaration: undefined
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
        if (languageObject.defaultImports.length > 0 || languageObject.classDeclaration != undefined) {
            code = parseCode(code, languageObject, imports)
        }
        outputResult(msg, language, code, message)
    },
    options: {
        description: 'This is a testing command',
        fullDescription: 'This is a testing command',
        usage: '..rextester2 [lang] [imports] [code]',
        aliases: ['rt'],
        requirements: {
            userIDs: '233667448887312385'
        }
    }
};