import { useState } from 'react'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

const ProjectComments = ({ project }) => {
  // destructure function and response from hook
  const { updateDocument, response } = useFirestore('projects')
  const [newComment, setNewComment] = useState('')
  // destructure user from hook
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // create object to represent comment we want to add to project
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }
    await updateDocument(project.id, { 
      comments: [...project.comments, commentToAdd]
    })
    if (!response.error) {
      setNewComment('')
    }
  }

  return (
    <div className='project-comments'>
       <h4>Project Comments</h4>
       <form className='add-comment' onSubmit={handleSubmit}>
         <label>
            <span>Add new comment</span>
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} required></textarea>
         </label>
         <button className="btn">Add comment</button>
       </form>
    </div>
  )
}

export default ProjectComments
