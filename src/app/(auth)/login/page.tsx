'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const login = async () => {
        try {
            const res = await axios.post('/api/users/login',user)
            if(res.data.success){
                router.push('/users')
                toast.success(res.data.message)
            }
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (
        <section className="flex flex-col items-center h-screen w-screen justify-center">
            <h2 className="text-3xl mb-3">Login</h2>
            <div className="flex flex-col items-end gap-3">
                <div>
                    <label htmlFor="name">Email</label><input onChange={(e) => {
                        setUser({
                            ...user, email: e.target.value
                        })
                    }} className="p-2 bg-black border-neutral-700 border rounded-xl" type="text" /><br />
                </div>
                <div>
                    <label htmlFor="name">Password</label><input onChange={(e) => {
                        setUser({
                            ...user, password: e.target.value
                        })
                    }} className="p-2 bg-black border-neutral-700 border rounded-xl" type="password" /><br />
                </div>
            </div>
            <button onClick={login} className="border border-neutral-700 px-3 py-1 rounded-lg mt-3">login</button>
            <Link href={'/signup'}>New user ?</Link>
        </section>
    )
}
