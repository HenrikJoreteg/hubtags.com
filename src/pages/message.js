import React from 'react'

export default React.createClass({
  displayName: 'ErrorPage',

  propTypes: {
    title: React.PropTypes.string,
    message: React.PropTypes.string.isRequired
  },

  render () {
    const {title, message} = this.props
    return (
      <div>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    )
  }
})
