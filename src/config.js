const config = {
  'localhost': {
    clientId: '34d32bcd940626d0d6f3',
    gatekeeperUrl: 'https://hubtags-dev.herokuapp.com/authenticate'
  },

  'hubtags.com': {
    clientId: 'a921b2a8818253f83ec7',
    gatekeeperUrl: 'https://hubtags.herokuapp.com/authenticate'
  }
}[window.location.hostname]

export default config
