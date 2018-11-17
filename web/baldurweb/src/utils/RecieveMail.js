import React, { Component } from 'react';
import { fetchApi } from "./restMethods.js";
import Parser from 'html-react-parser';
import '../App.css';

var config = require('../config/balder.config.json');
const logo = require("../static/images/balderportrait.jpg");//No me deja usar una constante de config.bragiPortrait

//import SideMenu from './utils/SideMenu.js'

class Slack extends Component {
	constructor(props) {
		super(props)
		this.state = {helloString: "Baldur - Buzon",messages: "No messages recieved."};

		fetch(config.url_api + '/api/getMessages', {
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
			this.setState({ messages: recurso });
		});
		
	}




	createChat(){
		var html = "";
		for (var i = 0; i < this.state.messages.length; i++) {
			html +=  "<p>" + this.state.messages[i].name_to +'</p><p>' + this.state.messages[i].message +	"</p><p>De:	"+ this.state.messages[i].name_from +"		 "+this.state.messages[i].date +"</p><p>------------------</p>";
		}
		return html;
	}

	render() {
		return (
			<div>
				<header className="App-header">
					<p> {this.state.helloString} </p>
				</header>
				<div className="ScrollBox">
					{Parser(this.createChat())}
				</div>
			</div>
		);
	}
}

export default Slack;