import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import RepoItem from '../components/repo-item'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'Repos',

  propTypes: {
    repos: React.PropTypes.object.isRequired
  },

  componentWillMount () {
    this.props.repos.fetch()
  },

  render () {
    const {repos} = this.props

    return (
      <div>
        <h2>Repositories</h2>
        <div>
          {repos.map((repo) => {
            const attrs = repo.getAttributes({derived: true, props: true})
            return (<RepoItem key={repo.id} {...attrs}/>)
          })}
        </div>
      </div>
    )
  }
})
