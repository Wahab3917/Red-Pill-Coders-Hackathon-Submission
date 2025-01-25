import { Request, Response } from "express";
import { UserDTOProps } from "../../shared";
import { DEFAULT_USER } from "../../config/constants";
import ResponseHandler from "../../helpers/ResponseHandler";
import ErrorHandler from "../../helpers/ErrorHandler";
import UserSignupSchema from "../../schema/user/UserSignupSchema.schema";
import UserModel from "../../models/user/User.model";
import UserDTO from "../../dto/user/UserDTO.dto";
import UserLoginSchema from "../../schema/user/UserLoginSchema.schema";
import sendEmail from "../../services/sendEmail";
import generateToken from "../../utils/generateToken";
import bcrypt from "bcrypt";

export const userSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const { error } = await UserSignupSchema.validate(req.body);
  if (error) {
    return ErrorHandler.send(res, 400, error.details[0].message);
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return ErrorHandler.send(res, 400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      profilePic: DEFAULT_USER,
    });

    if (!newUser) {
      return ErrorHandler.send(res, 500, "Failed to create user");
    }

    const userDTO = new UserDTO(newUser as UserDTOProps);

    try {
      await sendEmail({
        to: userDTO.email,
        subject: "Welcome to NetworQ - Your Account Has Been Created",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2c3e50;">Welcome to NetworQ!</h1>
          <p>Dear ${userDTO.name},</p>
          <p>Thank you for creating your account with NetworQ. We're excited to have you join our community!</p>
          <p>Your account has been successfully created with the following email: <strong>${userDTO.email}</strong></p>
          <p>You can now log in to your account and start exploring all the features NetworQ has to offer.</p>
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br>The NetworQ Team</p>
        </div>
      `,
        text: `
Welcome to NetworQ!

Dear ${userDTO.name},

Thank you for creating your account with NetworQ. We're excited to have you join our community!

Your account has been successfully created with the following email: ${userDTO.email}

You can now log in to your account and start exploring all the features NetworQ has to offer.

If you have any questions or need assistance, please don't hesitate to contact our support team.

Best regards,
The NetworQ Team
      `,
      });
    } catch (error: any) {
      return ErrorHandler.send(res, 400, error.message);
    }

    const token = await generateToken(userDTO, res);

    return ResponseHandler.send(
      res,
      200,
      "User created successfully",
      userDTO,
      token
    );
  } catch (error: any) {
    return ErrorHandler.send(res, 500, error.message);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error } = await UserLoginSchema.validate(req.body);
  if (error) {
    return ErrorHandler.send(res, 400, error.details[0].message);
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return ErrorHandler.send(res, 404, "No account found with this email");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return ErrorHandler.send(res, 400, "Invalid credentials");
    }

    const userDTO = new UserDTO(user as UserDTOProps);

    const token = await generateToken(user, res);

    return ResponseHandler.send(
      res,
      200,
      "Logged in successfully",
      userDTO,
      token
    );
  } catch (error: any) {
    return ErrorHandler.send(res, 500, error.message);
  }
};
