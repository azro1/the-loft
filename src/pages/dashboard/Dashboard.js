import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'
import ProjectFilter from './ProjectFilter'
import { useState } from "react"
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Dashboard.css'

const Dashboard = () => {
  const [currentCategory, setCurrentCategory] = useState('all')
  // destructure documents from hook
  const { error, documents } = useCollection('projects', null, ['createdAt', 'desc'])
  const { user } = useAuthContext()


  const changeCategory = (newCategory) => {
    setCurrentCategory(newCategory)
  }

  // filter project documents
  const projects = documents ? documents.filter((doc) => {
    switch (currentCategory) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false;
        doc.assignedUsersList.forEach((u) => {
          if (u.id === user.uid) {
            assignedToMe = true;
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        return doc.category === currentCategory
      default:
        return true
    }
  }) : null
  
  return (
    <div>
       <h2 className='page-title'>Dashboard</h2>
       {error && <p className='error'>{error}</p>}
       {documents && (
         <ProjectFilter currentCategory={currentCategory} changeCategory={changeCategory} />
        )}
       {projects && <ProjectList projects={projects} />}
    </div>
  )
}

export default Dashboard
