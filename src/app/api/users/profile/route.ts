import connect from "@/config/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import UserModel from "@/models/userModel";
connect();
export async function GET(req: NextRequest) {
  try {
    const _id = await getDataFromToken(req);
    const user = await UserModel.findOne({ _id }).select("-password ");
    if (!user) {
      return NextResponse.json(
        {
          message: "User Not Found",
          success: false,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "User Found Successfully",
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
