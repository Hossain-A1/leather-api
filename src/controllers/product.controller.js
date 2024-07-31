const productModel = require("../models/product.model");

// create a product item

const handleError = require("../errors/manage.error");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      size,
      price,
      code,
      rating,
      stock,
      colors,
      images,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !size ||
      !code ||
      !rating ||
      !stock ||
      !colors ||
      !images
    ) {
      throw new Error(
        "Please provide all the following fields: Title, Description, Category,size,code, Images, Price, rating ,stock"
      );
    }

    const product = await productModel.create({
      title,
      description,
      category,
      size,
      price,
      code,
      rating,
      stock,
      colors,
      images,
    });

    res.status(200).json(product);
  } catch (error) {
    handleError(error, res);
  }
};



module.exports ={
  createProduct
}