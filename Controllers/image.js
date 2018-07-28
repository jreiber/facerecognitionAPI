const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'acb0d3cb370749c48d8b681dc7f3b31a'
});

const handleAPICall = (req, res) => {
	app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
    .then(data => {
    	res.json(data);
    });
};

const handleImage = (req,res,db) => {
	const { id } = req.body;

	db('users')
	.where({id})
	.increment('entries', 1)
	.returning('entries')
	.then(response => {
		res.json(response);
	})
	.catch(err => res.status(400).json(err));
};

module.exports = {
	handleImage : handleImage,
	handleAPICall : handleAPICall
};