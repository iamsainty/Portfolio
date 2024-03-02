import React from 'react'
import BlogIntro from './BlogIntro'

export default function Blog(props) {
    let mode=props.mode;
  return (
    <div>
      <BlogIntro mode={mode}/>
      <div style={{ height: '20vh', width: '100%' }}></div>
      <div className="container">
      <p>Sorry for incovenience, no blogs are published by this time, explore other sections</p>
      </div>
    </div>
  )
}
