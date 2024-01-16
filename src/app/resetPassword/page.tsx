'use client'
import axios from "axios"
import Link from "next/link"
import React,{ useState,useEffect } from "react"
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false)

  const resetUserPassword = async() => {
      try {
          await axios.post('/api/users/changePassword',{token,password:pass}); 
          console.log('password changed success');
          router.push('/login');  
      } catch (error : any) {
          setError(true);
          console.log(error)
      }
  }

  useEffect(() => {
      const urlToken = window.location.search.split('=')[1] || '';
      setToken(urlToken);
  },[token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 gap-y-2'>
      <h1>Reset Password Page</h1>
      <h2>{token}</h2>
      {
        token.length > 0 && (
          <div className="flex flex-col justify-center items-center gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder='Enter password'
              className="py-1 px-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
              onChange={(e) => setPass(e.target.value)}/>
            <button onClick={resetUserPassword}>Submit</button>
          </div>
        )
      }
      {
        error && (
          <div>
            <h2>Error</h2>
          </div>
        )
      }      

    </div>
  )
}
