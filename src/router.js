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
    if (app.me.token) {
      this[name].apply(this, arguments)
    } else {
      this.redirectTo('/')
    }
  }
}

export default Router.extend({
  renderPage (page, opts = {layout: true}) {
    if (opts.layout) {
      page = (
        <Layout me={app.me}>
          {page}
        </Layout>
      )
    }

    React.render(page, document.body)
  },

  routes: {
    '': 'home',
    'repos': auth('repos'),
    'login': 'login',
    'logout': 'logout',
    'auth/callback?:query': 'authCallback',
    'repo/:owner/:reponame': auth('repoDetail'),
    '*404': 'fourOhFour'
  },

  home () {
    this.renderPage(<PublicPage/>, {layout: false})
  },

  repos () {
    this.renderPage(<HomePage repos={app.me.repos}/>)
  },

  repoDetail (owner, repoName) {
    const repo = app.me.repos.getModelByName(owner + '/' + repoName)
    this.renderPage(<RepoDetailPage repo={repo} labels={repo.labels}/>)
  },

  login () {
    window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
      client_id: config.clientId,
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'user,repo'
    })
  },

  logout () {
    window.localStorage.clear()
    window.location = '/'
  },

  authCallback (query) {
    query = qs.parse(query)

    xhr({
      url: 'https://github-secret-keeper.herokuapp.com/' + config.clientId + '/' + query.code,
      json: true
    }, (err, resp, body) => {
      if (err) {
        console.error('could not get token', err, body)
      } else {
        app.me.token = body.access_token
        this.redirectTo('/repos')
      }
    })

    this.renderPage(<MessagePage title='Loading...' message='Fetching Github Data'/>)
  },

  fourOhFour () {
    this.renderPage(<MessagePage title='404' message='Nothing to see here, sorry.'/>)
  }
})
