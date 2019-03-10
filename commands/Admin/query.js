const dbdetails = require('../../config.json')
const mysql = require('mysql')
let con
module.exports = {
    label: 'query',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        if(args[0] == 'test') con = mysql.createConnection(dbdetails.mysqltest)
        else if(args[0] == 'xpdb') con = mysql.createConnection(dbdetails.mysqlxp)
        else return msg.channel.createMessage('not valid')
        let query = args.shift()
        con.query(query, (err, rows) => {
            if(err) return msg.channel.createMessage(err.message) 
            else if(rows != undefined) return msg.channel.createMessage(require('util').inspect(rows))
            else return
        })
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