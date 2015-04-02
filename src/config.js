import qs from 'qs'
const hostname = window.location.hostname
const origin = window.location.origin

let config = {
  isDev: hostname === 'localhost',
  apiUrl: 'https://api.github.com',
  scopes: 'user,repo'
}

if (config.isDev) {
  config.tokenUrl = 'https://labelforme-dev.herokuapp.com/authenticate'
  config.githubAuthUrl = 'https://github.com/login/oauth/authorize?' + qs.stringify({
    scopes: config.scopes,
    redirect_uri: origin + '/auth/callback',
    client_id: '34d32bcd940626d0d6f3'
  })
} else {
  config.tokenUrl = 'https://labelforme.herokuapp.com/authenticate'
  config.githubAuthUrl = 'https://github.com/login/oauth/authorize?' + qs.stringify({
    scopes: config.scopes,
    redirect_uri: origin + '/auth/callback',
    client_id: 'a921b2a8818253f83ec7'
  })
}

export default config
