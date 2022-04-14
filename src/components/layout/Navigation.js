// code for navigation bar

import { Link } from 'react-router-dom';

import './Navigation.css';

function Navigation() {

    return (
        <header className="header">
            <h1 className="logo"><Link to='/'>ZILLA</Link></h1>
            <ul className="main-nav">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/all-projects'>All</Link></li>
                <li><Link to='/new-project'>New</Link></li>
                <li><Link to='/favourites'>Favourites</Link></li>
            </ul>
        </header>

    );
}

export default Navigation;
