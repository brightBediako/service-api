import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, "Not authenticated!"));

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) return next(createError(403, "Token is not valid!"));

      const user = await User.findById(req.params.id);
      if (!user) return next(createError(404, "User not found!"));

      if (payload.id !== user._id.toString()) {
        return next(createError(403, "You can delete only your account!"));
      }

      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("User has been deleted.");
    });
  } catch (err) {
    next(err);
  }
};


export const getUser = async (req, res) => {
  
};
