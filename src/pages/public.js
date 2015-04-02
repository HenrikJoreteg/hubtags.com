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
      <div className="container">
        <header role="banner">
          <h1>LabelFor.me</h1>
          <p>Don&apos;t even try to label me, yo. Or do and see if I care. Whatevs.&trade;</p>
        </header>
        <div>
          <a href="/login" onClick={this.onLoginClick} className="button button-large">
            <span className="mega-octicon octicon-mark-github"></span> Login with GitHub
          </a>
        </div>
      </div>
    )
  }
})
