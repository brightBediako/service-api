import User from "../models/user.model.js";
import { createError } from "../middlewares/globalErrHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendRegisterNotificationEmail } from "../services/emailService.js";

export const register = async (req, res, next) => {
  try {
    // Normalize phone: allow local Ghana format like 0557894646 → +233557894646
    const rawPhone =
      typeof req.body.phone === "string" ? req.body.phone.trim() : "";
    let normalizedPhone = rawPhone;
    if (rawPhone && /^0\d{9}$/.test(rawPhone)) {
      normalizedPhone = `+233${rawPhone.slice(1)}`;
    }
    // If already in international format, leave as-is
    req.body.phone = normalizedPhone || req.body.phone;

    // Check if user already exists by email, username, or phone
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (existingUser) {
      // Provide specific error messages based on which field is duplicated
      if (existingUser.email === req.body.email) {
        return next(
          createError(400, "An account with this email already exists!")
        );
      }
      if (existingUser.phone === req.body.phone) {
        return next(
          createError(400, "An account with this phone number already exists!")
        );
      }
      return next(createError(400, "User already exists!"));
    }

    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      phone: req.body.phone, // ensure normalized phone is saved
      password: hash,
    });

    // create notification
    // const notification = await Notification.create({
    //   userId: user._id,
    //   message: `<p>
    //   Welcome to <strong>JoyDom</strong> – your trusted platform for professional artisan!
    // </p>`,
    // });
    // if (user && user.email) {
    //   await sendRegisterNotificationEmail(user.email, user.username);
    // }

    await newUser.save();

    // Return user data without password
    const { password, ...userInfo } = newUser._doc;
    res.status(201).json({
      message: "User registered successfully",
      user: userInfo,
    });
  } catch (err) {
    // Handle MongoDB duplicate key errors more gracefully
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const value = err.keyValue[field];

      if (field === "email") {
        return next(
          createError(400, "An account with this email already exists!")
        );
      }
      if (field === "phone") {
        return next(
          createError(400, "An account with this phone number already exists!")
        );
      }
      if (field === "username") {
        return next(createError(400, "This username is already taken!"));
      }

      return next(createError(400, `Duplicate ${field}: ${value}`));
    }

    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const identifier = (req.body.username || "").trim();

    // Normalize potential local Ghana phone to international for lookup
    let normalizedIdentifier = identifier;
    if (/^0\d{9}$/.test(identifier)) {
      normalizedIdentifier = `+233${identifier.slice(1)}`;
    }

    // Allow login by username, email, or phone
    const user = await User.findOne({
      $or: [
        { username: identifier },
        { email: identifier },
        { phone: identifier },
        { phone: normalizedIdentifier },
      ],
    });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
        isAdmin: user.isAdmin,
        isSuperAdmin: user.isAdmin, // For now, all admins are super admins
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Login successful", user: info, token });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
