const Product = require("../models/productModel")

module.exports.createProduct = async newProduct => {
	return await Product.create(newProduct)
}

module.exports.getProducts = async () => {
	return await Product.find()
}

module.exports.findProduct = async _id => {
	return await Product.findById(_id)
}

module.exports.getProductsByCategory = async categoryName => {
	return await Product.findOne({ category: new RegExp(categoryName, "i") })
}

module.exports.updateProduct = async (id, newProduct) => {
	return await Product.findByIdAndUpdate(id, newProduct, { new: true })
}
