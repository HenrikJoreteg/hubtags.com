import app from 'ampersand-app'
import xhr from 'xhr'

export default function (opts, callback) {
  opts.headers || (opts.headers = {})
  opts.headers['Authorization'] = 'token ' + app.me.token
  if (opts.url.slice(1) === '/') {
    opts.url = 'https://api.github.com' + opts.url
  }
  return xhr(opts, callback)
}
