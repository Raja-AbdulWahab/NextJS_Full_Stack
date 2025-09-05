import React from 'react'

const UserProfile = ({params}: any) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>Profile Page <span className='p-2 bg-green-600'>{params.id}</span></p>
    </div>
  )
}

export default UserProfile
