const languageProperties = [
    {
        name: 'c#',
        importType: 'using',
        lineBreak = ';',
        defaultImports: ['System'],
        aliases: ['1'],
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
        aliases: ['4'],
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
        lineBreak: undefined,
        defaultImports: ['System', 'System.Collections.Generic', 'System.Linq', 'System.Text.RegularExpressions'],
        aliases: ['visualbasic', '2'],
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
        lineBreak: undefined,
        defaultImports: ['math', 'random'],
        aliases: ['python', 'python3', 'py3', 'python2.7', 'py2.7', 'py2', 'python2', '5', '24'],
        classDeclaration: undefined
    }
]

module.exports = {
    label: 'rextester2',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {

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