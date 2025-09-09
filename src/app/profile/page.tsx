"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'

const ProfilePage = () => {
  const [data, setData] = useState('nothing')
  const router = useRouter()

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success('logout successfull')
      router.push('/login')
    } catch (error: any) {
      console.log("Signup Failed", error.message)
      toast.error(error.message);
    }
  }

  const getUserDetails = async () =>{
    const res = await axios.get('/api/users/userDetails')
    console.log(res.data)
    setData(res.data.data.username)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className='bg-green-400 p-1'>{data === 'nothing'? 'Nothing': 
        <Link href = {`/profile/${data}`} >{data}</Link>}</h2>
      <hr />
      <button onClick={logout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded'>Logout</button>
      <button onClick={getUserDetails} className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded'>Get User Details</button>
    </div>
  )
}

export default ProfilePage
