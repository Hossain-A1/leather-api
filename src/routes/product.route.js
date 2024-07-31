const express = require("express");
const { createProduct } = require("../controllers/product.controller");
const { isAuthorized, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/product", isAuthorized,isAdmin, createProduct);

module.exports = router;
