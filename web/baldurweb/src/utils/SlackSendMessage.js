import React, { Component } from 'react'
import { fetchApi } from "./restMethods.js"
import '../App.css';
import Parser from 'html-react-parser';

var config = require('../config/bragi.config.json');

class SlackSendMessage extends Component {
	constructor(props) {
		super(props)
		this.state = { usersDestination: "null", channelsDestination: "null" };

		fetchApi("/slack/getUsers").then((result) => {
			this.setState({ usersDestination: result });
		});

		fetchApi("/slack/getChannels").then((result) => {
			this.setState({ channelsDestination: result });
		});
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		//CE5J60664
		console.log("Mandando: ");
		console.log(event.target[0].value);
		console.log(event.target[1].value);

		fetch(config.url_api + '/slack/sendMsg', {
			method: 'post',
			headers: {
				'Accept': 'text/plain',
    			'Content-Type': 'text/plain'
			  },
			body: JSON.stringify({
				channel: event.target[0].value,
				mensaje: event.target[1].value,
			  })
		});
	}

	createDropDown(props){
		
		var html = '<select name="channel">';

		for(var i= 0;i < this.state.usersDestination.length; i++){
			html+='<option value="' + this.state.usersDestination[i].id +'">' +this.state.usersDestination[i].name +'</option>';
		}

		for(var i= 0;i < this.state.channelsDestination.length; i++){
			html+='<option value="' + this.state.channelsDestination[i].id +'">' +this.state.channelsDestination[i].name +'</option>';
		}
		html +="</select>";
		return html;
	}

	render() {
		return (
			<div>
				<header className="App-header">
					<p> Slack - Send Message</p>
				</header>
				<div>
					<p/>
					<form onSubmit={this.handleSubmit}>
						<label>Destinatario:	
							{Parser(this.createDropDown())}
						</label>
						<p /><label>Mensaje:
                		<input type="text" name="mensaje" className="MessageInputText" />
						</label>
						<p /><input type="submit" value="Submit" />
					</form>
				</div>
			</div>
		);
	}
}

export default SlackSendMessage;