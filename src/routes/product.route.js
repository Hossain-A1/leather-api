const express = require("express");
const { createProduct } = require("../controllers/product.controller");

const router = express.Router();

router.post("/product", createProduct);

module.exports = router;
