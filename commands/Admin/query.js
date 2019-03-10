const dbdetails = require('../../config.json')
const mysql = require('mysql')
const utils = require('../../utils/utils.js')
let con
module.exports = {
    label: 'query',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        let db = args[0]
        args.shift()
        let query = args
        msg.channel.createMessage(utils.db(db, query))
    },
    options: {
        description: 'Query the database',
        fullDescription: 'Query the database',
        usage: '..query [query]',
        aliases: ['q'],
        requirements: {
            userIDs: ['233667448887312385']
        }
    }
};