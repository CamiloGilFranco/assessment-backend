const bcrypt = require("bcrypt");
const jws = require("jsonwebtoken");
const { createUser } = require("./../../api/users/users.services");
const { signToken } = require("../auth.services");
const { login } = require("../auth.services");

signUpController = async (req, res) => {
  try {
    const { email } = req.body;

    const encPassword = await bcrypt.hash(req.body.password, 10);

    const user = await createUser({ ...req.body, password: encPassword });

    const token = signToken({ id: user.id });

    res.status(201).json({
      message: "User created",
      data: { email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await login(email);

    if (!user) {
      throw new Error("Email o contraseña invalida");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Email o contraseña incorrecta");
    }

    const token = signToken({ id: user.id });

    res.status(201).json({
      message: "User found",
      data: { email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.signUpController = signUpController;
module.exports.loginController = loginController;
