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
              <SideNav.Nav defaultSelected={"mail"}>
              <NavItem eventKey={"mail"}>
                <NavIcon>
                  <img src={require("../static/images/recieve.png")} className="Nav-logo"/>
                </NavIcon>
                <NavText>
                  Buzon
                </NavText>
              </NavItem>
              <NavItem eventKey={"enviar"}>
                <NavIcon>
                  <img src={require("../static/images/send.png")} className="Nav-logo"/>
                </NavIcon>
                <NavText>
                  Enviar mensaje
                </NavText>
              </NavItem>
              <NavItem eventKey={"logout"}>
                <NavIcon>
                  <img src={require("../static/images/logout.png")} className="Nav-logo"/>
                </NavIcon>
                <NavText>
                  Logout
                </NavText>
              </NavItem>
              </SideNav.Nav>
            </SideNav>
        );
        
    }
}

export default SideMenu;