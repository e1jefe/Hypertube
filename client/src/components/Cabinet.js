import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../interface/style/cabinet.css';
import { Image, Icon, Input, List, Button } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

class Cabinet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: "",
            userData: {},
            posters: [],
            uploadedPhoto: "",
            chosePhotoStage: false,
            tmpPhoto: ""
        };
        // this.closeModal = this.closeModal.bind(this);
        this.confirmPhotoUpload = this.confirmPhotoUpload.bind(this);
        this.cancelPhotoUpload = this.cancelPhotoUpload.bind(this);
        this.changeInfo = this.changeInfo.bind(this);
        this.fileInput = React.createRef();
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
                                <div className="col-md-4" key={i} style={{marginTop: "5px"}}>
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

    changeInfo() {
        const data = {
            name: this.state.login,
            password: this.state.pass,
            password_confirmation: this.state.pass,
            firstname: this.state.fname,
            lastname: this.state.lname,
            email: this.state.email,
        };
        axios.post('http://localhost:8000/api/cabinet/change-info', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },

        })
    }

    imgFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
        
            reader.onload = e => {
                resolve(e.target.result);
            }
        
            reader.onerror = e => {
                console.error(e.target.error);
                reject(e.target.error);
            }
        
            reader.readAsDataURL(file);
        });
    }

    fileSelectionHandler = async event => {
        // console.log("file select");
        const upload = event.target.files[0];
        if (upload) {
            if (upload.type.includes('image')) {
                if (upload.size < 3190000) {
                    const tmpPhoto = await this.imgFileToBase64(upload);
                    this.setState({
                        uploadedPhoto: upload,
                        chosePhotoStage: true,
                        tmpPhoto: tmpPhoto
                    });
                } else {
                    iziToast.error({
                        title: 'Error',
                        message: this.props.componentState.intl.locale === "en" ? 'To big file size. Please choose up to 3 MB.' : 'Слишком большой размер файла. Пожалуйста, выберите другой файл, размером до 3 МБ.',
                        position: 'topCenter',
                        progressBar: false
                    });
                }
            } else {
                iziToast.error({
                    title: 'Error',
                    message: this.props.componentState.intl.locale === "en" ? 'You have uploaded an unsupported file type. Please select another one.' : 'Вы загрузили неподдерживаемый тип файла. Пожалуйста, выберите другой файл.',
                    position: 'topCenter',
                    progressBar: false
                });
            }
        } else {
            this.fileInput.current.value = "";
        }
    }

    confirmPhotoUpload() {
        console.log("confirm", this.state.uploadedPhoto);
        const data = {
            avatar: this.state.tmpPhoto.replace("+", " ")
        };
        // console.log("data", data);

        const token = localStorage.getItem('token');
        fetch('http://127.0.0.1:8000/api/cabinet/change-avatar', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    userData: res,
                    uploadedPhoto: "",
                    chosePhotoStage: false,
                    tmpPhoto: ""
                });
                this.fileInput.current.value = "";
            });
    }

    cancelPhotoUpload() {
        // console.log("cancel");
        this.setState({
            uploadedPhoto: "",
            tmpPhoto: "",
            chosePhotoStage: false
            // showModal: false
        });
        this.fileInput.current.value = "";
    }

    // closeModal() {
    //     this.setState({
    //         showModal: false
    //     });
    // }

    render() {
        // this.state.watchedFilms.map((mov, i) => console.log(mov));
        console.log("state", this.state);
        return (
            <div className="Cabinet container" >        
                <div className="avatar row" >
                    <div className="col-6 col-md-4">
                        <input
                            type="file"
                            style={{display: "none"}}
                            onChange={this.fileSelectionHandler}
                            ref={this.fileInput}
                        />
                        <Image
                            onClick={() => this.fileInput.current.click()}
                            fluid
                            label={{ as: 'a', color: 'red', corner: 'right', icon: 'save' }}
                            src={!this.state.chosePhotoStage ? this.state.userData.avatar !== undefined && this.state.userData.avatar !== null  ? "http://127.0.0.1:8000/" + this.state.userData.avatar : 'https://react.semantic-ui.com/images/wireframe/image.png' : this.state.tmpPhoto}
                        />
                        {
                            this.state.chosePhotoStage &&
                            <div style={{ marginTop: "5px"}}>
                                <Button negative onClick={this.cancelPhotoUpload}>
                                    {this.props.componentState.intl.locale === "en" ? "Cancel" : "Отменить"}
                                </Button>
                                <Button positive onClick={this.confirmPhotoUpload}>
                                    {this.props.componentState.intl.locale === "en" ? "Confirm" : "Подтвердить"}
                                </Button>
                            </div>
                        }
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
