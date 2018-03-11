import React from 'react';
import ReactDOM from 'react-dom';
//var axios = require('axios');

import './App.css';

import Message from './Message.js';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: [{
                username: "Awanish",
                content: <p>Hi Awanish!</p>,
                img: "https://pixel77.com/wp-content/uploads/2014/11/20-Creative-Chat-Logo-Designs-1.jpg",
            }],
			responseMess:""
        };

        this.submitMessage = this.submitMessage.bind(this);
		this.loadResponse = this.loadResponse.bind(this);
    }

    componentDidMount() {
		console.log("Chatroom->componentDidMount()");
        this.scrollToBot();
    }

    componentDidUpdate() {
		console.log("Chatroom->componentDidUpdate()");
        this.scrollToBot();
    }

    scrollToBot() {
		console.log("Chatroom->scrollToBot()");
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

	loadResponse(e) {
		var mess;
		console.log("Chatroom->loadResponse()");
		var url='https://api.github.com/users/'+this.refs.msg;
		console.log ("url "+url);
		fetch(url).then(results => {
		//fetch('https://api.github.com/users/abhaybharti').then(results => {
			return results.json();
		}).then(data=>{
			console.log("Data - "+data);
			//console.log("json Response - "+  JSON.stringify(data));
	//		console.log("json Response - "+  data.name);
			this.state.responseMess = data.name;
			
		})
		console.log("mess- "+  this.state.responseMess);
			
        this.setState({
            chats: this.state.chats.concat([{
                username: "Awanish",
                content: <p>{ReactDOM.findDOMNode(this.refs.msg).value+this.state.responseMess}</p>,
				img: "https://pixel77.com/wp-content/uploads/2014/11/20-Creative-Chat-Logo-Designs-1.jpg",
            }])
        });
    }
	
    submitMessage(e) {
		console.log("Chatroom->submitMessage()");
        e.preventDefault();

        this.setState({
            chats: this.state.chats.concat([{
                username: "Awanish",
                content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
                img: "https://pixel77.com/wp-content/uploads/2014/11/20-Creative-Chat-Logo-Designs-1.jpg",
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
		this.loadResponse(e);
    }
	
	

    render() {
        const username = "Kevin Hsu";
        const { chats } = this.state;

        return (
            <div className="chatroom">
                <h3>Chat Messenger</h3>
                <ul className="chats" ref="chats">
                    {
				            chats.map((chat) => 
                            <Message chat={chat} user={username} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Chatroom;