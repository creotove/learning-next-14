'use client'
import React, { useState } from 'react'
import axios from "axios"
import Link from "next/link"
import { useEffect } from "react"

export default function VerifyEmailPage() {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    const verifyUser = async () => {
        try {
            const res = await axios.post('api/users/verifyemail', { token })
            if (res.data.success) {
                setVerified(true)
            }
        } catch (error: any) {
            setError(true)
            console.log(error.message);
        }

    }
    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
        setToken(token || '')
        setToken(urlToken)
    }, [])
    useEffect(() => {
        if (token && token.length > 0) {
            verifyUser()
        }
    }, [token])
    return (
        <section className='flex flex-col min-h-screen justify-center items-center'>
            <h1 className='text-3xl'>Verify Email</h1>
            {
                verified && (
                    <div className="text-center">
                        <h2 className='text-3xl text-green-500'>Email Verified</h2>
                        <Link href={'/login'} className='text-blue-500 underline hover:tracking-wide'>
                            Login -&gt;
                        </Link>
                    </div>
                )
            }
            {
                error && (
                    <div className="">
                        <h2 className='text-3xl '>Error Occured</h2>
                    </div>
                )
            }
        </section>
    )

}

