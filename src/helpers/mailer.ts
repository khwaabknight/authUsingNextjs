import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({email,emailType,userId} : any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        } else if(emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
        })

        const mailOptions = {
            from:'aman@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email address' : 'Reset your password',
            html:`<>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email address' : 'reset your password'}
            or copy and paste the link below in your browser. <br/>${process.env.domain}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetPassword'}?token=${hashedToken}
            </p>`
        }
        
        const mailresponse = await transporter.sendMail(mailOptions);

        return mailresponse;

    } catch (error:any) {
        console.log(error)
    }
}