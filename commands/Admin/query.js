const dbdetails = require('../../config.json')
let mysql = require('mysql')
let con
module.exports = {
    label: 'query',
    enabled: true,
    isSubcommand: false,
    generator: async (msg, args) => {
        con = mysql.createConnection(dbdetails.mysql)
        let query = args.join(" ")
        con.query(query, (err, rows) => {
            if(err) return msg.channel.createMessage(err.message) 
            else if(rows != undefined) return msg.channel.createMessage(rows.toString())
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