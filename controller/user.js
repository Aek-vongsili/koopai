const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.users;
const jwt = require("jsonwebtoken");
const { privateKey } = require("../key/key");
const logger = require("../logger");
const register = async (req, res) => {
  const { phoneNumber, password } = req.body;
  const alreadyExistsUser = await User.findOne({
    where: { phoneNumber },
  }).catch((err) => {
    logger.error(`An error occurred: ${err.message}`);
  });

  if (alreadyExistsUser) {
    return res
      .status(409)
      .json({ message: "User with number phone already exists!" });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = new User({ phoneNumber, password: hashPassword });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) res.json({ message: "Thanks for registering" });
};

const login = async (req, res) => {
  const { phoneNumber, password } = req.body;

  const userWithPhoneNumber = await User.findOne({
    where: { phoneNumber },
  }).catch((err) => {
    logger.error(`An error occurred: ${err.message}`);
  });

  if (!userWithPhoneNumber)
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });
  const comparePassword = bcrypt.compareSync(
    password,
    userWithPhoneNumber.password
  );
  if (!comparePassword)
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });

  const jwtToken = jwt.sign(
    {
      id: userWithPhoneNumber.id,
      phoneNumber: userWithPhoneNumber.phoneNumber,
    },

    privateKey,
    {
      expiresIn: "24h",
      algorithm: "RS256",
    }
  );

  res.json({ message: "Welcome Back!", token: jwtToken });
};

module.exports = { register, login };
