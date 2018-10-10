import React, { Component } from 'react';
import '../interface/style/signup.css';
import { NavLink } from 'react-router-dom';
import request from 'superagent';
import axios from 'axios';


class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            login: "",
            pass: "",
            email: "",
            error: ""
        };
        this.onChange = this.onChange.bind(this);        
        this.signupRequest = this.signupRequest.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    signupRequest(event) {      
        event.preventDefault();
        const data = {
            // login: this.state.login,
            password: this.state.pass,
            password_confirmation: this.state.pass,
            name: this.state.fname + " " + this.state.lname,
            email: this.state.email,
        };
        // console.log(data);
        // request
        //     .post('http://127.0.0.1:8000/api/auth/signup')
        //     .send(data) // sends a JSON post body
        //     .set('Content-Type', 'application/json')
        //     .set('X-Requested-With', 'XMLHttpRequest')
        //     .end((err, res) => {
        //         alert(res.body.message);
        //         if (res.body.errors !== undefined) {
        //             for (let error in res.body.errors) {
        //                 console.log(res.body.errors[error][0]);
        //             }
        //         }
        //         // Calling the end function will send the request
        //     });
        // fetch('http://127.0.0.1:8000/api/auth/signup', {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers:{
        //         'Content-Type': 'application/json',
        //         'X-Requested-With': 'XMLHttpRequest'
        //     }
        // }).then((res) => res.json())
        // .then((responce) => console.log(responce.body));
        axios({ method: 'POST', url: 'http://127.0.0.1:8000/api/auth/signup', headers: {'Content-Type': "application/json", 'X-Requested-With': "XMLHttpRequest"}, data: data }).then((res) => console.log(res)).catch((errors) => console.log(errors));

    }

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
                            <form onSubmit={this.signupRequest}>
                                <div className="form-foreword">
                                    Register accoutn
                                </div>
                                {
                                    this.state.error && 
                                    <div className="form-error">
                                    </div>
                                }
                                <div className="row">
                                    <div className="input-holder">
                                        <input type="text" placeholder="First Name" required id="fname" onChange={this.onChange} name="fname"/>
                                    </div>
                                    <div className="input-holder">
                                        <input type="text" placeholder="Last Name" required id="lname" onChange={this.onChange} name="lname"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-holder tooltip-castom">
                                        <span className="tooltiptext">Minimum 5 characters</span>
                                        <input type="text" placeholder="Login" required id="login" onChange={this.onChange} name="login"/>
                                        <label htmlFor="login">
                                            <i className="fa fa-user"></i>
                                        </label>
                                    </div>
                                    <div className="input-holder tooltip-castom">
                                        <span className="tooltiptext pass">Minimum 7 characters, at least 1 number and uppercase letter</span>
                                        <input type="password" placeholder="Password" required id="pass" onChange={this.onChange} name="pass"/>
                                        <label className="input-icon" htmlFor="pass">
                                            <i className="fa fa-key"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-holder input-email tooltip-castom">
                                        <span className="tooltiptext email">Please provide a real one, we will send you a confirmation link</span>
                                        <input type="email" placeholder="Email" required id="email" onChange={this.onChange} name="email"/>
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