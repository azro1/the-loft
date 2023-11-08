import { Link } from 'react-router-dom'


// styles & images
import door from '../assets/door.svg'
import './Navbar.css'


const Navbar = () => {
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
            <button  className='btn'>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar
