import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import Label from '../components/label'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'RepoDetailPage',

  propTypes: {
    repo: React.PropTypes.object.isRequired
  },

  onAddClick () {
    this.props.repo.labels.add({
      saved: false,
      editing: true
    }, {at: 0})
  },

  render () {
    const {repo} = this.props

    let list

    // if we've fetched 'em
    if (repo.fetchedLabels) {
      if (repo.labels.length) {
        list = repo.labels.map((label) => {
          return <Label key={label.name} label={label}/>
        })
      } else {
        list = (
          <p>No Labels</p>
        )
      }
    } else {
      list = <p>Fetching Labels...</p>
    }
    return (
      <div>
        <h3>{repo.full_name} Labels</h3>
        <p>
          <button className='button' onClick={this.onAddClick}><span className='octicon octicon-plus'></span> Add New</button>
        </p>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
})
