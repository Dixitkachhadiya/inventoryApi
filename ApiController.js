const mysql = require('mysql2');
const cors = require('cors');
const { json } = require('stream/consumers');
const jwt = require('jsonwebtoken');

const connection = mysql.createConnection({
    host: 'bnmxydikyq8j8roamwwq-mysql.services.clever-cloud.com',
    user: 'uodk8fae5fqqr7ze',
    password: 'LBfoq1u3vE3dPbcrKGir',
    port: 3306,
    database: 'bnmxydikyq8j8roamwwq'

    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // port: process.env.DB_PORT,
    // database: process.env.DB_NAME
})

connection.connect(function () {
    console.log('Database Connected');
})

exports.findOne = (req, res) => {
    return res.status(400).send({
        message: "Todo name can not be empty"
    });
}

exports.insertBusinessCategory = (req, res) => {
    // console.log(req.body.business_name)
    sqlQuery = 'insert into tbl_add_business(business_name) values (?);';

    connection.query(sqlQuery, [req.body.business_name],
        function (error, results, filds) {
            if (error) {
                console.log(error);
            } else {
                res.end(JSON.stringify(results));
            }
        }
    )
}


exports.getAllbuisnessRecord = (req, res) => {

    sqlQuery = 'select * from tbl_add_business;';

    connection.query(sqlQuery, function (error, results, filds) {
        if (error) {
            console.log(error);
        } else {
            res.json(results);
        }
    })
}