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