import React from 'react'
import BlogHeroSection from './BlogHeroSection'
import Blogs from './Blogs'

const page = () => {
  return (
    <div className="flex flex-col items-center">
      <BlogHeroSection />
      <Blogs />
    </div>
  )
}

export default page
