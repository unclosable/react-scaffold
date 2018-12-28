var webpackMerge = require("webpack-merge");

var config = {
    isDev: true,
}

module.exports = function (env, defaultConfig) {
    return webpackMerge(defaultConfig, config);
};
