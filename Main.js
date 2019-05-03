const { app } = require('electron');
const DiscordRPC = require('discord-rpc');
const images = require('google-images');

require('dotenv').config();

const clientId = process.env.CLIENTID;
const cx = '013388816492506720970:i92zq_psqh8';

const image = new images(cx, process.env.APIKEY);

const { Window } = require('./Structures/Electron');

const { DataStore } = require('./Structures/DataStore');

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

const main = () => new Window({ file: 'index.html' });
app.on('ready', async () => {
    const window = main();
    updateActivity(await findCurrent(window));
    setInterval(async () => {
        updateActivity(await findCurrent(window));
    }, 15e3);
});
app.on('window-all-closed', () => app.quit());
const data = new DataStore();
data.setCurrent(data.current)
    .wideUpdate();

rpc.login({ clientId }).catch(console.error);

const search = async query => (await image.search(query))[0].url;

const updateActivity = (name = 'Nothing') => rpc.setActivity({ state: name });

const findCurrent = async window => { 
    const e = await window.webContents.executeJavaScript(`window.localStorage.getItem('current');`); 
    return e; 
};
