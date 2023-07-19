var express = require('express');
var router = express.Router();
const r = require("./controlls.js")
/* GET home page. */
router.get("/", (req, res) => {
    res.redirect("/login")
})

router.post('/login', r.login) //iniciar sesion

router.post('/registrar', r.registrar)

router.get("/login", (req, res, next) => {
    if (req.session && req.session.username === undefined && req.session.isLoggedIn===undefined) {
        console.log("GET LOGIN >>>>>>>")
        res.render("login")
    }if( req.session.isLoggedIn){
        res.redirect("/home")
    }
})

router.get("/home", function(req, res, next) {
    console.log("sessionHome:", req.session)
    if (req.session && req.session.username !== undefined) {
        var username = req.session.username
        var email = req.session.email
        var firstName = req.session.firstName
        var lastName = req.session.lastName
        res.render("home", { username: username, email: email, firstName: firstName, lastName: lastName })
    } else {
        res.redirect("/")
    }
})

router.get("/logout", (req, res, next) => {
    console.log("logout...")
    req.session.destroy();
    res.redirect('/');
})
router.get('/registrar', function(req, res, next) {
    res.render('registrar');

});
module.exports = router;