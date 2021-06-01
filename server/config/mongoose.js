const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/madlibber", { useNewUrlParser: true });

module.exports = mongoose;
