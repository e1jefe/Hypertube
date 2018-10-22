import React, { Component } from 'react';
import OtherUserProfile from './OtherUserProfile';
import { FormattedMessage } from 'react-intl';

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            hasMoreItems: true,
            nextHref: null,
            showOtherUserProfile: false,
            otherId: ""
        };
        // this.loadItems = this.loadItems.bind(this);
        this.showOtherUser = this.showOtherUser.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        console.log("loaded coment component");
        const data = {
            id_film: this.props.movid
        };
        const token = localStorage.getItem('token');
        if (token !== null) {
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
                    console.log("all coments");
                })
        } else {
            this.props.history.push('/signin');
        }
    }

    showOtherUser(event) {
        console.log("userId", event.currentTarget.getAttribute('userid'));
        this.setState({
            showOtherUserProfile: true,
            otherId: event.currentTarget.getAttribute('userid')
        })
    }

    closeModal() {
        this.setState({
            showOtherUserProfile: false
        })
    }

    render() {
        // const loader = <div className="loader">Loading ...</div>;
        // let items = [];
        // this.state.comments.map((comment, i) => {
        //     items.push(
        //         <div className="row" key={i}>
        //             <div className="avatar">
        //                 <img src={comment.avatar} alt="my avatar"/>
        //             </div>
        //             <div className="details">
        //                 <div className="info">
        //                     <div className="author">
        //                         {comment.author}
        //                     </div>
        //                     <div className="time-stamp">
        //                         {comment.timeStamp}
        //                     </div>
        //                 </div>
        //                 <div className="content">
        //                     {comment.text}
        //                 </div>
        //             </div>
        //         </div>
        //     );
        // });
        const userId = 11;
        return(
            <div className="comments">
                {
                    this.state.showOtherUserProfile &&
                    <OtherUserProfile id={this.state.otherId} show={this.state.showOtherUserProfile} closeModal={this.closeModal}/>
                }
                <h2>
                    <FormattedMessage id="сomments.title" defaultMessage="Comments" />
                </h2>
                <div className="comment-action-box">
                    <div className="avatar">
                        <img src="https://static.thenounproject.com/png/214280-200.png" alt="my avatar"/>
                    </div>
                    <div className="comment-content">
                        <textarea name="comment-txt" rows="3" placeholder="Leave a comment" maxLength="240"></textarea>
                        <button type="submit">
                            <FormattedMessage id="сomments.sendbtn" defaultMessage="Send" />
                        </button>
                    </div>
                </div>
                <div className="all-comments">
                    <div className="my-row">
                        <div className="avatar" userid={userId} onClick={this.showOtherUser}>
                            <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" alt="my avatar"/>
                        </div>
                        <div className="details">
                            <div className="info">
                                <div className="author" userid={userId} onClick={this.showOtherUser}>
                                    Some Person
                                </div>
                                <div className="time-stamp">
                                    20/01/2018 21:54
                                </div>
                            </div>
                            <div className="content">
                                So I loved it, though the ending is also a bit of an anti-climax, but only perhaps because I was expecting something bigger. Still, it's p***-funny and that's the main thing.
                            </div>
                        </div>
                    </div>

                    <div className="my-row">
                        <div className="avatar">
                            <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" alt="my avatar"/>
                        </div>
                        <div className="details">
                            <div className="info">
                                <div className="author">
                                    Some Person
                                </div>
                                <div className="time-stamp">
                                    20/01/2018 21:54
                                </div>
                            </div>
                            <div className="content">
                                So I loved it, though the ending is also a bit of an anti-climax, but only perhaps because I was expecting something bigger. Still, it's p***-funny and that's the main thing.
                            </div>
                        </div>
                    </div>

                    <div className="my-row my-comment">
                        <div className="avatar">
                            <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" alt="my avatar"/>
                        </div>
                        <div className="details">
                            <div className="info">
                                <div className="author">
                                    Some Person
                                </div>
                                <div className="time-stamp">
                                    20/01/2018 21:54
                                </div>
                            </div>
                            <div className="content">
                                So I loved it, though the ending is also a bit of an anti-climax, but only perhaps because I was expecting something bigger. Still, it's p***-funny and that's the main thing.
                            </div>
                        </div>
                    </div>

                    <div className="my-row">
                        <div className="avatar">
                            <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" alt="my avatar"/>
                        </div>
                        <div className="details">
                            <div className="info">
                                <div className="author">
                                    Some Person
                                </div>
                                <div className="time-stamp">
                                    20/01/2018 21:54
                                </div>
                            </div>
                            <div className="content">
                                So I loved it, though the ending is also a bit of an anti-climax, but only perhaps because I was expecting something bigger. Still, it's p***-funny and that's the main thing.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Comments;
