import React, { Component } from 'react';
import './style/signup.css';
import { NavLink } from 'react-router-dom';

class Signup extends Component {
    render() {
        return(
            <main className="signup-page">
                <header className="main-head">
                    <div className="main-head-logo">
                        <NavLink to="signin">
                            <img src="./pics/logo.png" alt="our logo" />
                            <p>hypertube</p>
                        </NavLink>
                    </div>
                    <div className="main-head-btn-holder">
                        <p className="main-head-btn-description">
                            Already registered?
                        </p>
                        <NavLink role="button" to="signin" className="main-head-btn">
                            Sign in
                        </NavLink>
                    </div>
                </header>
                <section className="signup-page-content">
                    <div className="back-s-u"></div>
                    <h1>
                        Hello. 
                        <NavLink to="signin">
                            Try Hypertube.
                        </NavLink>
                    </h1>
                    <h3>
                        The only legal online movie theatre in Unit Factory
                    </h3>
                    <div className="signup-form-holder">
                        <aside>
                            <img src="./pics/bg-crop.png" alt="flat movie icons"/>
                        </aside>
                        <div className="signup-form">
                            <form >
                                <div className="form-foreword">
                                    Register accoutn
                                </div>
                                <div className="form-error">
                                </div>
                                <div className="row">
                                    <div className="input-holder">
                                        <input type="text" placeholder="First Name" required id="name" />
                                    </div>
                                    <div className="input-holder">
                                        <input type="text" placeholder="Last Name" required id="lname" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-holder tooltip">
                                        <span className="tooltiptext">Minimum 5 characters</span>
                                        <input type="text" placeholder="Login" required id="login" />
                                        <label htmlFor="login">
                                            <i className="fa fa-user"></i>
                                        </label>
                                    </div>
                                    <div className="input-holder tooltip">
                                        <span className="tooltiptext pass">Minimum 7 characters, at least 1 number and uppercase letter</span>
                                        <input type="password" placeholder="Password" required id="pass" />
                                        <label className="input-icon" htmlFor="pass">
                                            <i className="fa fa-key"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-holder input-email tooltip">
                                        <span className="tooltiptext email">Please provide a real one, we will send you a confirmation link</span>
                                        <input type="email" placeholder="Email" required id="email" />
                                        <label className="input-icon" htmlFor="email">
                                            <i className="fa fa-envelope"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-holder form-button">
                                        <button className="form-btn-submit">Sign up</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="alternatieve">
                                        <h4>
                                            OR
                                        </h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <h4>
                                        Sign up with social network
                                    </h4>
                                </div>
                                <div className="row">
                                    <div className="social-media">
                                        <div>
                                            <i className="fab fa-facebook-square"></i>
                                        </div>
                                        <div>
                                            <i className="fab fa-twitter-square"></i>
                                        </div>
                                        <div className="fortytwo"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default Signup;