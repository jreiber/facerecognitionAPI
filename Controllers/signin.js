const handleSignin = (req,res, db, bcrypt) => {
	const { email, password } = req.body;

	db.select('email', 'hash')
	.from('login')
	.where({email})
	.then(data => {
		if(data.length > 0 && bcrypt.compareSync(password, data[0].hash)){
			db('users')
			.where({email})
			.then(data => {
				res.json(data[0]);
			});
			
		} else {
			res.status(400).json('cannot log in');
		}
	});
};

module.exports = {
	handleSignin : handleSignin
};