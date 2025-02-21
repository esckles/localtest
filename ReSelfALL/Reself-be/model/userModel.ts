import { Document, model, Schema } from "mongoose";

interface iUser {
  userName: string;
  email: string;
  password: string;
  isVerified: boolean;
  isVerifiedToken: string;
  otp: string;
  otpExpiresAt: string;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isVerifiedToken: {
      type: String,
    },
    otp: {
      type: String,
      required: true,
    },
    otpExpiresAt: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iUserData>("SelfUsers", userModel);
