const createMenu = () => {
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

export default createMenu
