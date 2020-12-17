const {app, BrowserWindow, globalShortcut} = require('electron');
const url = require("url");
const path = require("path");
const isDev = require("electron-is-dev");
const ipcMain = require("electron").ipcMain;

var server = require("../server");

function newApp() {
    let win = null;
    let loading = new BrowserWindow({
    icon: './public/icons/ms-icon-150x150.png',
    show: false,
    frame: false,
    resizable: false,
    height: 420, width: 360, 
    webPreferences:{
	    worldSafeExecuteJavaScript: true,
        contextIsolation: true
    }
    })

    loading.once('show', () =>{
        win = new BrowserWindow({
            icon: './public/icons/ms-icon-150x150.png',
            backgroundColor: '#2a2b32',
            show: false,
            frame: false,
            minHeight: 480, minWidth: 720,
            height: 720, width: 1280,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
		        worldSafeExecuteJavaScript: true,
                contextIsolation: true
            } 
        })
        win.webContents.on('before-input-event', (event, input) => {
        if (input.type === "keyDown"){
            if (input.key === 'F5') {
                console.log('Refresh')
                win.reload()
            }
            else if(input.control && input.key === 'F5'){
                console.log('Cleared Cache')
                win.webContents.session.clearCache();
                win.reload()
            }
            else if(input.key === 'F12'){
                console.log('Opened Console')
                win.webContents.openDevTools()
            }
            else if(input.alt && input.key === "Enter"){
                if(win.fullScreen){
                    win.setFullScreen(false)
                    console.log('min')
                }
                else
                {
                    win.setFullScreen(true)
                    console.log('max')
                }
            }
        }
        })
        
        win.once('ready-to-show', () => {
            win.maximize()
            win.show()
            win.focus()
            loading.hide()
            loading.close()
        })
    win.loadURL(
            isDev ? "http://localhost:3000" : 'file://${path.join(__dirname, "../build/index.html")}'
        )
    })
    loading.loadURL(
    url.format({
      pathname: "./public/loading/loading.html",
      slashes: true
    }))
    loading.once('ready-to-show', () => {
      loading.show()
      loading.focus()
    })

    ipcMain.handle('minimize-event', () => {
        win.minimize()
    })

    ipcMain.handle('maximize-event', () => {
        win.maximize()
    })

    ipcMain.handle('unmaximize-event', () => {
        win.unmaximize()
    })
}
ipcMain.handle('close-event', () => {
  app.quit()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
  }
})
app.on("ready", newApp);

app.on('will-quit', () =>{
    globalShortcut.unregisterAll();
});