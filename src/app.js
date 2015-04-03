import app from 'ampersand-app'
import Router from './router'
import Me from './models/me'
import styles from './styles/main.styl'
import octicons from 'octicons/octicons/octicons.css'

window.app = app.extend({
  init () {
    this.me = new Me()
    this.router = new Router()
    this.router.history.start({ pushState: true })
  }
})

app.init()
