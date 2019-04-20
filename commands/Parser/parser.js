let rnduser;
let founduser
let foundUser = (arg) => { founduser = arg };
const utils = require('../../utils/utils.js')
const resetRnd = (msg) => {
    rnduser = msg.channel.guild.members.map(i => i)[Math.floor(Math.random() * msg.channel.guild.members.size)]
}
const getUser = (msg, argument) => {
    foundUser(msg.channel.guild.members.find(i => i.id = argument || i.username == argument))
    if(!founduser) {
        foundUser(msg.member)
    }
    console.log(founduser.toString().substr(0, 1000))
}
module.exports = {
    label: 'parse',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let serverOwner = msg.channel.guild.members.find(i => i.id == msg.channel.guild.ownerID)
        resetRnd(msg)
        foundUser(msg)
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
            },
            founduser: {
                main: '{founduser.{property}}',
                name: ['name', foundUser.username],
                discriminator: ['discrim', foundUser.discriminator],
                created: ['created', new Date(foundUser.createdAt).toUTCString()]
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
                    for(let i = startPosition; i < toParse.length; i++) {
                        if(toParse[i] == '}') {
                            endPosition = i
                            i = toParse.length + 1
                        }
                    }
                    parts = individualValues[baseKey][0].split(':')
                    lengthOfThing = endPosition - startPosition
                    stuffToParse = toParse.substr(startPosition, lengthOfThing + 1)
                    argument = stuffToParse.split(':')[1]
                    argument = argument.substr(0, argument.length - 1)
                    switch(individualValues[baseKey][0]) {
                        case 'getuser:{arg}':
                            getUser(msg, argument)
                        break;
                    }
                    toParse = toParse.replace(`{${value}${argument}}`, '')
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