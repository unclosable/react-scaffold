var webpackMerge = require("webpack-merge");

var config = {
    isDev: false,
}

module.exports = function (env, defaultConfig) {
    return webpackMerge(defaultConfig, config);
};
