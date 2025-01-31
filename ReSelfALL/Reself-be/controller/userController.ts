import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import env from "dotenv";
import userModel from "../model/userModel";
env.config();

export const signUp = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const { otp, expiresIn } = generateOtp();
    const salt = await bcrypt.genSalt(9);
    const hashed = await bcrypt.hash(password, salt);
    const token = crypto.randomBytes(6).toString("hex");
    const user = await userModel.create({
      userName,
      email,
      password: hashed,
      isVerifiedToken: token,
      otp: otp,
      otpExpiresAt: expiresIn,
    });
    return res.status(201).json({
      message: "Account created successfully",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error creating account", status: 404 });
  }
};

export const VerifyUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { otp } = req.body;
    const user = await userModel.findById(userID);
    if (user) {
      if (user?.otp === otp) {
        const otpExpiresAt = new Date(user?.otpExpiresAt);
        const currentDate = new Date();
        if (otpExpiresAt > currentDate) {
          return res.status(404).json({ message: "OTP Expired", status: 404 });
        } else {
          const updatedUser = await userModel.findByIdAndUpdate(
            userID,
            {
              isVerified: true,
              isVerifiedToken: "",
              otp: "",
              otpExpiresAt: "",
            },
            { new: true }
          );
          return res.status(201).json({
            message: "Account verified successfully",
            data: updatedUser,
            status: 201,
          });
        }
      } else {
        return res
          .status(404)
          .json({ message: "Error with user datails", status: 404 });
      }
    } else {
      return res.status(404).json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error verifying account", status: 404 });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const decryptPassword = await bcrypt.compare(password, user?.password);
      if (decryptPassword) {
        if (user?.isVerified && user?.isVerifiedToken === "") {
          const token = jwt.sign(
            { id: user?._id },
            process.env.JWT_SECRET as string,
            {
              expiresIn: process.env.JWT_EXPIRES,
            }
          );
          return res.status(201).json({
            message: "Account Login successfully",
            data: token,
            status: 201,
          });
        } else {
          return res
            .status(404)
            .json({ message: "Error with user verification", status: 404 });
        }
      } else {
        return res
          .status(404)
          .json({ message: "Incorrect Password", status: 404 });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Email does not exist", status: 404 });
    }
  } catch (error) {
    return res.status(404).json({ message: "Erro login", status: 404 });
  }
};

export const Readone = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);
    return res
      .status(200)
      .json({ message: "One user read successfully", data: user, status: 200 });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error reading one user", status: 404 });
  }
};

export const readAlluser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();
    return res
      .status(200)
      .json({ message: "All user read successfully", data: user, status: 200 });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error reading all users", status: 404 });
  }
};
