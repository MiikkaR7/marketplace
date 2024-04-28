import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../context/auth-context';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';

import './Navigation.css';

const Navigation = (props) => {

const auth = useContext(AuthContext);

    return (
        <div className="navigation__main">
            <MainHeader>
                <h1 className='navigation__title'>
                    <Link to="/">Marketplace Listings</Link>
                </h1>
                <div className='login__status'>
                {auth.isLoggedIn && (
                    <p>Logged in as: {auth.userName}</p>
                )}
                </div>
                <nav className='navigation__header-nav'>
                    <NavLinks/>
                </nav>
            </MainHeader>
        </div>
    )

};

export default Navigation;