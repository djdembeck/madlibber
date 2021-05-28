const User = require("../controller/users.js");
const Madlib = require("../controller/madlibs.js");

module.exports = function (app) {
	app.get("/", (req, res) => {});

	app.post("/user/register", (req, res) => {
		User.createUser(req, res);
	});

	app.post("/user/login", (req, res) => {
		User.userLogin(req, res);
	});

	app.get("/user/show/:id", (req, res) => {
		User.showUser(req, res);
	});

	app.get("/users", (req, res) => {
		User.showAllUsers(req, res);
	});

	app.put("/user/update/:id", (req, res) => {
		User.updateUser(req, res);
	});

	app.delete("/user/delete/:id", (req, res) => {
		User.deleteUser(req, res);
	});

	app.post("/madlibs/:id/add", (req, res) => {
		Madlib.createMadlib(req, res);
	});

	app.get("/madlibs", (req, res) => {
		Madlib.showAll(req, res);
	});

	app.post("/madlibs/:id/likes", (req, res) => {
		Madlib.createLikes(req, res);
	});

	app.delete("/madlibs/:id/remove", (req, res) => {
		Madlib.destroy(req, res);
	});

	app.get("/madlibs/top5", (req, res) => {
		Madlib.sortTop5(req, res);
	});

	app.get("/madlibs/recent", (req, res) => {
		Madlib.sortRecent(req, res);
	});

	app.get("/madlibs/:id", (req, res) => {
		Madlib.showMadlib(req, res);
	});
};
