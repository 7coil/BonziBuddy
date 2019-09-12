import React, { Component } from "react"
import { Helmet } from "react-helmet"

import styles from "./index.module.scss"

class HomePage extends Component {
  exit() {
    window.require("electron").ipcRenderer.send("closeProgram")
  }
  render() {
    return (
      <div className={styles.grid}>
        <Helmet>
          <title>BonziBuddy</title>
        </Helmet>
        <div className={styles.quotesArea}>
          <span>"Because it's a Jungle Out There!"</span>
          <span>BONZI.COM&trade;</span>
        </div>
        <div className={styles.addonArea}>
          <span>Check for New Add-Ons...</span>
        </div>
        <div className={styles.buttonArea}>
          <div>
            <a href="#shit">Home</a>
          </div>
          <div>
            <a href="#shit">Entertainment</a>
          </div>
          <div>
            <a href="#shit">Sports</a>
          </div>
          <div>
            <a href="#shit">Travel</a>
          </div>
          <div>
            <a href="#shit">Shopping</a>
          </div>
          <div>
            <a href="#shit">Games</a>
          </div>
          <div>
            <a href="#shit">Finance</a>
          </div>
        </div>
        <div className={styles.linksArea}>
          <div>
            <a href="#shit">E-Mail</a>
          </div>
          <div>
            <a href="#shit">Buddies Online</a>
          </div>
          <div>
            <a href="#shit">Calendar</a>
          </div>
        </div>
        <div className={styles.interactArea}></div>
        <div className={styles.functionArea}>
          <button>Help</button>
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
