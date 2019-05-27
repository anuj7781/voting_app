const express =  require('express');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./passport');
const con = require('./db_connect');

const port = 8000;

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: true}))
    

app.use(express.static('./assets'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({   
    secret: 'somesecretstring',
    saveUninitialized:true,
    resave:true
}))

app.use(passport.initialize())
app.use(passport.session())

//whenever a request comes this middleware will be called and user will be set in the locals and hence accesible in our views
app.use(passport.setAuthenticatedUser);


// use express router
app.use('/', require('./routes'));


app.listen(port,function (err) {    
    if (err) {
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});
