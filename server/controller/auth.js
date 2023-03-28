import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return next(
      createError({ status: 400, message: "Please fill required fields" })
    );
  }

  try {
    const hashedPassword = await bcryptjs.hashSync(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({message : "user created"})
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(
      createError({ status: 400, message: "Please fill required fields" })
    );
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError({ status: 404, message: "User not found" }));
    }
    const isPwdCorrect = await bcryptjs.compareSync(
      req.body.password,
      user.password
    );
    if (!isPwdCorrect) {
      return next(createError({ status: 400, message: "Password incorrect" }));
    }
    const paylod = {
      id: user._id,
      name: user.name,
    };
    const token = jwt.sign(paylod, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ message: "login success" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("access_token");
  return res.status(200).json({ message: "Logout success" });
};

export const isLoggedIn = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json(false);
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.json(false);
    }
    return res.json(true);
  });
};
