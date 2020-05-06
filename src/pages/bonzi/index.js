import clippy from "clippyjs"
import React, { Component } from "react"
import { Helmet } from "react-helmet"
import "./styles.scss"

const createMenu = () => {
  if (typeof window === 'undefined') return;
  const { remote, ipcRenderer } = window.require("electron")
  const { Menu, MenuItem } = remote

  const menu = new Menu()
  menu.append(
    new MenuItem({
      label: "My Home",
      click() {
        ipcRenderer.send("openMainMenu")
      },
    })
  )

  menu.append(
    new MenuItem({
      label: "Goodbye",
      click() {
        ipcRenderer.send("closeProgram")
      },
    })
  )

  return menu
}

class BonziBuddy extends Component {
  constructor(props) {
    super(props)
    this.onRightClick = this.onRightClick.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.moveWindow = this.moveWindow.bind(this)
    this.agent = null
    this.animationId = null
    this.mouseX = null
    this.mouseY = null
    this.up = true
  }
  onMouseDown(e) {
    if (window.require) {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
      requestAnimationFrame(this.moveWindow)
      e.preventDefault()
    }
  }
  onMouseUp(e) {
    if (window.require) {
      window.require("electron").ipcRenderer.send("windowMoved")
      cancelAnimationFrame(this.animationId)
    }
  }
  moveWindow() {
    if (window.require) {
      window.require("electron").ipcRenderer.send("windowMoving", {
        mouseX: this.mouseX,
        mouseY: this.mouseY,
      })
      this.animationId = requestAnimationFrame(this.moveWindow)
    }
  }
  onRightClick() {
    if (window.require) {
      const { remote } = window.require("electron")
      const menu = createMenu(this.agent)
      menu.popup({
        window: remote.getCurrentWindow(),
      })
    }
  }
  componentDidMount() {
    if (window.require) {
      const electron = window.require("electron");
      electron.ipcRenderer.on("closeProgram", () => {
        this.agent.play("Hide", undefined, () => {
          electron.ipcRenderer.send("closeProgram", 0)
        })
      })
    }

    // Load clippy
    clippy.load(
      'Bonzi',
      agent => {
        this.agent = agent
        agent.show()
        agent.animate()
        console.log(agent)
        if (window.require) {
          const electron = window.require("electron");
          electron.ipcRenderer.send('resizeWindow', agent._animator._data.framesize)
        }
      },
      err => {
        console.log(err)
      },
      "/clippy.js/agents/"
    )
  }
  render() {
    return (
      <div
        className="div"
        id="div"
        draggable={true}
        onContextMenu={this.onRightClick}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        <Helmet>
          <title>BonziBuddy</title>
        </Helmet>
      </div>
    )
  }
}

export default BonziBuddy
