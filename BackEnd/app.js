const { urlencoded } = require("express");
const express = require("express");
const dotenv = require('dotenv')
const session = require('express-session')
const morgan = require('morgan');
const cors = require('cors')


const app = express();


app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(morgan('dev'));
app.use(cors())
app.set('view engine', 'ejs');


app.use(session({
    secret: 'secret',
    resave: 'true',
    saveUninitialized: 'true'
}))


app.use(require('./routes/users'));
app.use('/resources', express.static('public'))
app.use('/resources', express.static(__dirname + '/public'))

app.listen(3000, (req,res) => {
        console.log("server running");
});



