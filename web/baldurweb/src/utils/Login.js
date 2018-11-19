import React, { Component } from 'react'
import { fetchApi } from "./restMethods.js"
import '../App.css';

var config = require('../config/balder.config.json');
const logo = require("../static/images/balderportrait.jpg");//No me deja usar una constante de config.bragiPortrait

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {token: "null",helloString: "El segundo hijo de Odín es Baldr, es el más sabio de los Æsir, y el que mejor habla y con más gracia; y es tal la calidad que asiste, que nadie puede contradecir su juicio." };

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleClick = (text) => { this.props.update(text)};

	async handleSubmit(event) {
		event.preventDefault();
		console.log(event.target[0].value);
		console.log(event.target[1].value);
		fetch(config.url_api + '/api/authenticate', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: event.target[0].value,
				password: event.target[1].value
			})
		}).then((response) => {
			return response.json()
		})
			.then((recurso) => {
				console.log("Recibi token: ");
				this.setState({ token: JSON.stringify(recurso["token"]).replace(/['"]+/g, '') });
				window.localStorage.setItem("token", this.state.token);
				console.log(window.localStorage.getItem("token"));
				this.handleClick("mail");
			});
	}

	render() {
		return (
			<div>
				<header className="App-header">
					<p> Baldur - Autenticación </p>
				</header>
				<body>
					<img src={logo} className="IntroLogo" alt="" />
					<p> {this.state.helloString} </p>
					<form onSubmit={this.handleSubmit}>
						<p /><label>Username:
                		<input type="text" name="name" className="MessageInputText" />
						</label>
						<p /><label>Password:
                		<input type="text" name="password" className="MessageInputText" />
						</label>
						<p /><input type="submit" value="Submit" />
					</form>
				</body>
			</div>
		);
	}
}

export default Login;