import clippy from "clippyjs"
import React, { Component } from "react"
import { Helmet } from "react-helmet"
import createMenu from "./menu"
import "./styles.scss"

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
    this.mouseX = e.clientX
    this.mouseY = e.clientY
    requestAnimationFrame(this.moveWindow)
    e.preventDefault()
  }
  onMouseUp(e) {
    window.require("electron").ipcRenderer.send("windowMoved")
    cancelAnimationFrame(this.animationId)
  }
  moveWindow() {
    window.require("electron").ipcRenderer.send("windowMoving", {
      mouseX: this.mouseX,
      mouseY: this.mouseY,
    })
    this.animationId = requestAnimationFrame(this.moveWindow)
  }
  onRightClick() {
    const { remote } = window.require("electron")
    const menu = createMenu(this.agent)
    menu.popup({
      window: remote.getCurrentWindow(),
    })
  }
  componentDidMount() {
    const electron = window.require("electron")
    electron.ipcRenderer.on("closeProgram", () => {
      this.agent.play("Hide", undefined, () => {
        electron.ipcRenderer.send("closeProgram", 0)
      })
    })

    // Load clippy
    clippy.load(
      "Bonzi",
      agent => {
        this.agent = agent
        agent.show()
        agent.animate()
        console.log(agent.animations())
      },
      err => {
        console.log(err)
      },
      "/"
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
