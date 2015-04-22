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
    event.preventDefault()
    const {label} = this.props
    label.editing = !label.editing
  },

  onSubmit (e) {
    e.preventDefault()
    const {label} = this.props
    if (label.saved) {
      label.update(this.state)
    } else {
      label.save(this.state)
    }
    label.editing = false
  },

  render () {
    const {color, name} = this.state
    const cssColor = '#' + color
    let content

    if (this.props.label.editing) {
      content = (
        <form onSubmit={this.onSubmit} className='label-form form-inline'>
          <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
          <div className='form-element'>
            <label htmlFor='name'>name</label>
            <input value={name} onChange={this.onChangeName} name='name' className='form-input'/>
          </div>
          <div className='form-element'>
            <label htmlFor='name'>color</label>
            <input value={name} onChange={this.onChangeColor} name='color' className='form-input'/>
          </div>
          <button type='submit' className='button button'>Save</button>
          <button onClick={this.onToggleEditClick} type='button' className='button button-unstyled'>cancel</button>
        </form>
      )
    } else {
      content = (
        <div className='label-view'>
          <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
          <span>{name}</span>
          <a href='#' onClick={this.onToggleEditClick}><span className='octicon octicon-pencil'></span></a>
          <a href='#' onClick={this.onDeleteClick}><span className='octicon octicon-x'></span></a>
        </div>
      )
    }

    return <div>{content}</div>
  }
})
