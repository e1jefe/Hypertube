import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../interface/style/cabinet.css';
import {Image, Icon, Input, List, Button, Modal, Header, Loader} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Cabinet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: "",
            userData: {},
            posters: [],
            uploadedPhoto: "",
            chosePhotoStage: false,
            tmpPhoto: "",
            showModal: false
        };
        this.confirmPhotoUpload = this.confirmPhotoUpload.bind(this);
        this.cancelPhotoUpload = this.cancelPhotoUpload.bind(this);
        this.changeInfo = this.changeInfo.bind(this);
        this.changePass = this.changePass.bind(this);
        this.fileInput = React.createRef();
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        if (token !== null && token !== "") {
            this.setState({isLoading: true});
            this._mount = true;
            fetch('http://127.0.0.1:8000/api/auth/user', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((res) => res.json())
            .then((res) => {
                if (this._mount) {
                    this.setState({
                        userData: res
                    });
                }
            });

            fetch('http://127.0.0.1:8000/api/cabinet/watched-films_return', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    if (this._mount) {
                        this.setState({
                            posters: res,
                            isLoading: false
                        });
                    }
                });
        } else {
            this.props.history.push('/signin');
        }
    }

    componentWillUnmount() {
        this._mount = false;
    }

    renderLastSeen(posters) {
        return (
            <div className="lastSeen row">
                <Loader active={this.state.isLoading} inline='centered' />
                {
                    posters.length !== 0 ?
                        posters.map((mov, i) => {
                            return (
                                <div className="col-md-4" key={i} style={{marginTop: "5px"}}>
                                    <Image
                                        src={mov ? mov : 'https://react.semantic-ui.com/images/wireframe/image.png'}/>
                                </div>
                            )
                        })
                        :
                        this.state.isLoading === false ?
                            <div style={{width: "100%"}}>
                                <FormattedMessage id="cabinet.noWatch" defaultMessage="You have not watch anything yeat"/>
                            </div>
                            :
                            null
                }
            </ div>
        );
    }

    changeInfo() {
        const token = localStorage.getItem('token');
        const data = {
            name: this.state.name === "" ? undefined : this.state.name,
            firstname: this.state.firstname === "" ? undefined : this.state.firstname,
            lastname: this.state.lastname === "" ? undefined : this.state.lastname,
            email: this.state.email === "" ? undefined : this.state.email,
        }
            fetch('http://localhost:8000/api/cabinet/change-info', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }) 
            .then((res) => {
                    if (res.status !== 422) {
                        return res.json();
                    } else {
                        const msg = this.props.componentState.intl.locale === "en" ? 'Please check entered data' : 'Проверьте, пожалуйста, корректность введенных данных';
                        toast.error(msg, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
                        return false;
                    }
            })
            .then((response) => {
                if (this._mount) {
                    if (response !== false) {
                        this.setState({
                            userData: response
                        })
                    } 
                }
            })
    }

    changePass() {
        const token = localStorage.getItem('token');
        const data = {
            password: this.state.pass,
            password_confirmation: this.state.pass_rep,
        };
        fetch('http://localhost:8000/api/cabinet/change-pass', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((res) => res.json())
            .then((responce) => {
                if (this._mount) {
                    if (responce.errors) {
                        const msg = this.props.componentState.intl.locale === "en" ? 'Please check entered data' : 'Проверьте, пожалуйста, корректность введенных данных';
                        toast.error(msg, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
                    }
                }
            });
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
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
                    const msg = this.props.componentState.intl.locale === "en" ? 'To big file size. Please choose up to 3 MB.' : 'Слишком большой размер файла. Пожалуйста, выберите другой файл, размером до 3 МБ.';
                    toast.error(msg, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
            } else {
                const msg = this.props.componentState.intl.locale === "en" ? 'You have uploaded an unsupported file type. Please select another one.' : 'Вы загрузили неподдерживаемый тип файла. Пожалуйста, выберите другой файл.';
                toast.error(msg, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else {
            this.fileInput.current.value = "";
        }
    }

    confirmPhotoUpload() {
        const data = {
            avatar: this.state.tmpPhoto.replace("+", " ")
        };
        const token = localStorage.getItem('token');
        fetch('http://127.0.0.1:8000/api/cabinet/change-avatar', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (this._mount) {
                    this.setState({
                        userData: res,
                        uploadedPhoto: "",
                        chosePhotoStage: false,
                        tmpPhoto: "",
                        showModal: true
                    });
                    this.fileInput.current.value = "";
                }
            });
    }

    cancelPhotoUpload() {
        this.setState({
            uploadedPhoto: "",
            tmpPhoto: "",
            chosePhotoStage: false
        });
        this.fileInput.current.value = "";
    }

    donate() {
        this.setState({
            showModal: false
        })
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    render() {
        let realName = "";
        realName = this.state.userData.firstname !== null ? realName + this.state.userData.firstname : realName;
        realName = this.state.userData.lastname !== null ? realName + " " + this.state.userData.lastname : realName;

        return (
            <div className="Cabinet container" >
                <ToastContainer autoClose={5000} position="top-center" hideProgressBar={true}/>
                <Modal basic open={this.state.showModal}>
                    <Header>
                        <Icon name='archive' style={{display: "inline"}}/>
                        <FormattedMessage id="cabinet.modal_title" defaultMessage="Thankfulness"/>
                    </Header>
                    <Modal.Content>
                        <p>
                            <FormattedMessage id="cabinet.modal_description" defaultMessage="Please consider some donation to our team if you enjoied our application. We will application that."/>
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={this.closeModal.bind(this)}>
                            <Icon name='remove' />
                            <FormattedMessage id="cabinet.modal_decline" defaultMessage="No"/>
                        </Button>
                        <Button color='green' inverted onClick={this.donate.bind(this)}>
                            <a href="https://send.monobank.ua/2DZdX7mZA" target="blank" style={{color: "#fff"}}>
                                <Icon name='checkmark'/>
                                <FormattedMessage id="cabinet.modal_confirm" defaultMessage="Yes"/>
                            </a>
                        </Button>
                    </Modal.Actions>
                </Modal>
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
                            label={{as: 'a', color: 'red', corner: 'right', icon: 'save'}}
                            src={!this.state.chosePhotoStage ? this.state.userData.avatar !== undefined && this.state.userData.avatar !== null ? "http://127.0.0.1:8000/" + this.state.userData.avatar : 'https://react.semantic-ui.com/images/wireframe/image.png' : this.state.tmpPhoto}
                        />
                        {
                            this.state.chosePhotoStage &&
                            <div style={{marginTop: "5px"}}>
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
                            <List.Item icon='user' content={this.state.userData.name}/>
                            {(this.state.userData.firstname !== null || this.state.userData.lastname !== null) &&
                                <List.Item icon='user'
                                       content={realName}/>
                            }
                            <List.Item
                                icon='mail'
                                content={this.state.userData.email}
                            />
                        </List>
                    </div>
                    <div className="infoUser col-6 col-md-3">
                        {this.state.userData.provider === null &&
                            <Input iconPosition='left' placeholder='Email'>
                                <Icon name='at'/>
                                <input name="email" onChange={this.changeHandler} maxLength="150"/>
                            </Input>
                        }
                        <Input iconPosition='left'
                               placeholder={this.props.componentState.intl.locale === "en" ? 'Username' : 'Имя пользователя'}>
                            <Icon name='user'/>
                            <input name="name" onChange={this.changeHandler} maxLength="150"/>
                        </Input>
                        <Input iconPosition='left'
                               placeholder={this.props.componentState.intl.locale === "en" ? 'Firstname' : 'Имя'}>
                            <Icon name='address book'/>
                            <input name="firstname" onChange={this.changeHandler} maxLength="150"/>
                        </Input>
                        <Input iconPosition='left'
                               placeholder={this.props.componentState.intl.locale === "en" ? 'Lastname' : 'Фамилия'}>
                            <Icon name='address book'/>
                            <input name="lastname" onChange={this.changeHandler} maxLength="150"/>
                        </Input>
                        <Button onClick={this.changeInfo} className="my-cabinet-btn">
                            <FormattedMessage id="cabinet.changeInfoBtn" defaultMessage="Change info"/>
                        </Button>
                        {this.state.userData.provider === null &&
                            <div>
                                <Input iconPosition='left'
                                    placeholder={this.props.componentState.intl.locale === "en" ? 'Password' : 'Пароль'}>
                                    <Icon name='privacy'/>
                                    <input name="pass" onChange={this.changeHandler} maxLength="150"/>
                                </Input>
                                <Input iconPosition='left'
                                    placeholder={this.props.componentState.intl.locale === "en" ? 'Password confirmation' : 'Подтверждение пароля'}>
                                    <Icon name='privacy'/>
                                    <input name="pass_rep" onChange={this.changeHandler} maxLength="150"/>
                                </Input>
                                <Button onClick={this.changePass} className="my-cabinet-btn">
                                    <FormattedMessage id="cabinet.changePassBtn" defaultMessage="Change password"/>
                                </Button>
                            </div>
                        }
                    </div>
                </div>
                <div className="Seen">
                    {this.renderLastSeen(this.state.posters)}
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
