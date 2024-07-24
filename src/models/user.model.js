const { mongoose, Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    role: {
      enum: ["user", "admin"],
      default: "user",
      type: String,
      required: true,
    },
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.register = async function (
  name,
  email,
  password,
  address,
  phoneNo
) {
  if (!name || !email || !password || !address || !phoneNo) {
    throw new Error("Must fill name,email,password,address and phoneNo");
  }

  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw new Error("Email already used.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be contains 8+ chars, with uppercase,lowercase and symbol"
    );
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    address,
    phoneNo,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Must fill email and password ");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email or password ");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect email or password ");
  }

  return user;
};

const userModel = model("User", userSchema);

module.exports = userModel
