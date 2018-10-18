import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../interface/style/header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="logo">
                    <NavLink to="/library">
                        <img src="../pics/logo2.png" alt="hypertube"/>
                    </NavLink>
                </div>
                <div className="search-input">
                    <label>
                        <i className="fas fa-search"></i>
                    </label>
                    <input type="text" placeholder="Search"/>
                </div>
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
        );
    }
}

export default Header;