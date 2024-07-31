const { Schema, model,  mongoose } = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  size: [{
    type: Number,
    require: true,
  }],
  code: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  colors: [
    {
      type: String,
      require: true,
    },
  ],
  images: [
    {
      type: String,
      require: true,
    },
  ],

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const productModel = model("Product", productSchema);

module.exports = productModel
