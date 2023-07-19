const Model_User = require("../models/user");

async function login(req, res, next) {
    const username = req.body.username
    const pass = req.body.password
    const u = await Model_User.find({
        username: username,
        password: pass
    });
    console.log("Loging:::",username, pass, u[0])
    if (u.length) {
        req.session.username = u[0].username;
        req.session.email=u[0].email
        req.session.firstName=u[0].firstName
        req.session.lastName=u[0].lastName
        req.session.isLoggedIn = true;
        try {
            await req.session.save();
        } catch (err) {
            console.error('Error saving to session storage: ', err);
            return next(new Error('Error creating user'));
        }
        res.redirect("/home")
    } else {
        res.send("NO registrado")
    }
}
 
async function registrar(req, res, next) {
    var myData = new Model_User(req.body);
    myData.save()
        .then(item => {
            res.redirect("/login")
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });

}

module.exports = { login, registrar }