// make it possible to require es6 modules
require('babel/register')
var webpackConfig = require('hjs-webpack')
var env = process.env.NODE_ENV || 'development'
var Layout = require('./src/layout')
var PublicPage = require('./src/pages/public')
var React = require('react')

module.exports = webpackConfig({
  in: 'src/app.js',
  out: 'public',
  isDev: env !== 'production',
  replace: {
    config: 'src/config.js'
  },
  html: function (data) {
    return {
      '200.html': template(data, React.renderToString(React.createElement(Layout, {me: {}}))),
      'index.html': template(data, React.renderToString(React.createElement(PublicPage)))
    }
  }
})

function template (buildData, html) {
  return [
    '<!doctype>',
    '<html>',
      '<head>',
        '<meta charset="utf-8"/>',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">',
        '<link rel="stylesheet" href="/' + buildData.css + '"/>',
      '</head>',
      '<body>',
        html,
      '</body>',
      '<script src="/' + buildData.main + '"></script>',
    '</html>'
  ].join('')
}
