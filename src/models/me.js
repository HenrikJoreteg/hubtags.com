import Model from 'ampersand-model'
import githubMixin from '../helpers/github-mixin'
import RepoCollection from './repo-collection'

export default Model.extend(githubMixin, {
  url: 'https://api.github.com/user',

  initialize () {
    const token = window.localStorage.token

    if (token) {
      this.token = token
    }

    this.on('change:isLoggedIn', this.fetchAll)

    this.on('change:token', () => {
      window.localStorage.token = this.token
    })

    this.on('change:loggedIn', this.onLoginChange, this)
  },

  props: {
    token: 'string',
    login: 'string',
    'avatar_url': 'string'
  },

  derived: {
    loggedIn () {
      return !!this.token
    }
  },

  collections: {
    repos: RepoCollection
  },

  onLoginChange (model, val) {
    if (val) {
      this.fetch()
    } else {
      // wipe local data
      window.localStorage.clear()
    }
  }
})
