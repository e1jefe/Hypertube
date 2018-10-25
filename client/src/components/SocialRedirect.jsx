import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { updateIntl } from 'react-intl-redux';

class SignupConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lang: props.componentState.intl.locale,
            errors: ""
        };
        this.redirectSignin = this.redirectSignin.bind(this);
    }

    componentDidMount() {
        localStorage.setItem('token', this.props.match.params.token);
        this.redirectSignin();
    }

    redirectSignin() {
        this.props.history.push('/signin');
    }

    render() {
        return(
            <main className="reset-page">
                <header className="main-head">
                    <div className="main-head-logo">
                        <NavLink to="signin">
                            <img src="../pics/logo.png" alt="our logo" />
                            <p>hypertube</p>
                        </NavLink>
                    </div>
                    <div className="language-holder">
                        <span className="language-option">
                            <button onClick={() => this.changeLanguage('ru')} className={this.state.lang !== 'ru' ? "disabled" : null}>
                                RU
                            </button>
                        </span>
                        <button onClick={() => this.changeLanguage('en')} className={this.state.lang !== 'en' ? "disabled" : null}>
                            EN
                        </button>
                    </div>
                    <div className="main-head-btn-holder">
                        <p className="main-head-btn-description">
                            <FormattedMessage id="reset.account" defaultMessage="Already registered?" />
                        </p>
                        <button className="main-head-btn" onClick={this.redirectSignin}>
                            <FormattedMessage id="reset.signin" defaultMessage="Sign in" />
                        </button>
                    </div>
                </header>
                <div>
                    {
                        this.state.errors.length !== 0 ?
                            (
                                <div>
                                    <p style={{textAlign: "center"}}>
                                        {this.state.errors}
                                    </p>
                                    <img src="../pics/duck.png" alt="confused duck" style={{display: "block", width: "25%", margin: "5px auto"}}/>
                                </div>
                            )
                            :
                            null
                    }
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        componentState: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateIntl: obj => dispatch(updateIntl(obj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupConfirm);