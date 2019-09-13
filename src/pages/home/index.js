import React, { Component } from "react"
import { Helmet } from "react-helmet"

import styles from "./index.module.scss"

import addonsButton from './img/checkForNewAddons.png';
import homeButton from './img/home.png';
import entertainmentButton from './img/entertainment.png';
import sportsButton from './img/sports.png';
import travelButton from './img/travel.png';
import shoppingButton from './img/shopping.png';
import gamesButton from './img/games.png';
import financeButton from './img/finance.png';
import emailButton from './img/email.png';
import buddiesOnlineButton from './img/buddiesOnline.png';
import calendarButton from './img/calendar.png';
import favicon from './img/favicon.png';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invite: 'https://discordapp.com/invite/wHgdmf4'
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    fetch('https://discordapp.com/api/guilds/226404143999221761/widget.json')
      .then(data => data.json())
      .then((data) => {
        console.log(data);
        if (data.instant_invite) {
          this.setState({
            invite: data.instant_invite
          })
        }
      })
  }
  exit() {
    if (window.require) window.require("electron").ipcRenderer.send("closeProgram")
  }
  settings() {
    if (window.require) window.require("electron").ipcRenderer.send("openSettingsMenu")
  }
  handleClick(e) {
    const getLink = (element) => {
      if (element.attributes.href && element.attributes.href.value && !element.attributes.href.value.startsWith('#')) return element.attributes.href.value;
      if (element.parentElement) return getLink(element.parentElement);
      return null;
    }
    if (window.require) {
      const link = getLink(e.target);
      if (link) {
        window.require("electron").shell.openExternal(link)
        e.preventDefault();
      }
    }
  }
  render() {
    return (
      <div className={styles.grid}>
        <Helmet>
          <title>Welcome to BonziWORLD!</title>
          <link rel="icon" type="image/png" href={favicon}></link>
        </Helmet>
        <div className={styles.addonArea}>
          <img alt="Check for New Add-Ons..." src={addonsButton} />
        </div>
        <div className={styles.buttonArea}>
          <a href="#" onClick={this.handleClick}><img alt="Home Button" src={homeButton} /></a>
          <a href="https://www.bbc.co.uk/news/entertainment_and_arts" onClick={this.handleClick}><img alt="Entertainment Button" src={entertainmentButton} /></a>
          <a href="https://www.bbc.co.uk/sport" onClick={this.handleClick}><img alt="Sports Button" src={sportsButton} /></a>
          <a href="#" onClick={this.handleClick}><img alt="Travel Button" src={travelButton} /></a>
          <a href="#" onClick={this.handleClick}><img alt="Shopping Button" src={shoppingButton} /></a>
          <a href="#" onClick={this.handleClick}><img alt="Games Button" src={gamesButton} /></a>
          <a href="https://www.bbc.co.uk/news/business" onClick={this.handleClick}><img alt="Finance Button" src={financeButton} /></a>
        </div>
        <div className={styles.linksArea}>
          <div>
            <img alt="E-Mail Icon" src={emailButton} />
            <a href="https://mail.google.com/" onClick={this.handleClick}>E-Mail</a>
          </div>
          <div>
            <img alt="Buddies Online Icon" src={buddiesOnlineButton} />
            <a href={this.state.invite} onClick={this.handleClick}>Buddies Online</a>
          </div>
          <div>
            <img alt="Calendar Icon" src={calendarButton} />
            <a href="https://calendar.google.com/" onClick={this.handleClick}>Calendar</a>
          </div>
        </div>
        <div className={styles.interactArea}></div>
        <div className={styles.functionArea}>
          <button href="https://github.com/7coil/BonziBuddy/wiki" onClick={this.handleClick}>Help</button>
          <button onClick={this.settings}>Options</button>
          <button>Update Me</button>
          <button>Sleep F9</button>
          <button>Hide</button>
          <button onClick={this.exit}>Goodbye</button>
        </div>
      </div>
    )
  }
}

export default HomePage
