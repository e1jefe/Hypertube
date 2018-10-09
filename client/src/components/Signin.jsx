import React, { Component } from 'react';
import '../interface/style/signin.css';
import { NavLink } from 'react-router-dom';

class Signin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            pass: "",
            error: ""
        };
        this.onChange = this.onChange.bind(this);        
        this.signinRequest = this.signinRequest.bind(this);
    }

    signinRequest(event) {      
        event.preventDefault();
        const data = {
            login: this.state.login,
            pass: this.state.pass
        };
        console.log(data);
        // fetch('/api/form-submit-url', {
        //     method: 'POST',
        //     body: data,
        // });
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

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
                    <div className="language-holder">
                        <span className="language-option">
                            <NavLink role="button" to="EN" >
                                EN
                            </NavLink>
                        </span>
                        <NavLink role="button" to="RU" className="disabled">
                            RU
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
                        <NavLink to="signup" style={{marginLeft: "15px"}}>
                            Try Hypertube. 
                        </NavLink>
                    </h1>
                    <h3 >
                        The only legal online movie theatre in Unit Factory
                    </h3>
                    <div className="signin-form-holder">
                        <aside>
                            <img src="./pics/bg-crop.png" alt="flat movie icons"/>
                        </aside>
                        <div className="signin-form">
                            <form onSubmit={this.signinRequest}>
                                <div className="form-foreword">
                                    Sign in with login
                                </div>
                                {
                                    this.state.error && 
                                    <div className="form-error">
                                    </div>
                                }
                                <div className="row">
                                    <div className="input-holder">
                                        <input type="text" placeholder="Login" required id="login" name="login" onChange={this.onChange}/>
                                        <label htmlFor="login">
                                            <i className="fa fa-user"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-holder">
                                        <input type="password" placeholder="Password" required id="pass" name="pass" onChange={this.onChange}/>
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