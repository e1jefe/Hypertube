import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../interface/style/header.css';

class Header extends Component {
    render() {
        return (
            <div>
                <div className="header">
                    <div className="logo">
                        <NavLink to="/library">
                            <img src="../pics/logo2.png" alt="hypertube"/>
                        </NavLink>
                    </div>
                    <div className="header-items">
                        <div className="links">
                            <div>
                                <NavLink to="/myProfile" >
                                    Profile
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to="/library" >
                                    Library
                                </NavLink>
                            </div>
                        </div>
                        <div className="languages">
                            <NavLink to="/ru">
                                RU
                            </NavLink>
                            <NavLink to="/en" className="active">
                                EN
                            </NavLink>
                        </div>
                        <div className="logout">
                            <button>
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
                <header className="header-mob">
                    <div className="logo">
                        <NavLink to="/library">
                            <img src="../pics/logo2.png" alt="hypertube"/>
                        </NavLink>
                    </div>
                    <input className="menu-btn" type="checkbox" id="menu-btn" />
                    <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                    <ul className="menu">
                        <li><NavLink to="/myProfile">Profile</NavLink></li>
                        <li><NavLink to="/library">Library</NavLink></li>
                        <li><NavLink to="/ru">RU</NavLink></li>
                        <li><NavLink to="/en">EN</NavLink></li>
                        <li><NavLink to="/logout">Log out</NavLink></li>
                    </ul>
                </header>
            </div>
        );
    }
}

export default Header;