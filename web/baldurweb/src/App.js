import React, { Component } from 'react'
import SideMenu from "./utils/SideMenu.js"
import IndexHome from "./utils/IndexHome.js"
import Slack from "./utils/Slack.js"
import SlackSendMessage from "./utils/SlackSendMessage.js"
import Twitter from "./utils/Twitter.js"
import Telegram from "./utils/Telegram.js"
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
    if(page == "twitter"){
      return <Twitter />
    }else if(page == "telegram"){
      return <Telegram />
    }else if(page == "slack-message"){
      return <SlackSendMessage />
    }else if(page == "slack-chat"){
      return <Slack />
    }else{
      return <IndexHome />
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