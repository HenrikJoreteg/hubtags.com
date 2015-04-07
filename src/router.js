import app from 'ampersand-app'
import qs from 'qs'
import Router from 'ampersand-router'
import React from 'react'
import xhr from 'xhr'
import config from 'config'
import Layout from './layout'
import HomePage from './pages/home'
import RepoDetailPage from './pages/repo-detail'
import MessagePage from './pages/message'
import PublicPage from './pages/public'

function auth (name) {
  return function () {
    if (app.me.loggedIn) {
      this[name].apply(this, arguments)
    } else {
      this.redirectTo('/')
    }
  }
}

export default Router.extend({
  renderPage (Page, opts = {}) {
    const main = (
      <Layout me={app.me}>
        <Page {...opts}/>
      </Layout>
    )

    React.render(main, document.body)
  },

  routes: {
    '': 'home',
    'repos': auth('repos'),
    'login': 'login',
    'logout': 'logout',
    'auth/callback': 'authCallback',
    'repo/:owner/:reponame': auth('repoDetail'),
    '*404': 'fourOhFour'
  },

  home () {
    React.render(<PublicPage/>, document.body)
  },

  repos () {
    this.renderPage(HomePage, {repos: app.me.repos})
  },

  repoDetail (owner, repoName) {
    const repo = app.me.repos.getModelByName(owner + '/' + repoName)
    this.renderPage(RepoDetailPage, {repo: repo, labels: repo.labels})
  },

  login () {
    window.location = config.githubAuthUrl
  },

  logout () {
    app.me.clear()
    this.redirectTo('/')
  },

  authCallback () {
    const code = qs.parse(window.location.search.slice(1)).code

    this.renderPage(MessagePage, {title: 'Loading...', message: 'Fetching Github Data'})

    xhr({
      url: config.tokenUrl + '/' + code,
      json: true
    }, (err, resp, data) => {
      if (err) {
        console.error('could not get token', err, data)
      } else {
        app.me.token = data.token
      }
      this.redirectTo('/repos')
    })
  },

  fourOhFour () {
    this.renderPage(MessagePage, {title: '404', message: 'Nothing to see here, sorry.'})
  }
})
