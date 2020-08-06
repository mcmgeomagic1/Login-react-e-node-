const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


const app =  express();
app.use(bodyParser.json());
app.use(cors());

const database = {
	users : [
		{
			id: '123',
			name: 'jhon',
			email: 'jonh@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},

		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: '987',
			has: '',
			email: 'john@gmail.com'

		}
	]
}

app.get('/', (req, res)=>{
   res.json(database.users);
})

app.post('/signin',(req, res)=>{
	/*// Load hash from your password DB.
	bcrypt.compare("orange", '$2a$10$Gi5sJm4rzCnWdZ89CPdKGuh5RsqA1Ru6CmE//8Z2xKjsLVPI1rZF6', function(result) {
	    // result == true
	    console.log('first guess', res)
	});

	bcrypt.compare("vegies", '$2a$10$Gi5sJm4rzCnWdZ89CPdKGuh5RsqA1Ru6CmE//8Z2xKjsLVPI1rZF6',function(result) {
    	// result == false
    	console.log('second guess', rescut)
	});*/
	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.send('sucess');
	}else{
		res.status(404).json('error loging in');
	}

})

app.post('/register', (req, res)=>{
	const {email, name, password} = req.body;

	/*bcrypt.hash(password, null, null, function(err, hash) {
	    // Store hash in your password DB.
	    console.log(hash);
	});*/
	database.users.push({

			id: '125',
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
		
	});
	res.json(database.users[database.users.length-1]);

});


app.get('/profile/:id',(req, res)=>{
	const {id} = req.params;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			res.json(user);
		}
	})
    if(!found) {
    	res.send('no such user')
    }

});

app.post('/images/:id', (req, res)=>{
	const {id} = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			user.entries ++;
			return res.json(user.entries);
		}
	})
    if(!found) {
    	res.status(404).json('no such user')
    }



})




/*
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
    // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash).then(function(result) {
    // result == false
});
*/
app.listen(3001, ()=>{
	console.log('nodemon is runing in port 3001')
});

/*
/ --> res = this is working
/signing  --> POST = sucess/fail
/register ==> POST = user
/profile/:userud --> Get = user
/image --> PUT --> user


*/