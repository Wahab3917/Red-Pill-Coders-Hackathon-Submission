import { Request, Response } from "express";
import { AdminDTOProps } from "../../shared";
import { DEFAULT_USER } from "../../config/constants";
import ResponseHandler from "../../helpers/ResponseHandler";
import ErrorHandler from "../../helpers/ErrorHandler";
import AdminModel from "../../models/admin/Admin.model";
import AdminSignupSchema from "../../schema/admin/AdminSignupSchema.schema";
import AdminLoginSchema from "../../schema/admin/AdminLoginSchema.schema";
import AdminDTO from "../../dto/admin/AdminDTO.dto";
import sendEmail from "../../services/sendEmail";
import generateToken from "../../utils/generateToken";
import bcrypt from "bcrypt";
import cookieConfig from "../../utils/cookieConfig";

export const adminSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const { error } = await AdminSignupSchema.validate(req.body);
  if (error) {
    return ErrorHandler.send(res, 400, error.details[0].message);
  }

  try {
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return ErrorHandler.send(res, 400, "Admin already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await AdminModel.create({
      name,
      email,
      password: hashedPassword,
      profilePic: DEFAULT_USER,
    });

    if (!newAdmin) {
      return ErrorHandler.send(res, 500, "Failed to create admin");
    }

    const adminDTO = new AdminDTO(newAdmin as AdminDTOProps);

    try {
      await sendEmail({
        to: newAdmin.email,
        subject: "Welcome to NetworQ - Your Account Has Been Created",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2c3e50;">Welcome to NetworQ!</h1>
          <p>Dear ${newAdmin.name},</p>
          <p>Thank you for creating your account with NetworQ. We're excited to have you join our community!</p>
          <p>Your account has been successfully created with the following email: <strong>${newAdmin.email}</strong></p>
          <p>You can now log in to your account and start exploring all the features NetworQ has to offer.</p>
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br>The NetworQ Team</p>
        </div>
      `,
        text: `
Welcome to NetworQ!

Dear ${newAdmin.name},

Thank you for creating your account with NetworQ. We're excited to have you join our community!

Your account has been successfully created with the following email: ${newAdmin.email}

You can now log in to your account and start exploring all the features NetworQ has to offer.

If you have any questions or need assistance, please don't hesitate to contact our support team.

Best regards,
The NetworQ Team
      `,
      });
    } catch (error: any) {
      return ErrorHandler.send(res, 400, error.message);
    }

    const token = await generateToken(newAdmin, res);

    res.cookie("token", token, cookieConfig);

    return ResponseHandler.send(
      res,
      200,
      "Admin created successfully",
      adminDTO,
      token
    );
  } catch (error: any) {
    return ErrorHandler.send(res, 500, error.message);
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error } = await AdminLoginSchema.validate(req.body);
  if (error) {
    return ErrorHandler.send(res, 400, error.details[0].message);
  }

  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return ErrorHandler.send(res, 404, "No account found with this email");
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return ErrorHandler.send(res, 400, "Invalid credentials");
    }

    const adminDTO = new AdminDTO(admin as AdminDTOProps);

    const token = await generateToken(admin, res);

    res.cookie("token", token, cookieConfig);

    return ResponseHandler.send(
      res,
      200,
      "Admin logged in successfully",
      adminDTO,
      token
    );
  } catch (error: any) {
    return ErrorHandler.send(res, 500, error.message);
  }
};
