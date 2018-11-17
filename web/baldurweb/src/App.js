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
	  this.state = {currentView: "index"};

     this.updateView = this.updateView.bind();
  }

  updateView = (view) => {this.setState({currentView: view })};

  switchRender(props){
    const page = props.page;
    if(page == "construction"){
      return <OnConstruction />
    }if(page == "mail"){
      return <RecieveMail />
    }if(page == "enviar"){
      return <SendMessage />
    }else{
      return <Login />
    }
  }
  render() {
    return (
      <div className="App">
        <SideMenu update={this.updateView}/>
        <this.switchRender page={this.state.currentView}/>
      </div>
    );
  }
}

export default App;