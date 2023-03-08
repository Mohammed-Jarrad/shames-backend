const mongoose = require("mongoose")
const { Schema, model } = mongoose

const reviewSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	comment: {
		type: String,
		required: [true, "please set comment !"],
	},
	rating: {
		type: String,
		required: [true, "please set rating !"],
	},
	date: {
		type: Date,
		default: Date.now(),
	},
})

const Review = model("Review", reviewSchema)

module.exports = Review
