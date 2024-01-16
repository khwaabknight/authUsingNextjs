import {connect} from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        const user = await User.findOne({email:email})
        if(!user) {
            return NextResponse.json({error:'User does not exists'},{status:400})
        }

        const userId = user._id;

        await sendEmail({email:email,emailType:'RESET',userId:userId});

        return NextResponse.json({message:'Reset link sent successfully',success:true},{status:200})
        
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status:500});
    }
}
