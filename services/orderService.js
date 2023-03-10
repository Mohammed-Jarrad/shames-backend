const Order = require("../models/orderModel")

module.exports.createOrder = async order => {
	return await Order.create(order)
}

module.exports.getOrders = async () => {
	return await Order.find()
		.populate("user")
		.populate({
			path: "order_info",
			populate: {
				path: "product",
			},
		})
}

module.exports.getOrdersForUser = async user => {
	return await Order.find({ user })
		.populate("user")
		.populate({
			path: "order_info",
			populate: {
				path: "product",
			},
		})
}

module.exports.findById = async id => {
	return await Order.findById(id)
		.populate("user")
		.populate({
			path: "order_info",
			populate: {
				path: "product",
			},
		})
}

module.exports.getOrdersForUserByStatus = async (user, status) => {
	return await Order.find({ user, status })
		.populate("user")
		.populate({
			path: "order_info",
			populate: {
				path: "product",
			},
		})
}

module.exports.getAllOrdersByStatus = async status => {
	return await Order.find({ status })
		.populate("user")
		.populate({
			path: "order_info",
			populate: {
				path: "product",
			},
		})
}

module.exports.deleteOrder = async _id => {
	return await Order.deleteOne({ _id })
}

module.exports.deleteProductFromOrder = async (product_id, color, size) => {
	return await Order.findOneAndUpdate(
		{
			"order_info.product": product_id,
			"order_info.selected_size": size,
			"order_info.selected_color": color,
		},
		{
			$pull: {
				order_info: {
					product: product_id,
					selected_size: size,
					selected_color: color,
				},
			},
		},
		{ new: true },
	)
}

module.exports.deleteProductsFromOrders = async product_id => {
	return await Order.updateMany(
		{ "order_info.product": product_id },
		{
			$pull: {
				order_info: {
					product: product_id,
				},
			},
		},
		{ new: true },
	)
}

module.exports.deleteAllOrdersWithoutProducts = async _ => {
	await Order.deleteMany({ order_info: [] })
}
