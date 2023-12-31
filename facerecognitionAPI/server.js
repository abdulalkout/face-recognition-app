const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
    //   port : 3306,
      user : 'postgres',
      password : 'Alkout1964',
      database : 'smart-brain'
    }
});

// Middileware
const app = express();
app.use(express.json());
app.use((cors()));

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegirter(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {Image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {Image.handleAPICall(req, res)})

app.listen(3000, ()=>{
    console.log('app running ');
})