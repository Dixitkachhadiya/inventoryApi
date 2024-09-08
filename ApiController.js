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


exports.insertCashInAndOutRecord = (req, res) => {
    // console.log( req.body.business_category_id);
    sqlQuery = 'insert into tbl_transaction(business_category_id, transaction_date, category_type, transaction_remark, transaction_amount,add_business_id)value (?,?,?,?,?,?);';

    connection.query(sqlQuery, [
        req.body.business_category_id,
        req.body.transaction_date,
        req.body.category_type,
        req.body.transaction_remark,
        req.body.transaction_amount,
        req.body.add_business_id
    ], function (error, results, filds) {
        if (error) {
            console.log(error)
        } else {
            res.end(JSON.stringify(results));
        }
    })
}

exports.getRecordFromEditCashinout = (req, res) => {
    console.log(req.params.id);
    sqlQuery = "select business_category_id, date_format(transaction_date, '%Y-%m-%d') as transaction_date, category_type, transaction_remark, transaction_amount,add_business_id from tbl_transaction where transaction_id = ?;";

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

exports.updatecashinandoutRecord = (req, res) => {
    console.log(req.params.id);
    sqlQuery = "update tbl_transaction set business_category_id = ?,transaction_date = ?, category_type = ?, transaction_remark = ?, transaction_amount = ?, add_business_id = ? where transaction_id = ?;";

    const useParams = [
        req.body.business_category_id,
        req.body.transaction_date,
        req.body.category_type,
        req.body.transaction_remark,
        req.body.transaction_amount,
        req.body.add_business_id
    ]

    connection.query(sqlQuery, [...useParams, req.params.id],
        function (error, results, filds) {
            if (error) {
                console.log(error);
            } else {
                res.end(JSON.stringify(results));
            }
        }
    )
}


exports.getRecordByBusinessId = (req, res) => {

    sqlQuery = "SELECT add_business_id,YEAR(transaction_date) AS year,SUM(CASE WHEN category_type = 'Cash In' THEN transaction_amount ELSE 0 END) AS `in`,SUM(CASE WHEN category_type = 'Cash Out' THEN transaction_amount ELSE 0 END) AS `out` FROM tbl_transaction WHERE add_business_id = ? GROUP BY add_business_id, YEAR(transaction_date) ORDER BY year, add_business_id;";

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


exports.insertuserdetails = (req, res) => {
    console.log(req.body.name)
    var sqlQuery = 'INSERT INTO `tbl_signup` (`name`, `email`, `password`, `confirem_password`) VALUES ( ?, ?, ?, ?);';

    connection.query(sqlQuery,
        [
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.confirem_password
        ], function (error, results, filds) {
            if (error) {
                console.log(error)
            } else {
                res.end(JSON.stringify(results))
            }
        })
}


exports.postemail = async (req, res) => {

    var sqlquery = 'select * from tbl_signup WHERE email = ?;'

    connection.query(sqlquery, [req.body.email], async function (error, results, fields) {
        if (error) {
            console.log(error);
        } else if (results.length === 0) {
            res.send({
                "message": "Invalid email",
                data: []
            });
        } else {
            const user = results[0];
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

            if (isPasswordMatch) {
                console.log('Login successfully');
                res.send({
                    "message": "Login successfully",
                    data: [user]
                });
            } else {
                res.send({
                    "message": "Password is invalid",
                    data: []
                });
            }

        }
    });
}