import React from 'react'
import Introduction from '../Introduction'

export default function Blog(props) {
    let mode=props.mode;
    const blogtitle=[
      'No blogs to display'
    ]
  return (
    <div className='container'>
      <Introduction mode={mode} array={blogtitle} heading={"Blogs"}/>
      <div style={{ height: '20vh', width: '100%' }}></div>
    </div>
  )
}
