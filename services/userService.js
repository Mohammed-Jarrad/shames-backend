const User = require("../models/userModel")

module.exports.createUser = async userData => {
	await User.create(userData) // user
}

module.exports.getUsers = async () => {
	await User.find() // [{user}]
}

module.exports.findUser = async _id => {
	await User.findById(_id) // user
}

module.exports.updateUser = async (id, newInformation) => {
	await User.findByIdAndUpdate(id, newInformation, { new: true }) // user
}

module.exports.login = async (email, password) => {
	return User.login(email, password) // user || Error(incorrect pass or email)
}

module.exports.comparePassword = async (enterPassword, id) => {
	return await User.comparePassword(enterPassword, id)
}

module.exports.changePasswordForUser = async (newPassword, userId) => {
	return await User.findByIdAndUpdate(
		{ _id: userId },
		{ password: newPassword },
		{ new: true },
	)
}

// ! remove user
