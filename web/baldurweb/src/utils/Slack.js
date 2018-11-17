import React, { Component } from 'react';
import { fetchApi } from "./restMethods.js";
import Parser from 'html-react-parser';
import '../App.css';

var config = require('../config/bragi.config.json');
const logo = require("../static/images/bragiportrait.jpg");//No me deja usar una constante de config.bragiPortrait

//import SideMenu from './utils/SideMenu.js'

class Slack extends Component {
	constructor(props) {
		super(props)
		this.state = {
			helloString: "Slack Conversations", text: "No records of conversations",
			channelsDestination: "No channels"
		};

		fetchApi("/slack/getChannels").then((result) => {
			this.setState({ channelsDestination: result });
			fetch(config.url_api + '/slack/getMessagesFromChannel', {
				method: 'post',
				headers: {
					'Accept': 'text/plain',
					'Content-Type': 'text/plain'
				},
				body: JSON.stringify({
					channel: "CE5J60664"
				})
			}).then((response) => {
				return response.json()
			})
				.then((recurso) => {
					console.log(JSON.stringify(recurso));
					this.setState({ text: recurso });
				});
		});

		this.handleSubmit = this.handleSubmit.bind(this);
		
	}

	createDropDown(props) {

		var html = '<select name="channel">';
		for (var i = 0; i < this.state.channelsDestination.length; i++) {
			html += '<option value="' + this.state.channelsDestination[i].id + '">' + this.state.channelsDestination[i].name + '</option>';
		}
		html += "</select>";
		return html;
	}

	handleSubmit(event) {
		fetch(config.url_api + '/slack/getMessagesFromChannel', {
			method: 'post',
			headers: {
				'Accept': 'text/plain',
				'Content-Type': 'text/plain'
			},
			body: JSON.stringify({
				channel: event.target.value//CE5J60664
			})
		}).then((response) => {
			return response.json()
		})
			.then((recurso) => {
				console.log(JSON.stringify(recurso));
				this.setState({ text: recurso });
			});
	}

	createChat(){
		var html = "";
		for (var i = 0; i < this.state.text.length; i++) {
			html +=  "<p>" + this.state.text[i].username +': ' + this.state.text[i].text + "</p>";
		}
		return html;
	}

	render() {
		return (
			<div>
				<header className="App-header">
					<p> {this.state.helloString} </p>
					<form onChange={this.handleSubmit}>
						<label>Channel:
							{Parser(this.createDropDown())}
						</label>
					</form>
				</header>
				<div className="ScrollBox">
					{Parser(this.createChat())}
				</div>
			</div>
		);
	}
}

export default Slack;