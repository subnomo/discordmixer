"use strict";
var Config = require('./utils/ParseConfig');
class Service {
    constructor() {
        this.config = new Config();
    }
}
module.exports = Service;
