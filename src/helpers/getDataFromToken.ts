import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getDataFromToken(req : NextRequest) {
  try {
    const encodedToken = req.cookies.get('token')?.value || ''
    const decodedToken:any = jwt.verify(encodedToken,process.env.TOKEN_SECRET!)
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
