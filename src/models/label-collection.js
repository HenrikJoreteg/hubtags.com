import Collection from 'ampersand-rest-collection'
import githubMixin from '../helpers/github-mixin'
import Label from './label'

export default Collection.extend(githubMixin, {
  model: Label,

  url () {
    return 'https://api.github.com/repos/' + this.parent.full_name + '/labels'
  }
})
