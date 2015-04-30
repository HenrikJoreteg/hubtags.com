import React from 'react'

export default React.createClass({
  displayName: 'RepoItem',

  propTypes: {
    full_name: React.PropTypes.string.isRequired,
    app_url: React.PropTypes.string.isRequired
  },

  render () {
    const {full_name, app_url} = this.props
    return (
      <div>
        <span className='octicon octicon-repo'></span> <a href={app_url}>{full_name}</a>
      </div>
    )
  }
})
