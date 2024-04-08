import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';

import './Navigation.css';

const Navigation = (props) => {
    return (
        <div className="navigation__main">
            <MainHeader>
                <h1 className='navigation__title'>
                    <Link to="/">Marketplace Listings</Link>
                </h1>

                <nav className='navigation__header-nav'>
                    <NavLinks/>
                </nav>
            </MainHeader>
        </div>
    )

};

export default Navigation;