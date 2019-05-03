const { app } = require('electron');

const { Window } = require('./Structures/Electron');

const { DataStore } = require('./Structures/DataStore');
const main = () => new Window({ file: 'index.html' });
app.on('ready', () => {
    var App = main();
    App
});
app.on('window-all-closed', () => app.quit());
const data = new DataStore()
    .setCurrent('Attack on Titan');
data.wideUpdate();