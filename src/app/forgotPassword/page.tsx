'use client'
import React, { useState } from 'react'
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email , setEmail] = useState('');
    const [loading, setLoading] = useState(false)

    const submitHandler = async(e: any) => {

        try {
          setLoading(true)
          const response = await axios.post('/api/users/resetPassword',{email});
          console.log('forgot password email sent success : ',response.data);
          toast.success("forgot password email sent success");
          router.push('/login');
          
        } catch (error:any) {
          console.log("forgot password email sent failed : ",error);
          toast.error(error.message);
        }finally{
          setLoading(false)
        }
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 gap-y-2'>
      <h1>Forgot Password Page</h1>
      <p>Enter email</p>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={email}
        placeholder='Enter email'
        className='py-1 px-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        onChange={(e) => setEmail(e.target.value)}/>

      <button 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      onClick={submitHandler}>Submit</button>
    </div>
  )
}
