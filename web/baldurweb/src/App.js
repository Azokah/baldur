import React, { Component } from 'react'
import SideMenu from "./utils/SideMenu.js"
import Login from "./utils/Login.js"
import OnConstruction from "./utils/OnConstruction.js"
import SendMessage from "./utils/SendMessage.js"
import RecieveMail from "./utils/RecieveMail.js"
import './App.css';

//import SideMenu from './utils/SideMenu.js'

class App extends Component {
  constructor(props){
    super(props)
	  this.state = {currentView: "mail"};

     this.updateView = this.updateView.bind(this);
  }

  updateView = (view) => {this.setState({currentView: view })};

  switchRender(props){
    const page = props.page;
    if(window.localStorage.getItem("token") == "null"){
      return <Login update={props.update}/>
    }else if(page == "construction"){
      return <OnConstruction />
    }else if(page == "mail"){
      return <RecieveMail />
    }else if(page == "enviar"){
      return <SendMessage />
    }else if(page == "logout"){
      window.localStorage.setItem("token", "null");
      return <Login update={props.update}/>
    };
  }
  render() {
    return (
      <div className="App">
        <SideMenu update={this.updateView}/>
        <this.switchRender page={this.state.currentView} update={this.updateView}/>
      </div>
    );
  }
}

export default App;