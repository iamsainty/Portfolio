import React from 'react'
import UserProfile from './UserProfile'
import UserStats from './UserStats'

const page = () => {
  return (
    <div className='flex flex-col gap-20 m-8 md:m-14'>
      <UserProfile />
      <UserStats />
    </div>
  )
}

export default page
