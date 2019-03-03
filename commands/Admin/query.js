const dbdetails = require('../../config.json')
const mysql = require('mysql')
const con = mysql.createConnection(dbdetails.mysql)
module.exports = {
    label: 'query',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        con.query(args.join(" "), (err, rows) => {
            if(err) return msg.channel.createMessage(err.message) 
            else if(rows) return msg.channel.createMessage(rows[0])
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