const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('./db').Users


passport.use(new LocalStrategy(function (email, password, done) {
    Users.findOne({
        where: {
            username: email
        }
    }).then((user) => {
        if (!user) {
            return done(null, false, {message: "No such user"})
        }
        if (user.password !== password) {
            return done(null, false, {message: "Wrong password"})
        }
        if(user.voted == true){
            console.log("user has already voted");
            return done(null, false, {message: "Wrong password"})
        }
        console.log('user logged in is',user.username);
        return done(null, user)
    }).catch((err) => {
        return done(err)
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user.username)
})

passport.deserializeUser(function (username, done) {
    Users.findOne({where:{
        username: username
    }}).then((user) => {
        if (!user) {
            return done(new Error("No such user"))
        }
        return done(null, user)
    }).catch((err) => {
        done(err)
    })
})




passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user =  req.user;
    }
    return next();
}
  
exports = module.exports = passport