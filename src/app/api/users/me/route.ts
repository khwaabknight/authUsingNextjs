import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log("user log" ,userId)
    const user = await User.findOne({_id:userId}).select('-password');
    console.log(user)
    return NextResponse.json({
        message: 'User found',
        data:user,
    });
  } catch (error:any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}