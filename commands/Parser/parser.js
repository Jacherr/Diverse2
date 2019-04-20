let rnduser;
const utils = require('../../utils/utils.js')
const resetRnd = (msg) => {
    rnduser = msg.channel.guild.members.map(i => i)[Math.floor(Math.random() * msg.channel.guild.members.size)]
}
const getUser = (user) => {

}
module.exports = {
    label: 'parse',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let serverOwner = msg.channel.guild.members.find(i => i.id == msg.channel.guild.ownerID)
        resetRnd(msg)
        const objectValues = {
            server: {
                main: '{server.{property}}',
                name: ['name', msg.channel.guild.name],
                members: ['size', msg.channel.guild.members.size],
                owner: ['owner', msg.channel.guild.members.get(msg.channel.guild.ownerID).username],
                created: ['created', new Date(msg.channel.guild.createdAt).toUTCString()]
            },
            user: {
                main: '{user.{property}}',
                name: ['name', msg.author.username],
                joindate: ['joined', new Date(msg.member.joinedAt).toUTCString()],
                discriminator: ['discrim', msg.author.discriminator],
                created: ['created', new Date(msg.member.createdAt)]
            },
            randomuser: {
                main: '{randomuser.{property}}',
                name: ['name', rnduser.username],
                joindate: ['joined', new Date(rnduser.joinedAt).toUTCString()],
                discriminator: ['discrim', rnduser.discriminator],
                created: ['created', new Date(msg.member.createdAt)]
            },
            serverowner: {
                main: '{owner.{property}}',
                name: ['name', serverOwner.username],
                discriminator: ['discrim', serverOwner.discriminator],
                created: ['created', new Date(serverOwner.createdAt).toUTCString()]
            }
        }
        const individualValues = {
            randomcolor: ['randomcolor', utils.getRandomColor().toString(16)],
            getuser: ['getuser:{arg}']
        }
        let toParse = args.join(' ')
        Object.keys(individualValues).forEach(function (baseKey) {
            if(!individualValues[baseKey][0].includes(':')) {
                toParse = toParse.replace(new RegExp(`{${individualValues[baseKey][0]}}`, 'g'), individualValues[baseKey][1])
            } else {
                let parts = []
                let stuffToParse
                let startPosition
                let endPosition
                let argument
                let lengthOfThing
                let lengthOfArg
                let value = `${individualValues[baseKey][0]}`.substr(0, individualValues[baseKey][0].length - 5)
                if(toParse.includes(value)) {
                    startPosition = toParse.search(`{${value}`)
                    console.log(startPosition)
                    for(let i = startPosition; i < toParse.length; i++) {
                        if(toParse[i] == '}') {
                            endPosition = i
                            i = toParse.length + 1
                        }
                    }
                    let parts = individualValues[baseKey][0].split(':')
                    console.log(endPosition)
                    console.log(parts.join(', '))
                    let lengthOfThing = endPosition - startPosition
                    let stuffToParse = toParse.substr(startPosition, lengthOfThing)
                    console.log(stuffToParse)
                }
            }
        });
        Object.keys(objectValues).forEach(function (baseKey) {
            Object.keys(objectValues[baseKey]).forEach(function (subKey) {
                toParse = toParse.replace(new RegExp(objectValues[baseKey]['main'].replace('{property}', objectValues[baseKey][subKey][0]), 'g'), objectValues[baseKey][subKey][1])
            });
        });
        msg.channel.createMessage(toParse)
    },
    options: {
        description: 'Parses code - testing command',
        fullDescription: 'Parses code - testing command',
        usage: '..parse [string]',
        aliases: ['p'],
    },
    subcommands: [require('./parseHelp.js')],
};