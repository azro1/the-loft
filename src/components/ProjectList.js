// styles
import './ProjectList.css'

const ProjectList = ({projects}) => {
  return (
    <div>
       {projects.length === 0 && <p>Create a new project</p>}
       {projects.map((project) => (
          <p key={project.id}>{project.name}</p>
       ))}
    </div>
  )
}

export default ProjectList
