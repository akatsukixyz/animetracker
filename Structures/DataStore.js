const fs = require('fs');
const EventEmitter = require('events');
const { aggregation } = require('./Aggregation');
const { Store } = require('./Store');
class DataStore extends aggregation(EventEmitter, Store) {
    /**
     * @param {Object} settings Settings for the DataStore
     */
    constructor(settings = {}) {
        super(settings);
        this.current = 'Nothing';
        this.storage = this.load() || { [this.day]: [] };
    }
    /**
     * @type {String} Returns the current date, formatted like YYYY-MM-DD
     */
    get day() {
        const today = new Date(),
            date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        return date;
    }
    /**
     * @param {String} name Name of the anime
     * @type {DataStore}
     */
    setCurrent(name) {
        Array.isArray(this.storage[this.day]) ? this.storage[this.day].push(this.current) : this.storage[this.day] = [this.current];
        this.current = name;
        return this;
    }

    /**
     * Wipes storage and removes currently-tracking
     * @type {DataStore}
     */
    wipe() {
        this.storage = { [this.day]: [] };
        this.current = 'Nothing';
        return this;
    }
    /**
     * Removes the currently-tracking anime
     * @type {DataStore}
     */
    removeCurrent() {
        this.current = 'Nothing';
        return this;
    }
    /**
     * @param {String} date Date you wish to add something to
     * @param {String} name Name of the anime you wish to add
     * @type {DataStore}
     */
    past(date, name) {
        Array.isArray(this.storage[date]) ? this.storage[date].push(name) : this.storage[date] = [name];
        return this;
    }
    wideUpdate() {
        Array.isArray(this.storage[this.day]) ? this.storage[this.day].push(this.current) : this.storage[this.day] = [this.current];
        this.update();
    }
}
module.exports = { DataStore };