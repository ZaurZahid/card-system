import React from 'react'
import { NavLink } from 'react-router-dom'
import { getAccessToken, removeAccessToken, removeRefreshToken, removeUserId } from '../../../utils/index';
import { logoutService } from '../../../utils/services/auth';

function Header() {
    const handleLogout = () => {
        logoutService().then(() => {
            removeAccessToken()
            removeRefreshToken()
            removeUserId()
            window.location.href = '/login'
        })
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand" href="/">Card System</a>
                    <button className="navbar-toggler bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="client_cards"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                >
                                    Client Cards
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/deposit"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                >
                                    Deposit
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/mytransactions"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                >
                                    My transactions
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                >
                                    Profile
                                </NavLink>
                            </li>
                            {getAccessToken()
                                ? <div className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
                                    Log out
                                </div>
                                : <li className="nav-item">
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                    >
                                        Log In
                                    </NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header >
    )
}

export default Header
