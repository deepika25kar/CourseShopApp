const express = require('express');
const fs = require('fs');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.connect('mongodb+srv://deepikaaa:chocopie@cluster0.ubp85.mongodb.net/CourseShopApp', {useNewUrlParser: true, useUnifiedTopology: true });


//FOR SIGNUP
var signupSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phonenumber: String,
    password: String
});

var Signup = mongoose.model('Signup', signupSchema);



//FOR LOGIN
var loginSchema = new mongoose.Schema({    
    email: String,
    password: String
});

var Login = mongoose.model('Login', loginSchema);



//EXPRESS SPECIFIC CONFIGURATIONS
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded())

//PUG SPECIFIC CONFIGURATIONS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
// app.set('public',path.join())

//ENDPOINTS
app.get('/', (req, res) => {
    const params = { }
    res.status(200).render('home', params);
})

app.get('/history', (req, res) => {
    const params = { }
    res.status(200).render('history', params);
})

app.get('/profile', (req, res) => {
    const params = { }
    res.status(200).render('profile', params);
})

app.get('/login', (req, res) => {
    const params = { }
    res.status(200).render('login', params);
})

app.get('/logout', (req, res) => {
    const params = { }
    res.status(200).render('logout', params);
})

app.get('/pwdgone', (req, res) => {
    const params = { }
    res.status(200).render('pwdgone', params);
})

app.get('/signup', (req, res) => {
    const params = { }
    res.status(200).render('signup', params);
})



app.post('/signup', (req,res)=>{
    var signupData = new Signup(req.body);
    signupData.save().then(()=>{
        res.send("Signup data saved to the database.")
    }).catch(()=>{
        res.status(400).send("Unable to save signup data to database.")
    })    
});

app.post('/login', (req,res)=>{
    var loginData = new Login(req.body);
    loginData.save().then(()=>{
        res.send("Login data saved to the database.")
    }).catch(()=>{
        res.status(400).send("Unable to save login data to database.")
    })    
});


//START THE SERVER
const port = 80 || process.env.URL;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
