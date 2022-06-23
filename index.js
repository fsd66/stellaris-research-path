const researchPath = require("./lib/stellaris-research-path");
const fileReader = require("./lib/file-reader");

module.exports = {...fileReader, ...researchPath};
