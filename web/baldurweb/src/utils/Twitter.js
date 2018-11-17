import React, { Component } from 'react'
import {fetchApi} from "./restMethods.js"
import '../App.css';

//var config = require('../config/bragi.config.json');
const logo = require("../static/images/tenor.gif");//No me deja usar una constante de config.bragiPortrait

//import SideMenu from './utils/SideMenu.js'

class Twitter extends Component {
  constructor(props){
    super(props)
	  this.state = {helloString: "Twitter"};
  }
  
  render() {
    return (
      <div>
        <header className="App-header">
          <p> { this.state.helloString } </p>
        </header>
        <img src={logo} className="IntroLogo" alt="" />
        <p> Under construction, come back soon!</p>
      </div>
    );
  }
}

export default Twitter;