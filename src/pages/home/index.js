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
  exit() {
    window.require("electron").ipcRenderer.send("closeProgram")
  }
  openLink(link) {
    return () => window.require("electron").shell.openExternal(link)
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
          <img alt="Home Button" src={homeButton} />
          <img alt="Entertainment Button" src={entertainmentButton} />
          <img alt="Sports Button" src={sportsButton} />
          <img alt="Travel Button" src={travelButton} />
          <img alt="Shopping Button" src={shoppingButton} />
          <img alt="Games Button" src={gamesButton} />
          <img alt="Finance Button" src={financeButton} />
        </div>
        <div className={styles.linksArea}>
          <div>
            <img alt="E-Mail Icon" src={emailButton} />
            <a href="#email" onClick={this.openLink('https://mail.google.com/')}>E-Mail</a>
          </div>
          <div>
            <img alt="Buddies Online Icon" src={buddiesOnlineButton} />
            <a href="#buddies" onClick={this.openLink('https://mail.google.com/')}>Buddies Online</a>
          </div>
          <div>
            <img alt="Calendar Icon" src={calendarButton} />
            <a href="#calendar" onClick={this.openLink('https://calendar.google.com/')}>Calendar</a>
          </div>
        </div>
        <div className={styles.interactArea}></div>
        <div className={styles.functionArea}>
          <button onClick={this.openLink('https://github.com/7coil/BonziBuddy/wiki')}>Help</button>
          <button>Options</button>
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
