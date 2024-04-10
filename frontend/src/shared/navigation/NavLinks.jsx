import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import Button from '../components/Button';


import './NavLinks.css'

const NavLinks = (props) => {

    const auth = useContext(AuthContext);
    
return <ul className="nav-links">
    <li>
        <Button>
        <NavLink to="/" exact="true">ALL LISTINGS</NavLink>
        </Button>
    </li>
    {auth.isLoggedIn && (
    <li>
        <Button>
        <NavLink to="/mylistings" exact="true">MY LISTINGS</NavLink>
        </Button>
    </li>
    )}
    {auth.isLoggedIn && (
    <li>
        <Button>
        <NavLink to="/listings/new" exact="true">LIST AN ITEM</NavLink>
        </Button>
    </li>
    )}
    {!auth.isLoggedIn && (
    <li>
        <Button>
        <NavLink to="/auth" exact="true">AUTHENTICATE</NavLink>
        </Button>
    </li>
    )}
    {auth.isLoggedIn && (
    <li>
        <Button onClick={auth.logout}>LOGOUT</Button>
    </li>
    )}
  </ul>

}

export default NavLinks;