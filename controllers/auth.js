import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const register = async (req, res) => {
  try {
   
    const { username, email, password } = req.body;

    if (!password) return;
 
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const user = await newUser.save();
    if (user) {
      res
        .status(201)
        .json({ status: true, msg: "Registered Successfully !", user });
    } else {
      res
        .status(500)
        .json({ status: true, msg: "Registeration failed! Try again !", user });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: false, msg: "Try again !", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user)
      return res
        .status(400)
        .json({ status: false, msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ status: false, msg: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    delete user.password;
    res
      .status(200)
      .json({ status: true, msg: "Logged In Successfully", token, user });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, msg: "Try Again !", error: err.message });
  }
};
