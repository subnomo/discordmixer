var Config = require('./utils/ParseConfig');
var Service = (function () {
    function Service() {
        this.config = new Config();
    }
    return Service;
})();
module.exports = Service;
