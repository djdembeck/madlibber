const { User } = require("../models/user.js");

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
							res.json("Success, Account successfully created", user);
						})
						.catch((err) => {
							for (let key in err.errors) {
								res.json(err, err.errors[key].message);
							}
						});
				})
				.catch((err) => {
					console.log("hash error");
				});
		} else {
			res.json("Password does not match confirm password");
		}
	},

	userLogin: function (req, res) {
		User.findOne({ user_name: req.body.user_name })
			.then((user) => {
				bcrypt
					.compare(req.body.password, user.password)
					.then((result) => {
						if (result) {
							req.session["user_id"] = user._id;
							console.log("User is logged in.");
						} else {
							res.json("Password is incorrect");
						}
					})
					.catch((err) => {
						res.json(err, "Password is incorrect");
					});
			})
			.catch((err) => {
				res.json(err, "Login Failed");
			});
	},

	showUser: function (req, res) {
		User.findOne({ _id: req.session.id })
			.then((user) => {
				res.json(user);
			})
			.catch((err) => {
				res.json(err);
			});
	},

	updateUser: function (req, res) {
		User.findOneAndUpdate({ _id: req.session.id }, req.body, { runValidators: true })
			.then((data) => res.json(data))
			.catch((err) => {
				for (let key in err.errors) {
					res.json(err, err.errors[key].message);
				}
			});
	},

	deleteUser: function (req, res) {
		User.findOneAndDelete({ _id: req.session.id })
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.json(err);
			});
	},
};
