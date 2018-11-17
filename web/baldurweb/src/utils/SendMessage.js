import React, { Component } from 'react'
import { fetchApi } from "./restMethods.js"
import '../App.css';
import Parser from 'html-react-parser';

var config = require('../config/balder.config.json');

class SendMessage extends Component {
	constructor(props) {
		super(props)
		this.state = { token: "null",usersDestination: "No online users"};

		fetch(config.url_api + '/api/users', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MjQ5NzQ5OCwiZXhwIjoxNTQzMDk3NDk4fQ.L_O5G--DhqiT5ivD2WPy5cV_41i14hFiZvlAfROjt6M"
			})
		}).then((response) => {
			return response.json()
		})
		.then((recurso) => {
			console.log(JSON.stringify(recurso));
			this.setState({ usersDestination: recurso });
		});

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(event.target[0].value);
		console.log(event.target[1].value);
		fetch(config.url_api + '/api/sendMessage', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MjQ5NzQ5OCwiZXhwIjoxNTQzMDk3NDk4fQ.L_O5G--DhqiT5ivD2WPy5cV_41i14hFiZvlAfROjt6M",
				message: event.target[1].value,
				name: event.target[0].value
			})
		}).then((response) => {
			return response.json()
		})
		.then((recurso) => {
			console.log(JSON.stringify(recurso));
			this.setState({ text: recurso });
		});
	}

	createDropDown(props){
		
		var html = '<select name="user">';

		for(var i= 0;i < this.state.usersDestination.length; i++){
			html+='<option value="' + this.state.usersDestination[i].name +'">' +this.state.usersDestination[i].name +'</option>';
		}

		html +="</select>";
		return html;
	}

	render() {
		return (
			<div>
				<header className="App-header">
					<p> Baldur - Send Message</p>
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

export default SendMessage;