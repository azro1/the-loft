// styles
import './Avatar.css'

const Avatar = ({ src }) => {
  return (
    <div className='avatar'>
       <img src={src} alt='profile avatar' />
    </div>
  )
}

export default Avatar
