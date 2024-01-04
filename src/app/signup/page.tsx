"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:'',
        password:'',
        username:'',
    })
    
    const [buttonDisbled,setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    },[user]);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup',user);
            console.log("Signup success : ",response.data);
            router.push('/login');
            toast.success("Signup success");
            
        } catch (error : any) {
            console.log("Signup failed : ",error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }



    return (
        <>
            {
            loading ? "Loading ......." :
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>Signup</h1>
                <hr/>

                <label htmlFor="username">username</label>
                <input 
                    className="py-1 px-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="username"
                    type="text" 
                    value={user.username}
                    onChange={(e) => setUser({...user , username:e.target.value})}
                    placeholder="username"
                
                />
                <label htmlFor="email">email</label>
                <input 
                    className="py-1 px-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="email" 
                    value={user.email}
                    onChange={(e) => setUser({...user , email:e.target.value})}
                    placeholder="email"
                
                />
                <label htmlFor="password">password</label>
                <input 
                    className="py-1 px-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password" 
                    value={user.password}
                    onChange={(e) => setUser({...user , password:e.target.value})}
                    placeholder="password"
                
                />

                <button 
                    onClick={onSignup}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                >
                    {buttonDisbled ? "No signup" : "SignUp here"}
                </button>
                <Link className=" text-blue-500" href='/login'>Login instead</Link>
            </div>
            }
        </>
    )
}