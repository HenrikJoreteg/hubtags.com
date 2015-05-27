import app from 'ampersand-app'
import React from 'react'

export default React.createClass({
  displayName: 'PublicPage',

  onLoginClick (event) {
    event.preventDefault()
    app.router.history.navigate('/login')
  },

  render () {
    return (
      <div className='container'>
        <header role='banner'>
          <h1>HubTags</h1>
        </header>
        <div>
          <p>Open source app for managing your tags (labels) on GitHub.com. Built with Ampersand.js and React by <a href='http://twitter.com/henrikjoreteg'>@HenrikJoreteg</a></p>
          <p>Source <a href='https://github.com/henrikjoreteg/hubtags.com'>available on GitHub</a>.</p>
          <a href='/login' onClick={this.onLoginClick} className='button button-large'>
            <span className='mega-octicon octicon-mark-github'></span> Login with GitHub
          </a>
        </div>
      </div>
    )
  }
})
