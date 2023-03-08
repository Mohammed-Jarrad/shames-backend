const mongoose = require("mongoose")
const { Schema, model } = mongoose

const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		location: {
			city: { type: String, required: [true, "Required"] },
			country: { type: String, required: [true, "Required"] },
			address: { type: String, required: [true, "Required"] },
		},
		status: {
			type: String,
			default: "Pending",
		},
		order_info: {
			type: [
				{
					product: {
						type: Schema.Types.ObjectId,
						ref: "Product",
						required: true,
					},
					quantity: {
						type: Number,
						required: true,
					},
					selected_size: String,
					selected_color: String,
				},
			],
			required: true,
		},
	},
	{
		timestamps: true,
	},
)

const Order = model("Order", orderSchema)

module.exports = Order
