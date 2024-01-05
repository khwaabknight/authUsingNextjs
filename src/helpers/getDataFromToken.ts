import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
  try {
    const encodedtoken = request.cookies.get('token')?.value || '';
    const decodedtoken:any = jwt.verify(encodedtoken,process.env.TOKEN_SECRET!);
    return decodedtoken.id;
  } catch (error : any) {
    throw new Error(error.message);
  }
}