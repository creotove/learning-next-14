import connect from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "@/models/userModel";
connect();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    // Checking user exists or not
    const user = await UserModel.findOne({email})

    if (!user) {
      return NextResponse.json(
        {
          message: "User Doesnot exists",
          success: false,
        },
        { status: 404 }
      );
    }
    // Password Validation
    const validatedPassword = bcryptjs.compare(password, user.password);
    if (!validatedPassword) {
      return NextResponse.json(
        {
          message: "Invalid Crdentials",
          success: false,
        },
        { status: 401 }
      );
    }
    // Token Creation
    const tokenData = {
      id: user._id,
      email: user.email,
      userName: user.userName,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      {
        message: "Login Succesful",
        success: true,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
