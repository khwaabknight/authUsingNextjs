"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setuser] = useState(null)
    const getUser = async() => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setuser(res.data.data._id);
    }

    const logout = async() => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
            
        } catch (error : any) {
            console.log(error);
            toast.error(error.message);
        }
    }



    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-2"
        >
            <h1>Profile</h1>
            <hr/>
            <p>Profile page</p>
            <h2>{user === null ? "nothing present"  : <Link href={`/profile/${user}`}>{user}</Link>}</h2>
            <hr/>
            <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
            >Logout</button>
            <button
            onClick={getUser}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded mt-6"
            >Get User</button>

        </div>
    )
}