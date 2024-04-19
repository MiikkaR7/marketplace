import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import Button from '../components/Button';


import './NavLinks.css'

const NavLinks = (props) => {

    const auth = useContext(AuthContext);
    
return <ul className="nav-links">
    <li>
        <button>
        <NavLink to="/" exact="true">ALL LISTINGS</NavLink>
        </button>
    </li>
    {auth.isLoggedIn && (
    <li>
        <button>
        <NavLink to="/mylistings" exact="true">MY LISTINGS</NavLink>
        </button>
    </li>
    )}
    {auth.isLoggedIn && (
    <li>
        <button>
        <NavLink to="/listings/new" exact="true">LIST AN ITEM</NavLink>
        </button>
    </li>
    )}
    {!auth.isLoggedIn && (
    <li>
        <button>
        <NavLink to="/auth" exact="true">AUTHENTICATE</NavLink>
        </button>
    </li>
    )}
    {auth.isLoggedIn && (
    <li>
        <button onClick={auth.logout}>LOGOUT</button>
    </li>
    )}
  </ul>

}

export default NavLinks;