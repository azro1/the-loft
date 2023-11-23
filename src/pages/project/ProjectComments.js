import { useState } from 'react'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import Avatar from '../../components/Avatar'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { v4 as uid } from 'uuid'

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
      id: uid()
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
       
       <ul>
       {project.comments.length > 0 && project.comments.map((comment) => (
          <li key={comment.id} >
            <div className="comment-author">
               <Avatar src={comment.photoURL} />
               <p>{comment.displayName}</p>
            </div>
            <div className="comment-date">
              <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
       ))}
       </ul>

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
