var mongoose = require("../config/mongoose.js");

const MadlibSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Madlib title is required"],
		},
		madlib: {
			type: String,
			required: [true, "Madlib is required"],
		},
		likes: {
			type: Number,
		},
	},
	{ timestamps: true }
);

const Madlib = mongoose.model("Madlib", MadlibSchema);

module.exports = {
	Madlib: Madlib,
	MadlibSchema: MadlibSchema,
};
