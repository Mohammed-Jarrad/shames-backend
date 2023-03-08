const mongoose = require("mongoose")
const { Schema, model } = mongoose

const productSchema = new Schema({
	title: {
		type: String,
		required: [true, "required, please set product title"],
	},
	desc: {
		type: String,
		required: [true, "required, please set product description"],
	},
	price: {
		type: Number,
		required: [true, "required, please set product price"],
	},
	discount: {
		type: Number,
		default: 0,
	},
	category: {
		type: String,
		required: [true, "required, please set product category"],
		lowercase: true,
	},
	imageURL: {
		type: String,
		required: [true, "required, please set product image url"],
	},
	sizes: [String],
	colors: [String],
	status: {
		type: String,
		default: "Available",
	},
})

const Product = model("Product", productSchema)

module.exports = Product
