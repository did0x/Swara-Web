const path = require('path');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

module.exports = function override(config, env) {
    config.plugins.push(new DynamicCdnWebpackPlugin())
    return config;
}