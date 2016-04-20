const fs = require('fs');
const path = require('path');

const fileExist = fs.existsSync(path.resolve(__dirname, 'configuration.json'));

if (fileExist) {
    module.exports = require('./configuration.json');
} else {
    module.exports = require('./configuration_template.json');
}
