import app from 'ampersand-app'
import React from 'react'
import localLinks from 'local-links'

export default React.createClass({
  displayName: 'PublicPage',
  onLoginClick (event) {
    event.preventDefault()
    app.router.history.navigate('/login', { trigger: true })
  },
  render () {
    return (
      <div className='container'>
        <header role='banner'>
          <h1>HubTags</h1>
          <p>Open source demo app, built with Ampersand.js and React by <a href='http://twitter.com/henrikjoreteg'>@HenrikJoreteg</a></p>
          <p>Source <a href='https://github.com/henrikjoreteg/hubtags.com'>available on GitHub</a>.</p>
        </header>
        <div>
          <a href='/login' onClick={this.onLoginClick} className='button button-large'>
            <span className='mega-octicon octicon-mark-github'></span> Login with GitHub
          </a>
        </div>
      </div>
    )
  }
})
