// styles
import './OnlineUsers.css'
import { useCollection } from '../hooks/useCollection'
import Avatar from './Avatar'

const Onlineusers = () => {
// destructure documents from hook
const { error, documents } = useCollection('users')

  return (
    <div className='user-list'>
      <h2>All Users</h2>
      {error && <div className='error'>{error}</div>}
      {documents &&
        documents.map((user) => (
          <div className='user-list-item' key={user.id}>
            <span
              className='online-user'
              style={{ background: user.online ? '#0ebb50' : '#d3d3d3' }}
            ></span>
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}

export default Onlineusers
