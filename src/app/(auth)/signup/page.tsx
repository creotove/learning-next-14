'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const signup = async () => {
        try {
            setLoading(true)
            const res = await axios.post('/api/users/signup',user)
            if (res.status === 201) {
                router.push('/login')
            }
        } catch (error: any) {
            console.log("Signup failed: ", error.message);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <section className="flex flex-col items-center h-screen w-screen justify-center">
            <h2 className="text-3xl mb-3">SignUp</h2>
            <div className="flex flex-col items-end gap-3">
                <div>
                    <label htmlFor="name">Name</label><input onChange={(e) => {
                        setUser({ ...user, userName: e.target.value })
                    }} className="p-2 bg-black border-neutral-700 border rounded-xl" type="text" /> <br />
                </div>
                <div>
                    <label htmlFor="name">Email</label><input onChange={(e) => {
                        setUser({ ...user, email: e.target.value })
                    }} className="p-2 bg-black border-neutral-700 border rounded-xl" type="text" /><br />
                </div>
                <div>
                    <label htmlFor="name">Password</label><input onChange={(e) => {
                        setUser({ ...user, password: e.target.value })
                    }} className="p-2 bg-black border-neutral-700 border rounded-xl" type="password" /><br />
                </div>
            </div>
            <button className="border border-neutral-700 px-3 py-1 rounded-lg mt-3" onClick={signup}>Signup</button>
            {
                loading ? "Creating User..." : ""
            }
            <Link href={'/login'}>Already a user ?</Link>
        </section>
    )
}
