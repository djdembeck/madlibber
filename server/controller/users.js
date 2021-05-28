const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const LocalStorage = require("localStorage");

module.exports = {
	createUser: function (req, res) {
		if (req.body.password == req.body.confirm_password) {
			bcrypt
				.hash(req.body.password, 10)
				.then((hashed_password) => {
					req.body.password = hashed_password;
					var user = new User(req.body);
					user
						.save()
						.then((user) => {
							res.json(user);
						})
						.catch((err) => {
							res.json(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log("Password does not match confirm password");
			res.json(false);
		}
	},

	userLogin: function (req, res) {
		// console.log(req.body);
		User.findOne({ user_name: req.body.user_name })
			.then((user) => {
				bcrypt
					.compare(req.body.password, user.password)
					.then((result) => {
						if (result) {
							console.log("User is logged in.");
							LocalStorage.setItem("user", user);
							console.log(LocalStorage.getItem("user"));
							res.json(user);
						} else {
							res.json("Password is incorrect");
						}
					})
					.catch((err) => {
						res.json("Password is incorrect");
					});
			})
			.catch((err) => {
				console.log("User name not in DB");
				res.json("Username does not exist");
			});
	},

	showUser: function (req, res) {
		User.findOne({ _id: req.params.id })
			.then((user) => res.json(user))
			.catch((err) => res.json(err));
	},

	showAllUsers: function (req, res) {
		User.find()
			.then((user) => res.json(user))
			.catch((err) => res.json(err));
	},

	updateUser: function (req, res) {
		User.findOneAndUpdate({ _id: req.params.id }, req.body, {
			runValidators: true,
		})
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},

	deleteUser: function (req, res) {
		User.findOneAndDelete({ _id: req.params.id })
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	showTopUsers: function (req, res) {
		User.find()
			.then((users) => res.json(users))
			.catch((err) => res.json(err));
	},
};
