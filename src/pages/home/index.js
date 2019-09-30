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
import { setupDefaults } from "../../components/HyperlinkConfigurator";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invite: 'https://discordapp.com/invite/wHgdmf4'
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    setupDefaults();
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
  handleClick(id) {
    return (e) => {
      const hyperlinkData = JSON.parse(localStorage.getItem('hyperlinks'));
      const data = hyperlinkData[id];

      if (window.require) {
        if (data.type === 'link') {
          window.require("electron").shell.openExternal(data.value)
          e.preventDefault();
        }
      } else if (data.type === 'link') {
        window.open(data.value)
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
          <img onClick={this.handleClick('home')} alt="Home Button" src={homeButton} />
          <img onClick={this.handleClick('entertainment')} alt="Entertainment Button" src={entertainmentButton} />
          <img onClick={this.handleClick('sports')} alt="Sports Button" src={sportsButton} />
          <img onClick={this.handleClick('travel')} alt="Travel Button" src={travelButton} />
          <img onClick={this.handleClick('shopping')} alt="Shopping Button" src={shoppingButton} />
          <img onClick={this.handleClick('games')} alt="Games Button" src={gamesButton} />
          <img onClick={this.handleClick('finance')} alt="Finance Button" src={financeButton} />
        </div>
        <div className={styles.linksArea}>
          <div onClick={this.handleClick('email')}>
            <img alt="E-Mail Icon" src={emailButton} />
            <span>E-Mail</span>
          </div>
          <div onClick={this.handleClick('buddies')}>
            <img alt="Buddies Online Icon" src={buddiesOnlineButton} />
            <span>Buddies Online</span>
          </div>
          <div onClick={this.handleClick('calendar')}>
            <img alt="Calendar Icon" src={calendarButton} />
            <span>Calendar</span>
          </div>
        </div>
        <div className={styles.interactArea}></div>
        <div className={styles.functionArea}>
          <button onClick={this.handleClick('help')}>Help</button>
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
