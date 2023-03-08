const Review = require("../models/reviewModel")

module.exports.createReview = async newReview => {
	return await Review.create(newReview)
}

module.exports.deleteReview = async _id => {
	return await Review.deleteOne({ _id })
}

module.exports.getReviews = async () => {
	return await Review.find().populate("user").populate("product")
}
module.exports.getReviewsForProduct = async product_id => {
	return await Review.find({ product: product_id })
		.populate("user")
		.populate("product")
}

module.exports.getReviewsForUser = async user_id => {
	return await Review.find({ user: user_id })
		.populate("user")
		.populate("product")
}

module.exports.updateReview = async (_id, newReview) => {
	return await Review.findOneAndUpdate({ _id }, newReview, { new: true })
}

module.exports.deleteReviewsWhenDeleteProduct = async product_id => {
	return await Review.deleteMany({ product: product_id })
}

module.exports.deleteReviewsWhenDeleteUser = async user_id => {
	return await Review.deleteMany({ user: user_id })
}
