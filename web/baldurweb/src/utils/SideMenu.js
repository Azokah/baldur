/* https://www.codeproject.com/Tips/1215984/Update-State-of-a-Component-from-Another-in-React */

import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import './react-sidenav.css';

class SideMenu extends Component {

    handleClick = (text) => { this.props.update(text)};
    render(){
        return(
            <SideNav onSelect={(selected) => {
                // Add your code here
                this.handleClick(selected);
              }}>
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected={"index"}>
              <NavItem eventKey={"twitter"}>
                <NavIcon>
                  <img src={require("../static/images/twitter.png")} className="Nav-logo"/>
                </NavIcon>
                <NavText>
                  Twitter
                </NavText>
              </NavItem>
              <NavItem eventKey={"slack"}>
                <NavIcon>
                  <img src={require("../static/images/slack.png")} className="Nav-logo"/>
                </NavIcon>
                <NavText>
                  Slack
                </NavText>
                  <NavItem eventKey={"slack-message"}>
                  <NavText>
                    Send Message
                  </NavText>
                  </NavItem>
                  <NavItem eventKey={"slack-chat"}>
                  <NavText>
                    See chat
                  </NavText>
                </NavItem>
              </NavItem>
              <NavItem eventKey={"telegram"}>
                <NavIcon>
                  <img src={require("../static/images/telegram.png")} className="Nav-logo"/>
                </NavIcon>
                <NavText>
                  Telegram
                </NavText>
              </NavItem>
              </SideNav.Nav>
            </SideNav>
        );
        
    }
}

export default SideMenu;