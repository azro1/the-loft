import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

// styles & images
import door from '../assets/door.svg'
import './Navbar.css'

const Navbar = () => {
// destructure useLogout hook
const { isPending, logout } = useLogout()

  return (
    <nav className='navbar'>
      <ul>
        <li className='logo'>
          <img src={door} alt='an open door' />
          <span>The Loft</span>
        </li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/Signup'>Signup</Link></li>
        <li>
            {isPending && <button className='btn' disabled >Loggin out...</button>}
            {!isPending && <button className='btn' onClick={logout} >Logout</button>}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar
