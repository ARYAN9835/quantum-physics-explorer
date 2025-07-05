import mongoose from "mongoose";
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from  '../error.js';
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT, { expiresIn: "7d" });

    const { password, ...userWithoutPass } = savedUser._doc;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userWithoutPass,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "Wrong credentials"));

    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "7d" });
    const { password, ...userWithoutPass } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: userWithoutPass,
        token,
      });
  } catch (err) {
    next(err);
  }
};
