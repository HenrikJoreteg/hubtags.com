import Model from 'ampersand-model'
import githubMixin from '../helpers/github-mixin'
import xhr from '../helpers/github-xhr'

export default Model.extend(githubMixin, {
  idAttribute: 'name',

  props: {
    name: 'string',
    color: {
      type: 'string',
      default: '000000'
    }
  },

  session: {
    saved: {
      type: 'boolean',
      default: true
    },
    editing: {
      type: 'boolean',
      default: false
    }
  },

  isNew () {
    return !this.saved
  },

  update (attrs) {
    const old = this.toJSON()

    xhr({
      url: this.url(),
      method: 'PATCH',
      json: attrs
    }, (err) => {
      if (err) {
        this.set(old)
        console.error('Failed to update label, check yo wifi, yo')
      } else {
        this.saved = true
      }
    })
    this.set(attrs)
  }
})
