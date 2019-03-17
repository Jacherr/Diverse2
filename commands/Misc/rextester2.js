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

module.exports = {
    label: 'rextester2',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let language = args[0];
        let parseLangs = languageProperties.filter(i => i.classDeclaration != undefined).map(j => j.name);
        let languageObject;
        let imports = [];
        languageProperties.forEach(curobject => {
            if(curobject.aliases.includes(language)) {
                languageObject = curobject
            }
        });
        if(parseLangs.includes(languageObject.name) && args[1] == languageObject.importType) {
            for(let i = 2; i < args.length; i++){  
                if(args[i].endsWith(';')) {
                    imports.push(args[i].substr(0, args[i].length - 1));
                    i = args.length + 1;
                } else {
                    imports.push(args[i]);
                }
            };
        };
        if(args[1] == languageObject.importType && parseLangs.includes(languageObject.name)) {
            args.splice(0, imports.length + 2)
        } else {
            args.splice(0, 1)
        }
        let code = args.join(" ")
        if(languageObject.classDeclaration != undefined) {
            languageObject.classDeclaration.replace("{{code}}", code)
            code = languageObject.classDeclaration
            imports.forEach(element => {
                code = `${languageObject.importType} ${element}${languageObject.lineBreak}\n${code}`
            });
        }
        console.log(code)
        console.log(language)
        console.log(imports)
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