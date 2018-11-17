import React, { Component } from 'react'
import {fetchApi} from "./restMethods.js"
import '../App.css';

const logo = require("../static/images/bragiportrait.jpg");//No me deja usar una constante de config.bragiPortrait

class IndexHome extends Component {
  constructor(props){
    super(props)
	  this.state = {helloString: "Hello world!"};
	
    fetchApi("/").then((result) => {
      this.setState({helloString:result});
     });
  }
  
  render() {
    return (
      <div>
        <header className="App-header">
        <img src={logo} className="IntroLogo" alt="" />
          <p> { this.state.helloString } </p>
        </header>
      </div>
    );
  }
}

export default IndexHome;