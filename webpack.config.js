// make it possible to require es6 modules
require('babel/register')
var webpackConfig = require('hjs-webpack')
var Layout = require('./src/layout')
var PublicPage = require('./src/pages/public')
var React = require('react')

module.exports = webpackConfig({
  in: 'src/app.js',
  out: 'public',
  replace: {
    config: 'src/config.js'
  },
  clearBeforeBuild: true,
  html: function (data) {
    var layoutHtml = React.renderToString(React.createElement(Layout, {me: {}}))
    var publicHtml = React.renderToString(React.createElement(PublicPage))
    return {
      '200.html': data.defaultTemplate({html: layoutHtml}),
      'index.html': data.defaultTemplate({html: publicHtml})
    }
  }
})
