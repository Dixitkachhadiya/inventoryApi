const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.use(bodyParser.json());


app.use(cors());
require('./ApiRoute.js')(app)

app.get('/',(req,res) => {
    res.json({'Message' : 'Welcome To Todo App'});
});

app.listen(2002,function(){
    console.log('Api Started');
})