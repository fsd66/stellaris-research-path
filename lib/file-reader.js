const fs = require("fs");
const path = require("path");

module.exports.readTechnologyFile = (filepath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(filepath), (err, data) => {
            if (err) {
                return reject(err);
            }

            return resolve(JSON.parse(data));
        });
    });
};
