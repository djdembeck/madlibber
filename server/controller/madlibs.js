const { User } = require("../models/user.js");
const { Madlib } = require("../models/madlib.js");

module.exports = {
	createMadlib: (req, res) => {
		const madlib = new Madlib();
		madlib.title = req.body.title;
		madlib.madlib = req.body.madlib;
		madlib.likes = 0;
		madlib
			.save()
			.then((newMadlib) => {
				User.findOne({ _id: req.params.id })
					.then((userData) => {
						console.log("User Data", userData);
						userData.madlibs.push(newMadlib);
						userData
							.save()
							.then((updatedUser) => {
								console.log("Madlib created", updatedUser);
								res.json(updatedUser);
							})
							.catch((err) => res.json(err));
					})
					.catch((err) => res.json(err));
			})
			.catch((err) => res.json(err));
	},
	showMadlib: (req, res) => {
		Madlib.findOne({ _id: req.params.id })
			.then((madlibData) => res.json(madlibData))
			.catch((err) => res.json(err));
	},
	showAll: (req, res) => {
		Madlib.find()
			.then((madlib) => {
				User.find()
					.then((user) => res.json(user))
					.catch((err) => res.json(err));
			})
			.catch((err) => res.json(err));
	},
	createLikes: (req, res) => {
		// Used to add likes
		Madlib.findOne({ _id: req.params.id })
			.then((data) => {
				data.likes++;
				data
					.save()
					.then((data) => res.json(data))
					.catch((err) => res.json(err));
			})
			.catch((err) => res.json(err));
	},
	destroy: (req, res) => {
		Madlib.deleteOne({ _id: req.params.id })
			.then((deletedMadlib) => res.json(deletedMadlib))
			.catch((err) => res.json(err));
		// do the User have to be updated??
	},
	sortRecent: (req, res) => {
		Madlib.find()
			.sort({ createdAt: "desc" })
			.limit(10)
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},

	sortTop5: (req, res) => {
		Madlib.find()
			.sort({ likes: "desc" })
			.limit(5)
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
};
