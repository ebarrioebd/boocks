var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var session=require("express-session") 
app.use(session({
  secret: "987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b",
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 1000*60*60*24 },
}));

const mongoose = require('mongoose');
//const bd = 'mongodb://127.0.0.1/users'
const bd = "mongodb+srv://ebarriosebd:awYo0bsX5UoTguf7@leaflet.kcui8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose
    .connect(bd, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => {
        console.log(`Conectado a Mongo, Nombre de la bd: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error al conectar a Mongodb', err)
    });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

 
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () => {
    console.log("App running port:", 3000)
})
module.exports = app;