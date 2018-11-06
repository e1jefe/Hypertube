import React, { Component } from 'react';
import OtherUserProfile from './OtherUserProfile';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            commentsToShow: [],
            start: 0,
            hasMore: true,
            comCount: 0,
            showOtherUserProfile: false,
            otherId: "",
            user: props.master,
            avatar: props.avatar,
            otherUser: {},
            commentTxt: ""
        };
        this.showOtherUser = this.showOtherUser.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.delComments = this.delComments.bind(this);
        this.recordComment = this.recordComment.bind(this);
        this.postNewComment = this.postNewComment.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.loadNewCommentsPack = this.loadNewCommentsPack.bind(this);
    }

    componentDidMount() {
        const data = {
            id_film: this.props.movid
        };
        const token = localStorage.getItem('token');
        if (token !== null) {
            this._mount = true;
            fetch('http://127.0.0.1:8000/api/comments/all-comments', {
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
                    if (!this._mount) {
                        return ;
                    }
                    const newState = {
                        user: this.props.master,
                        comments: res.slice(0, res.length),
                        commentsToShow: res.slice(0, 5),
                        start: 5,
                        comCount: res.length 
                    }
                    this.setState(newState);
                });
        } else {
            this.props.history.push('/signin');
        }
        window.addEventListener('scroll', this.handleScroll);
    }

    showOtherUser(event) {
        let otherUser = {};
        for (let i = 0; i < this.state.comments.length; i++ ) {
            if (this.state.comments[i].id_user === event.currentTarget.getAttribute('userid')) {

                otherUser = this.state.comments[i];
                break;
            }
        }
        this.setState({
            showOtherUserProfile: true,
            otherId: event.currentTarget.getAttribute('userid'),
            otherUser: {
                login: otherUser.name,
                ava: otherUser.avatar,
                name: otherUser.firstname + " " + otherUser.lastname,
            }
        })
    }

    closeModal() {
        this.setState({
            showOtherUserProfile: false
        })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.master !== state.user) {
            return {
                user: props.master,
                avatar: props.avatar
            };
        }
        return null;
    }

    delComments(e) {
        e.preventDefault();
        const commentId = e.currentTarget.getAttribute('commentid');
        const token = localStorage.getItem('token');
        const data = {
            id_comment: commentId
        }
        fetch('http://127.0.0.1:8000/api/comments/delete-comment', {
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
                if (!this._mount) {
                    return ;
                }
                if (res === true) {
                    const newComLength = this.state.comCount - 1;
                    let commentsNew = this.state.comments.map((com) => {
                            if (com.id !== parseInt(commentId, 10)) {
                                return (com);
                            }
                            return null;
                        }
                    );
                    commentsNew = commentsNew.filter(function(el) { return el; });
                    let commentsToShowNew = this.state.commentsToShow.map((com) => {
                        if (com.id !== parseInt(commentId, 10)) {
                            return (com);
                        }
                        return null;
                    }
                );
                commentsToShowNew = commentsToShowNew.filter(function(el) { return el; });
                    this.setState({
                        comments: commentsNew,
                        comCount: newComLength,
                        commentsToShow: commentsToShowNew
                    });
                }
            });
    }

    recordComment(e) {
        e.preventDefault();
        this.setState({
            commentTxt: e.currentTarget.value
        })
    }

    postNewComment(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = {
            id_film: this.props.movid,
            comment: this.state.commentTxt
        }
        fetch('http://127.0.0.1:8000/api/comments/create-comment', {
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
                if (!this._mount) {
                    return ;
                }
                let newComments = this.state.comments;
                let newCommentsToShow = this.state.commentsToShow;
                if (res !== false) {
                    const newLength = this.state.comCount + 1;
                    newComments.push(res);
                    let check = true;
                    if (!this.state.hasMore) {
                        newCommentsToShow.push(res);
                        check = false;
                    }
                    this.setState({
                        comments: newComments,
                        comCount: newLength,
                        commentTxt: "",
                        hasMore: check,
                        commentsToShow: newCommentsToShow
                    })
                }
            });
    }

    handleScroll() {
        if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight ) {
            this.loadNewCommentsPack();
        }
    }

    loadNewCommentsPack() {
        if (this.state.hasMore) {
            const start = this.state.start;
            const newPack = this.state.commentsToShow.concat(this.state.comments.slice(start, start + 5));
            const check = newPack.length < this.state.comments.length;
            this.setState({
                commentsToShow: newPack,
                start: start + 5,
                hasMore: check
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);
        this._mount = false;
    }

    render() {
        return(
            <div className="comments">
                {
                    this.state.showOtherUserProfile &&
                    <OtherUserProfile propfile={this.state.otherUser} id={this.state.otherId} show={this.state.showOtherUserProfile} closeModal={this.closeModal}/>
                }
                <h2>
                    <FormattedMessage id="сomments.title" defaultMessage="Comments" />
                </h2>
                <div className="comment-action-box">
                    <div className="avatar">
                        <img src={this.state.avatar !== undefined && this.state.avatar !== null ? 'http://127.0.0.1:8000/' + this.state.avatar : "https://static.thenounproject.com/png/214280-200.png"} alt="my avatar"/>
                    </div>
                    <div className="comment-content">
                        <textarea name="comment-txt" rows="3" placeholder={this.props.componentState.intl.locale === 'en' ? "Leave a comment" : "Оставить комментарий"} maxLength="240" onChange={this.recordComment} value={this.state.commentTxt}></textarea>
                        <button type="submit" onClick={this.postNewComment} disabled={this.state.commentTxt === ""}>
                            <FormattedMessage id="сomments.sendbtn" defaultMessage="Send" />
                        </button>
                    </div>
                </div>
                <div className="all-comments">
                    {
                        this.state.comCount !== 0 ?
                        this.state.commentsToShow.map((msg, i) => {
                            const name = msg.firstname !== null ? msg.firstname : "";
                            const surname = msg.lastname !== null ? msg.lastname : "";
                            const finalName = /^\s+$/.test(name + " " + surname) ? msg.name : name + " " + surname;
                            return (
                                <div key={i} className={parseInt(msg.id_user, 10) === this.state.user ? "my-row my-comment" : "my-row"}>
                                    <div className="avatar" userid={msg.id_user} onClick={parseInt(msg.id_user, 10) === this.state.user ? undefined : this.showOtherUser}>
                                        <img src={(msg.avatar !== undefined && msg.avatar !== null) ? 'http://127.0.0.1:8000/' + msg.avatar : "../pics/avatar.png"} alt="my avatar"/>
                                    </div>
                                    <div className="details">
                                        <div className="info">
                                            <div className="author" userid={msg.id_user} onClick={parseInt(msg.id_user, 10) === this.state.user ? undefined : this.showOtherUser}>
                                                {finalName}
                                            </div>
                                            <div className="time-stamp">
                                                {msg.updated_at.substring(0, 16)}
                                            </div>
                                        </div>
                                        <div className="content">
                                            {msg.comment}
                                        </div>
                                    </div>
                                    {this.state.user === parseInt(msg.id_user, 10) ? 
                                        <button commentid={msg.id} onClick={this.delComments}>
                                            <p>
                                                <i className="fas fa-trash-alt"></i>
                                            </p>
                                        </button>
                                        :
                                        null
                                    }
                                </div>
                            )
                        })
                        :
                        <div className="my-row">
                            <div style={{margin: "0 auto", padding: '10px'}}>
                                <FormattedMessage id="movie.firstComment" defaultMessage="Be first who comment it" />
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        componentState: state
    };
};

export default connect(mapStateToProps, null)(Comments);
