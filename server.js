const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/Register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'Jr168641!',
    database : 'facerecognitionDB'
  }
});

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
	db.select('*').from('users')
	.then(data => {
		res.json(data);
	});
});

app.post('/signin', (req,res) => { signin.handleSignin(req,res,db,bcrypt)});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => { profile.handleProfile(req,res,db, bcrypt)});
app.put('/image', (req,res) => { image.handleImage(req,res,db)});
app.post('/imageurl', (req,res) => { image.handleAPICall(req,res)});

app.listen(process.env.port || 3000, () => {
	console.log(`app is running on port ${process.env.port}`);
});


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/