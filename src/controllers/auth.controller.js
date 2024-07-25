const handleError = require("../errors/manage.error");
const { createToken } = require("../manager/jwt-token.manager");
const userModel = require("../models/user.model");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, address, phoneNo } = req.body;

    const user = await userModel.register(
      name,
      email,
      password,
      address,
      phoneNo
    );

    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    await handleError(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    await handleError(error, res);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
