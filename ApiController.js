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


exports.deleteRecordByid = (req, res) => {
    console.log(req.params.id)
    sqlQuery = 'DELETE FROM tbl_add_business WHERE `tbl_add_business`.`business_id` = ?';
    connection.query(sqlQuery, [req.params.id],
        function (error, results, filds) {
            if (error) {
                console.log(error);
            } else {
                res.json(results);
            }
        }
    )
}

exports.getAllbusinessRecordByid = (req, res) => {
    // console.log(req.params.id);
    sqlQuery = 'select * from tbl_add_business where business_id = ?;';

    connection.query(sqlQuery, [req.params.id],
        function (error, results, filds) {
            if (error) {
                console.log(error);
            } else {
                res.json(results);
            }
        }
    )
}


exports.insertRecord = (req, res) => {
    // console.log(req.body.add_business_id);
    sqlQuery = 'insert into tbl_business_category(add_business_id,business_category_name,buiness_category_type) values (?,?,?);';

    connection.query(sqlQuery, [
        req.body.add_business_id,
        req.body.business_category_name,
        req.body.buiness_category_type
    ], function (error, results, filds) {
        if (error) {
            console.log(error);
        } else {
            res.end(JSON.stringify(results));
        }
    })
}

exports.getInsertedRecord = (req, res) => {
    // console.log(req.params.id);
    sqlQuery = "select transaction_id, business_category_id, date_format(transaction_date , '%y-%m-%d') as transaction_date ,category_type, transaction_remark, transaction_amount from tbl_transaction where add_business_id = ?;";

    connection.query(sqlQuery, [req.params.id], function (error, results, filds) {
        if (error) {
            console.log(error);
        } else {
            res.json(results)
        }
    })
}

exports.deleteBusinessCategoryRecord = (req, res) => {
    // console.log(req.params.id);
    sqlQuery = "delete from tbl_transaction where transaction_id = ?;";
    connection.query(sqlQuery, [req.params.id],
        function (error, results, filds) {
            if (error) {
                console.log(error);
            } else {
                res.json(results);
            }
        }
    )
}

exports.getCashInCategory = (req, res) => {
    // console.log(req.params.id);
    sqlQuery = 'select * from tbl_business_category where buiness_category_type = "Cash In" and add_business_id = ?;';

    connection.query(sqlQuery, [req.params.id, req.body.buiness_category_type],
        function (error, results, filds) {
            if (error) {
                console.log(error);
            } else {
                res.json(results);
            }
        }
    )
}


exports.getCashOutCategory = (req, res) => {
    // console.log(req.params.id);

    sqlQuery = 'select * from tbl_business_category where buiness_category_type = "Cash Out" and add_business_id = ?;';

    connection.query(sqlQuery, [req.params.id, req.body.buiness_category_type],
        function (error, results, filds) {
            if (error) {
                console.log(error);
            } else {
                res.json(results);
            }
        }
    )
}