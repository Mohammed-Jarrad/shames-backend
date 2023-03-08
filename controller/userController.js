const express = require("express")
const userService = require("../services/userService")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
//

// * Handling Errors

const handleSignupErrors = err => {
	let errors = {}

	// handle email is exists in database
	if (err.code && err.code === 11000 && err.keyPattern.email === 1) {
		errors["email"] = "this Email is Registered"
		return errors
	}
	// handle Error in User Model
	if (err.message && err.message.includes("User validation failed")) {
		Object.values(err.errors).forEach(({ path, message }) => {
			errors[path] = message
		})
	}
	return errors
}

const handleLoginErrors = err => {
	let errors = {}
	// incorrect email
	if (err.message.includes("Incorrect Email")) {
		errors["email"] = "email is not found"
	}
	// incorrect pasword
	if (err.message.includes("Incorrect Password")) {
		errors["password"] = "incorrect password"
	}
	return errors
}

// * Helps Methods

function cerateToken(user) {
	return jwt.sign({ user }, "shopping", { expiresIn: 3 * 60 * 60 * 24 })
}

// * User Controller Operations

module.exports.signup = async (
	req = express.request,
	res = express.response,
) => {
	try {
		const user = await userService.createUser(req.body)
		const token = cerateToken(user)
		res.status(201).json({ token, user })
	} catch (err) {
		const errors = handleSignupErrors(err)
		res.status(400).json({ errors })
	}
}

module.exports.login = async (
	req = express.request,
	res = express.response,
) => {
	try {
		const { email, password } = req.body
		const user = userService.login(email, password)
		if (user) {
			const token = cerateToken(user)
			return res.status(200).json({ token, user })
		} else {
			res.status(200).json({ user })
		}
	} catch (err) {
		const errors = handleLoginErrors(err)
		res.status(400).json({ errors })
	}
}

module.exports.logout = async (req = express.request, res = express.response) => {
    
}
