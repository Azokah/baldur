import React, { Component } from 'react'
import {fetchApi} from "./restMethods.js"
import '../App.css';

const logo = require("../static/images/balderportrait.jpg");//No me deja usar una constante de config.bragiPortrait

class Login extends Component {
  constructor(props){
    super(props)
	  this.state = {helloString: "El segundo hijo de Odín es Baldr, es el más sabio de los Æsir, y el que mejor habla y con más gracia; y es tal la calidad que asiste, que nadie puede contradecir su juicio."};
  }
  
  render() {
    return (
      <div>
        <header className="App-header">
          <p> Baldur - Autenticación </p>
        </header>
        <body>
          <p><img src={logo} className="IntroLogo" alt="" /></p>
          <p> { this.state.helloString } </p>
        </body>
      </div>
    );
  }
}

export default Login;