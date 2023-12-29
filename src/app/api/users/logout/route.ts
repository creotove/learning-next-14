import connect from "@/config/dbConfig";
import { NextResponse } from "next/server";
connect();
export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Logout Successful",
        success: true,
      },
      { status: 200 }
    );
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
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
