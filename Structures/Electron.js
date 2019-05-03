'use strict';
const { BrowserWindow } = require('electron');
const props = {
    width: 500,
    height: 800,
    show: false
};

class Window extends BrowserWindow {
    constructor({ file, ...windowSettings }) {
        super({ ...props, ...windowSettings });
        this.loadFile(file);
        // this.webContents.openDevTools();
        this.on('ready-to-show', () => this.show());
        
    }
}
module.exports = { Window };