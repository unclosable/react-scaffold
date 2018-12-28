var path = require("path");
var webpack = require("webpack");

var config = {
};

module.exports = function (env) {
    env = env || "dev";
    return require("./env." + env + ".js")(env, config);
};
