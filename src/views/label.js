import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import assign from 'lodash.assign'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'Label',

  getInitialState () {
    const {name, color} = this.props.label
    return {
      name: name,
      color: color
    }
  },

  propTypes: {
    label: React.PropTypes.object.isRequired
  },

  onChangeName (event) {
    const input = event.target
    let res = {}
    res[input.name] = input.value
    this.setState(res)
  },

  onChangeColor (event) {
    const color = event.target.value
    this.setState({color: color.slice(1)})
  },

  onDeleteClick (event) {
    this.props.label.destroy()
    event.preventDefault()
  },

  onToggleEditClick (event) {
    const {label} = this.props
    label.editing = !label.editing
  },

  onSubmit (e) {
    e.preventDefault()
    const {label} = this.props
    if (label.saved) {
      label.update(this.state)
    } else {
      label.save(assign({editing: false}, this.state))
    }
  },

  render () {
    const {color, name} = this.state
    const cssColor = '#' + color

    if (this.props.label.editing) {
      return (
        <form onSubmit={this.onSubmit} className='label'>
          <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
          <input value={name} onChange={this.onChangeName} name='name'/>
          <input value={cssColor} onChange={this.onChangeColor} name='color'/>
          <button type='submit' className='button button-small'>Save</button>
          <button onClick={this.onToggleEditClick} type='button' className='button button-small button-unstyled'>cancel</button>
        </form>
      )
    } else {
      return (
        <div className='label'>
          <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
          <span>{name}</span>
          <a href='#' onClick={this.onToggleEditClick}><span className='octicon octicon-pencil'></span></a>
          <a href='#' onClick={this.onDeleteClick}><span className='octicon octicon-x'></span></a>
        </div>
      )
    }
  }
})
