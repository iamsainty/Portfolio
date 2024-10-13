import React, { useState } from 'react'
import ProjectHero from './ProjectHero'
import DisplayProjects from './DisplayProjects'

function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className='container'>
      <ProjectHero setSearchQuery={setSearchQuery} />
      <DisplayProjects setSearchQuery={searchQuery} />
    </div>
  )
}

export default Projects
