import React, { useEffect } from 'react'
import Introduction from '../Introduction'

export default function Blog(props) {

  useEffect(() => {
    document.title = `${props.title}`;
  }, [props.title]);
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
