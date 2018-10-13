import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../interface/style/header.css';
import { connect } from 'react-redux';

// ACTIONS from redux reduser
import { logout } from "../redux/actions";

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.logout = this.logout.bind(this);
    }

    logout() {
        fetch('http://127.0.0.1:8000/api/auth/logout', {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + this.props.componentState.token
            }
        }).then((res) => res.json())
        .then((responce) => {
            this.props.logout();
            this.props.history.push('/signin');
        });
    }

    render() {
        console.log("header", this.props);

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
                            <button onClick={this.logout}>
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
                        <li><button onClick={this.logout}>Log out</button></li>
                    </ul>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        componentState: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);