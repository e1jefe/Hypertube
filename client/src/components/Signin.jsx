import React, { Component } from 'react';
import './style/signin.css';
import { NavLink } from 'react-router-dom';

class Signin extends Component {
    render() {
        return(
            <main className="signin-page">
                <header className="main-head">
                    <div className="main-head-logo">
                        <NavLink to="signin">
                            <img src="./pics/logo.png" alt="our logo" />
                            <p>hypertube</p>
                        </NavLink>
                    </div>
                    <div className="main-head-btn-holder">
                        <p className="main-head-btn-description">
                            Need an account?
                        </p>
                        <NavLink role="button" to="signup" className="main-head-btn">
                            Sign up
                        </NavLink>
                    </div>
                </header>
                <section className="signin-page-content">
                    <div className="back-s-u"></div>
                    <h1>
                        Hello. 
                        <NavLink to="signup">
                            Try Hypertube.
                        </NavLink>
                    </h1>
                    <h3>
                        The only legal online movie theatre in Unit Factory
                    </h3>
                    <div className="signin-form-holder">
                        <aside>
                            <img src="./pics/bg-crop.png" alt="flat movie icons"/>
                        </aside>
                        <div className="signin-form">
                            <form >
                                <div className="form-foreword">
                                    Sign in with login
                                </div>
                                <div className="form-error">
                                </div>
                                <div className="row">
                                    <div className="input-holder">
                                        <input type="text" placeholder="Login" required id="login" />
                                        <label htmlFor="login">
                                            <i className="fa fa-user"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-holder">
                                        <input type="password" placeholder="Password" required id="pass" />
                                        <label className="input-icon" htmlFor="pass">
                                            <i className="fa fa-key"></i>
                                        </label>
                                        <NavLink to="resetpass" className="reset-pass">
                                            Forgot?
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-holder form-button">
                                        <button className="form-btn-submit">Sign in</button>
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
                                        Sign in with social network
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

export default Signin;