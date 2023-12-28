import connect from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import UserModel from "@/models/userModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json(); //instead of req.body we use the req object to json
    const { userName, email, password } = reqBody;
    // if existed user
    const user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "User Already Exists",
          success: false,
        },
        { status: 400 }
      );
    }
    // hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await  bcryptjs.hash(password, salt);
    const newUser = new UserModel({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return NextResponse.json({
      message: "User Created Succesfully",
      success: true,
      savedUser,
    },{status : 201});
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
