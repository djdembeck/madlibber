const express = require("express");
const session = require("express-session");
const app = express();

app.use(express.static(__dirname + "/public/dist/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(session({ secret: "this is a secret, you will never guess it." }));

require("./server/config/routes")(app);

app.all("*", (req, res, next) => {
	res.sendFile(__dirname + "/public/dist/public/index.html");
});

app.listen(8000, () => {
	console.log("listening on port 8000");
});
