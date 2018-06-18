let fs = require('fs');
let path = require("path");

let checkFileExists = (filePath) => {
    return fs.existsSync(filePath);
}

let getBasePath = () => {
    return path.resolve(__dirname + '/..') + '/';
}

module.exports = {
    checkFileExists: checkFileExists,
    getBasePath: getBasePath
}