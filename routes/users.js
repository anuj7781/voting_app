const express = require('express');
const route = express.Router();
const passport = require('passport');
const Users = require('../db').Users;
const Candidates = require('../db').Candidates;
const con = require('../db_connect');
const mysql = require('mysql');



route.get('/voting/', (req, res) => {
    console.log("i am voting");
    if(req.isAuthenticated()){
        //console.log("user voting is",req.query.id);
        return res.render('voting');
    }else{
        return res.render('signin');
    }
    
})

route.get('/signin', (req, res) => {
    return res.render('signin')
})

route.get('/signup', (req, res) => {
    return res.render('signup')
})


function update(numVotes,name){
    var sql = `UPDATE candidates SET count = ? WHERE name = ?`;
    var data = [numVotes,name];
    con.query(sql, data, (error, results, fields) => {
        if (error){
          return console.error(error.message);
        }
        console.log('Rows affected:', results.affectedRows);
    });
}


route.post('/done/', (req, res) => {
    //console.log('user done',req.user.username);
    var name = req.body.pm;
    var query = "SELECT * FROM candidates where name=" + mysql.escape(name);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        //console.log('before updation',result[0].count);
        var numVotes = result[0].count;
        //console.log(typeof(numVotes));
        numVotes = numVotes + 1;
        //console.log('after updation',numVotes); 
        update(numVotes,name); 
    });
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    var uname = req.user.username;
    console.log("user voted is",uname);
    var data = [dateTime,uname];
    var q = "UPDATE users set voted = true , date = ? where username = ?";
    con.query(q,data,function(err,result,fields){
        if(err) throw err;
            
    })
    req.logOut();
    return res.render('done');
});



route.post('/voting-session', passport.authenticate('local', {
    failureRedirect: '/'}),
    function(req,res){
        console.log('redirected to voting');
        res.redirect('/users/voting?id=' + req.user.username)
})

route.post('/signup', (req, res) => {
    Users.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then((createdUser) => {
        res.redirect('/users/signin')
    })
})


module.exports = route;