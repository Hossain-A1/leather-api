const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const hpp = require("hpp");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const registerRouter = require("./routes/auth.route");
const productRouter = require("./routes/product.route")

const loginRouter = require("./routes/auth.route");

const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;
// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(hpp());
app.use(helmet());

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});
// bypass all routes

app.use("/api/auth", registerRouter);
app.use("/api/auth", loginRouter);
app.use("/api", productRouter);

mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening and MongoDB connected on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`DB error is => ${error}`);
  });
