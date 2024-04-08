import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

//import { AuthContext } from '../context/auth-context';
//import Button from '../components/Button';


//import './NavLinks.css'

const NavLinks = (props) => {

//    const auth = useContext(AuthContext);
    
return <ul className="nav-links">
    <li>
        <NavLink to="/" exact="true">ALL LISTINGS</NavLink>
    </li>
        <NavLink to="/listings/new">LIST AN ITEM</NavLink>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
  </ul>

}

export default NavLinks;