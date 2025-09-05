'use client';

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'


const SignupPage = () => {
    const router = useRouter();

    const [DisabledButton, setDisabledButton] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
    })

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            console.log("Signup Success", response.data)
            router.push('/login');
        } catch (error: any) {
            console.log("Signup Failed", error.message)
            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setDisabledButton(false)
        }
        else {
            setDisabledButton(true)
        }
    }, [user]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-7'>
            <h1 className='text-xl'>{loading? "Processing": "Signup"}</h1>
            <hr />
            <div className='m-2'>
                <label className='px-4 m-4' htmlFor="username">UserName</label>
                <input
                    id='username'
                    type="text"
                    value={user.username}
                    onChange={(e) => {
                        setUser({ ...user, username: e.target.value })
                    }}
                    placeholder='Enter username'
                />
                <br />
                <label className='px-4 m-4' htmlFor="email">Email</label>
                <input
                    className='px-9'
                    id='email'
                    type="text"
                    value={user.email}
                    onChange={(e) => {
                        setUser({ ...user, email: e.target.value })
                    }}
                    placeholder='Enter Your Email'
                />
                <br />
                <label className='px-4 m-4' htmlFor="password">Password</label>
                <input
                    className='px-2'
                    id='password'
                    type="password"
                    value={user.password}
                    onChange={(e) => {
                        setUser({ ...user, password: e.target.value })
                    }}
                    placeholder='Enter Password'
                />
                <br />
            </div>
            <button
                onClick={onSignup}
                className='border border-gray-100 focus:ouline-none focus:border-gray-600 bg-black text-white rounded m-2'>
                {DisabledButton ? "No Signup" : "Signup"}
            </button>
            <Link href='/login'>Visit Login Page</Link>

        </div>
    )
}

export default SignupPage
