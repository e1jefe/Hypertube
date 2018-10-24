import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../interface/style/cabinet.css';
import { Image, Icon, Input, List, Button} from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class Cabinet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: "",
            userData: {},
            posters: []
        };
    }

    async getPosters(films) {
        const promises = [];
        films.forEach(element => {
            promises.push(axios.get('https://yts.am/api/v2/movie_details.json?movie_id=' + element.id_film));
        });
        const responses = await Promise.all(promises);
        const posters = [];
        responses.forEach(response => {
            posters.push(response.data.data.movie.large_cover_image);
        });
        return posters;
    }

    
    async componentDidMount() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            this.setState({ isLoading: true });
            let userInfo = await fetch('http://127.0.0.1:8000/api/auth/user', {
                method: 'GET',
                headers:{
                    'Authorization': 'Bearer ' + token
                }
            });
            userInfo = await userInfo.json();

            let films = await fetch('http://127.0.0.1:8000/api/cabinet/watched-films_return', {
                method: 'POST',
                headers:{
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            films = await films.json();
            const posters = await this.getPosters(films);

            this.setState({
                posters,
                userData: userInfo,
                isLoading: false
            });
        } else {
            this.props.history.push('/signin');
        }
    }

    renderLastSeen(posters) {
        return (
            <div className="lastSeen row">
                {
                    posters.length !== 0 ?
                        posters.map((mov, i) => {
                            return (
                                <div className="col-md-4" key={i}>
                                    <Image src={mov ? mov : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
                                </div>
                            )
                        })
                        :
                        <div>
                            <FormattedMessage id="cabinet.noWatch" defaultMessage="You have not watch anything yeat" />
                        </div>
                }
            </ div>
        );
    }

    render() {
        // this.state.watchedFilms.map((mov, i) => console.log(mov));
        // console.log("watchedFilms", this.state.watchedFilms);
        return (
            <div className="Cabinet container" >
                <div className="avatar row" >
                    <div className="col-6 col-md-4">
                        <Image
                            fluid
                            label={{ as: 'a', color: 'red', corner: 'right', icon: 'save' }}
                            src={this.state.userData.avatar !== null ? this.state.userData.avatar : './pics/duck.png'}
                        />
                    </div>
                    <div className="col-6 col-md-4">
                    <List>
                        <List.Item icon='user' content={this.state.userData.name} />
                        <List.Item icon='user' content={this.state.userData.firstname + " " + this.state.userData.lastname} />
                        <List.Item
                            icon='mail'
                            content={this.state.userData.email}
                        />
                    </List>
                    </div>
                    <div className="infoUser col-6 col-md-3">
                        <Input iconPosition='left' placeholder='Email'>
                            <Icon name='at' />
                            <input />
                        </Input>
                        <Input iconPosition='left' placeholder={this.props.componentState.intl.locale === "en" ? 'Username' : 'Имя пользователя'}>
                            <Icon name='user' />
                            <input />
                        </Input>
                        <Input iconPosition='left' placeholder={this.props.componentState.intl.locale === "en" ? 'Firstname' : 'Имя'}>
                            <Icon name='address book' />
                            <input />
                        </Input>
                        <Input iconPosition='left' placeholder={this.props.componentState.intl.locale === "en" ? 'Lastname' : 'Фамилия'}>
                            <Icon name='address book' />
                            <input />
                        </Input>
                        <Button>
                            <FormattedMessage id="cabinet.changeInfoBtn" defaultMessage="Change info" />
                        </Button>
                        <Input iconPosition='left' placeholder={this.props.componentState.intl.locale === "en" ? 'Password' : 'Пароль'}>
                            <Icon name='privacy' />
                            <input />
                        </Input>
                        <Input iconPosition='left' placeholder={this.props.componentState.intl.locale === "en" ? 'Password confirmation' : 'Подтверждение пароля'}>
                            <Icon name='privacy' />
                            <input />
                        </Input>
                        <Button>
                            <FormattedMessage id="cabinet.changePassBtn" defaultMessage="Change password" />
                        </Button>
                    </div>
                </div>
                <div className="Seen">
                    { this.renderLastSeen(this.state.posters) }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        componentState: state
    };
};

export default connect(mapStateToProps, null)(Cabinet);
