const mongoose = require("mongoose")
const isEmail = validator.default.isEmail
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please Enter your First Name"],
	},
	last_name: {
		type: String,
		required: [true, "Please Enter your Last Name"],
	},
	email: {
		type: String,
		required: [true, "Please Set Your Email"],
		lowercase: true,
		unique: true,
		validate: [isEmail, "please set a validate email"],
	},
	password: {
		type: String,
		required: [true, "Please Set Your Password"],
		minlength: [6, "minimum Length password is 6 charachters"],
	},
	country: {
		type: String,
		required: [true, "Please Set Your Country"],
	},
	city: {
		type: String,
		required: [true, "Please Set Your City"],
	},
	phone: {
		type: String,
		required: [true, "Please Set Your Phone Number"],
	},
})

// hashing the user password before storing it in the database
userSchema.pre("save", async function (next) {
	let salt = await bcrypt.genSalt()
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

// compare if user present in the database or not, and compare if the password is correct
userSchema.statics.login = async (email, password) => {
	const user = await this.findOne({ email })
	if (user) {
		const auth = await bcrypt.compare(password, user.password)
		if (auth) return user
		else throw Error("Incorrect password")
	} else {
		throw Error("Incorrect email")
	}
}

// compare with enteredPassword and original password
userSchema.statics.comparePassword = async (enteredPassword, _id) => {
	const user = await this.findOne({ _id })
	const auth = await bcrypt.compare(enteredPassword, user.password)
	if (auth) return user
	else throw Error("Incorrect password")
}

const User = mongoose.model("User", userSchema)

module.exports = User
