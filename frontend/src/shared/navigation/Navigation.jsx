import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';

const Navigation = (props) => {
    return (
        <>
            <MainHeader>
                <h1 className='navigation__title'>
                    <Link to="/">Marketplace Listings</Link>
                </h1>

                <nav className='navigation__header-nav'>
                    <NavLinks/>
                </nav>
            </MainHeader>
        </>
    )

};

export default Navigation;