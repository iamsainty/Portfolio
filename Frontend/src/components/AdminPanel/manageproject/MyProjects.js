import React, { useContext } from 'react'
import projectContext from '../../context/projects/projectContext'

const MyProjects = () => {
  const context = useContext(projectContext);
  const { getProjects } = context;
  const handleclick =()=>{
    getProjects();
  }
  return (
    <div>
      <div onClick={handleclick}>Click</div>
    </div>
  )
}

export default MyProjects
