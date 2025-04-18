import React from 'react'
import UserProfile from './UserProfile'
import UserStats from './UserStats'

const page = () => {
  return (
    <div className='flex flex-col gap-5'>
      <UserProfile />
      <UserStats />
    </div>
  )
}

export default page
