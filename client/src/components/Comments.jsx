import React, { Component } from 'react';
// import InfiniteScroll from 'react-infinite-scroller';
// import axios from "axios";

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            hasMoreItems: true,
            nextHref: null
        };
        // this.loadItems = this.loadItems.bind(this);
    }

    componentDidMount() {
        console.log("loaded coment component");
    }

    //for infinity scroll get next portion
    // loadItems(page) {
    //     let self = this;
    //     //need to do request with start index and how many load (always same nbr)
    //     axios.get('comments.json')
    //         .then((res) => {
    //     console.log("res", res);

    //             if (res.data !== undefined && res.data !== null) {
    //                 let comments = [];
    //                 res.data.map((item) => {
    //                     comments.push(item);
    //                 })
    //                 self.setState({
    //                     comments: comments
    //                 })
    //             } else {
    //                 self.setState({
    //                     hasMoreItems: false
    //                 })
    //             }
    //         })
    // }

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
        return(
            <div className="comments">
                <h2>
                    Comments
                </h2>
                <div className="comment-action-box">
                    <div className="avatar">
                        <img src="https://static.thenounproject.com/png/214280-200.png" alt="my avatar"/>
                    </div>
                    <div className="comment-content">
                        <textarea name="comment-txt" rows="3" placeholder="Leave a comment" maxLength="240"></textarea>
                        <button type="submit">
                            Send
                        </button>
                    </div>
                </div>
                <div className="all-comments">
                    <div className="row">
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

                    <div className="row">
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

                    <div className="row my-comment">
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

                    <div className="row">
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
                {/* <div style={{height:'700px', overflow:'auto'}}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadItems}
                        hasMore={this.state.hasMoreItems}
                        loader={loader}>
                        <div className="all-comments">
                            {items}
                        </div>
                    </InfiniteScroll>
                </div> */}

            </div>
        )
    }

}

export default Comments;
