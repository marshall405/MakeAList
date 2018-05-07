const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
	//Create the browser window.
	let win = new BrowserWindow({width: 800, height: 600, minWidth: 450, maxWidth: 800, maxHeight: 900, minHeight: 200});
	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}));
}

app.on('ready', createWindow);
console.log('hello');

