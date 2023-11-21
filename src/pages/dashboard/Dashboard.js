import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'
import ProjectFilter from './ProjectFilter'
import { useState } from "react"

// styles
import './Dashboard.css'

const Dashboard = () => {
  const [currentCategory, setCurrentCategory] = useState('all')
  // destructure documents from hook
  const { error, documents } = useCollection('projects')

  const changeCategory = (newCategory) => {
    setCurrentCategory(newCategory)
  }
  
  return (
    <div>
       <h2 className='page-title'>Dashboard</h2>
       {error && <p className='error'>{error}</p>}
       {documents && (
         <ProjectFilter currentCategory={currentCategory} changeCategory={changeCategory} />
        )}
       {documents && <ProjectList projects={documents} />}
    </div>
  )
}

export default Dashboard
