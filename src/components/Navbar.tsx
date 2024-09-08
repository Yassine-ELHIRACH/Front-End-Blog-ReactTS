import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../context/auth0-context';

function Navbar() {
    const { isLoading, user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <header>
            <div className="container-fluid position-relative no-side-padding">
                <span className="logo">
                    {user && user.picture && <img src={user.picture} alt="My Avatar" />}
                    {!user && (
                        <img
                            src={
                                'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
                            }
                            alt="My Avatar"
                        />
                    )}
                </span>
                <div className="menu-nav-icon" data-nav-menu="#main-menu">
                    <i className="ion-navicon" />
                </div>
                <ul className="main-menu visible-on-click" id="main-menu">
                    <li>
                        <Link className={"nav-link"} to={"/"}>
                            Nest React TypeScript Blog
                        </Link>
                    </li>
                    <li>
                        {!isLoading && !user && (
                            <button className="btn btn-dark" onClick={loginWithRedirect}>
                                Sign In
                            </button>
                        )}
                        {!isLoading && user && (
                            <div>
                                <label className="mr-2">{user.name}</label>
                                <button className="btn btn-dark" onClick={() => logout({ returnTo: window.location.origin })}>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </li>
                    <li>
                        <Link className={"nav-link"} to={"/"}> Home </Link>
                    </li>
                    {isAuthenticated && (
                        <li>
                            <Link className={"nav-link"} to={"/create"}> Create </Link>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Navbar;
