const mysql = require('mysql');
const cnx = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'iamtheadmin'
})

module.exports = cnx;

// const query = "SELECT 'hello world';"

// cnx.query(query, function(err, res) {
//     if (err) return  console.log(err)
//     console.log(res[0]['hello world']);
// })

// cnx.connect( function(err) {
//     if (err) return  console.log(err)
//     console.log('CONNECTED');
    
// })