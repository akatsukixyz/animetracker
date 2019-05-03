const fs = require('fs');
const defaults = {
    async: false,
    path: './Store.json'
};

class Store {
    /**
     * @param {Object} options Options for this data store
     */
    constructor(options = defaults) {
        this.async = options.async;
        this.path = options.path;
        if(!fs.existsSync(this.path))
            console.log('Invalid path and/or JSON provided. Either delete the current one and let it be setup automatically, or fix it.');
        this.file = fs.readFileSync(this.path);
        try { JSON.parse(this.file) } catch(e) { this.init(); }
        this.storage = {};
        this.load();
    }
    /**
     * @param {String} Key Key for this item
     * @param {*} Value Value for this item (will be serialized)
     * @type {*} Returns the value
      */
    set(key, value) {
        const val = (typeof value === 'object') ? JSON.stringify(value) : String(value);
        this.storage[key] = val;
        return this.async ? Promise.resolve(val) : val;
    }
    /**
     * @param {*} Key The key to delete
     * @type {*} The value deleted
     */
    deleteKey(key) {
        const x = this.storage[key];
        delete this.storage[key];
        return x;
    }
    /**
     * @param {Function} Function The function to look for a specific row, given its value 
     * @type {*} The value of the deleted row
     */
    findAndDelete(func) {
        const find = fn => {
            for(const key in this.storage) {
                if(fn(this.storage[key], key, this)) return key;
            }
        };
        const key = find(func),
            found = this.storage[key];
        delete this.storage[key];
        return this.async ? Promise.resolve(found) : found;
    }
    load() {
        const file = JSON.parse(fs.readFileSync(this.path));
        for(const row in file) 
            this.storage[row] = file[row];
    }
    update() {
        console.log(this.storage);
        fs.writeFileSync(this.path, JSON.stringify(this.storage));
    }
    init() {
        fs.writeFileSync(this.path, JSON.stringify({}));
    }
}
module.exports = { Store };