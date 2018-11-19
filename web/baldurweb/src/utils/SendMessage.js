import React, { Component } from 'react'
import { fetchApi } from "./restMethods.js"
import '../App.css';
import Parser from 'html-react-parser';

var config = require('../config/balder.config.json');

class SendMessage extends Component {
	constructor(props) {
		super(props)
		this.state = { token: "null",usersDestination: "No online users", successSent: false};

		fetch(config.url_api + '/api/users', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: window.localStorage.getItem("token")
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
		var names = "";
		var noOneSelected = true;
		for(var i = 0; i < event.target[0].length; i++){
			if(event.target[0][i].selected == true){
				if(names == ""){
					names += event.target[0][i].value;	
				}else names += ";" + event.target[0][i].value;
				noOneSelected = false;
			}
		}
		if(noOneSelected == true)
			for(var i = 0; i < event.target[0].length; i++){
				if(names == ""){
					names += event.target[0][i].value;	
				}else names += ";" + event.target[0][i].value;
		}
		console.log(names);
		console.log(event.target[1].value);
		fetch(config.url_api + '/api/sendMessage', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: window.localStorage.getItem("token"),
				message: event.target[1].value,
				name: names
			})
		}).then((response) => {
			return response.json()
		})
		.then((recurso) => {
			console.log(JSON.stringify(recurso));
			console.log(recurso[0]["succes"]);
			if(recurso[0]["succes"] == true)
				this.setState({ successSent: "Mensaje enviado correctamente." });
			else this.setState({ successSent: "No se pudo enviar mensaje." });
		});
	}

	createDropDown(props){
		
		var html = '<select name="user" multiple="multiple">';

		for(var i= 0;i < this.state.usersDestination.length; i++){
			if(this.state.usersDestination[i].online == true){
				html+='<option id="OnlineUser" value="' + this.state.usersDestination[i].name +'">' +this.state.usersDestination[i].name +'</option>';
			}else html+='<option value="' + this.state.usersDestination[i].name +'">' +this.state.usersDestination[i].name +'</option>';
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
					<p>{this.state.successSent}</p>
				</div>
			</div>
		);
	}
}

export default SendMessage;