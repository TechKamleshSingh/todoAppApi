import User from "../models/User.js";

export const getUserInfo = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.user.id).select("name email");
    return res.status(200).json(userInfo);
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name: req.body.name, email: req.body.email },
      { new: true }
    ).select("name email");
    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error); 
  }
};
