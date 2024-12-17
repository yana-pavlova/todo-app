const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = (envVars) => {
    const { env } = envVars; //переменную env передаётся при запуске скрипта со значением dev или prod
    const envConfig = require(`./webpack.${env}.js`)
    const config = merge(commonConfig, envConfig)
    return config
}