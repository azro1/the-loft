import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'
import ProjectFilter from './ProjectFilter'

// styles
import './Dashboard.css'

const Dashboard = () => {
  // destructure documents from hook
  const { error, documents } = useCollection('projects')
  
  return (
    <div>
       <h2 className='page-title'>Dashboard</h2>
       {error && <p className='error'>{error}</p>}
       {documents && <ProjectFilter />}
       {documents && <ProjectList projects={documents} />}
    </div>
  )
}

export default Dashboard
