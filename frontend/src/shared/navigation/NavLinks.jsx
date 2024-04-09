import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
//import Button from '../components/Button';


import './NavLinks.css'

const NavLinks = (props) => {

    const auth = useContext(AuthContext);
    
return <ul className="nav-links">
    <li>
        <NavLink to="/" exact="true">ALL LISTINGS</NavLink>
    </li>
    {auth.isLoggedIn && (
    <li>
        <NavLink to="/listings/new" exact="true">LIST AN ITEM</NavLink>
    </li>
    )}
    <li>
        <NavLink to="/auth" exact="true">AUTHENTICATE</NavLink>
    </li>
  </ul>

}

export default NavLinks;