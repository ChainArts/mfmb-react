const {app, BrowserWindow, globalShortcut} = require('electron');
const isDev = require("electron-is-dev");

let { fork } = require('child_process');
let server = fork(__dirname + "/webserver/server.js");

function newApp() {
    let win = null;
    let loading = new BrowserWindow({
    icon: __dirname + '/icons/ms-icon-310x310.png',
    backgroundColor:  '#051622',
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
            icon: __dirname + '/icons/ms-icon-310x310.png',
            backgroundColor: '#051622',
            show: false,
            frame: false,
            minHeight: 480, minWidth: 720,
            height: 1080, width: 1920,
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
                win.reload();
            }
            else if(input.control && input.key === 'F5'){
                console.log('Cleared Cache')
                win.webContents.session.clearCache();
                win.reload();
            }
            else if(input.key === 'F12'){
                console.log('Opened Console')
                win.webContents.openDevTools();
            }
            else if(input.alt && input.key === "Enter"){
                if(win.fullScreen){
                    win.setFullScreen(false)
                    console.log('min');
                }
                else
                {
                    win.setFullScreen(true)
                    console.log('max');
                }
            }
        }
        })

        win.webContents.on('killed', (e) => {
            app.relaunch();
        })
        
        win.once('ready-to-show', () => {
            win.maximize()
            win.show()
            win.focus()
            loading.hide()
            loading.close()
        })
    win.loadURL(
            isDev ? "http://localhost:3000" : `file://${__dirname}/index.html`)
    })

    loading.loadURL(`file://${__dirname}/loading/loading.html`)
    loading.once('ready-to-show', () => {
      loading.show()
      loading.focus()
    })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
  }
})
app.on("ready", newApp);

app.on('will-quit', () =>{
    globalShortcut.unregisterAll();
});