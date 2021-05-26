var mongoose = require("../config/mongoose.js");
const { MadlibSchema } = require("./madlib.js");

const UserSchema = new mongoose.Schema(
	{
		first_name: {
			type: String,
			required: [true, "First name is required"],
			minlength: [3, "First name must be at least 3 characters"],
		},
		last_name: {
			type: String,
			required: [true, "Last name is required"],
			minlength: [3, "Last name must be at least 3 characters"],
		},
		user_name: {
			type: String,
			required: [true, "User name is required"],
			minlength: [3, "User name must be at least 3 characters"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			minlength: [3, "Email must be at least 3 characters"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [8, "Password must be at least 8 characters"],
		},
		madlibs: [MadlibSchema],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = {
	User: User,
	UserSchema: UserSchema,
};
