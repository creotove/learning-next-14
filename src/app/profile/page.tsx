'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function Profilepage() {
  const router = useRouter()
  const [userData, setUserData] = useState('Processing')
  const logout = async () => {
    try {
      await axios.get('api/users/logout')
      toast.error('Logout Successful')
      router.push('/login')

    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }
  const getUserData = async () => {
    try {
      const res = await axios.get('/api/users/profile')
      if (res.data.success) {
        setUserData(res.data.data)
        toast.success(res.data.message)
      }
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getUserData()
  }, [])
  return (
    <section className='flex justify-center items-center flex-col'>
      <div>
        <h1 className="text-2xl">Profile</h1>
        {
          userData && userData === 'Processing' ? "Fetching User Details" : <p className='text-xl text-amber-400'>{userData?.userName}</p>
        }

      </div>
      <button onClick={logout} className="px-3 py-1 rounded-md border bg-red-700">Logout</button>
    </section>
  )
}
