import Model from 'ampersand-model'
import Labels from './label-collection'

export default Model.extend({
  initialize () {
    this.listenTo(this.labels, 'sync', () => {
      this.fetchedLabels = true
    })
  },

  url () {
    return 'https://api.github.com/repos/' + this.full_name
  },

  props: {
    id: 'number',
    full_name: 'string',
    name: 'string'
  },

  session: {
    fetchedLabels: {
      type: 'boolean',
      default: false
    }
  },

  derived: {
    app_url () {
      return '/repo/' + this.full_name
    }
  },

  collections: {
    labels: Labels
  },

  fetch () {
    Model.prototype.fetch.apply(this, arguments)
    this.labels.fetch()
  }
})
