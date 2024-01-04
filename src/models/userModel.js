import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type:String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type:String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default:false,
    },
    isAdmin: {
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
})

const User = mongoose.models.users || mongoose.model('users',userSchema);
// const User = mongoose.models.users || mongoose.model('User',userSchema); // You can use 'User' also instead of 'users'

export default User;