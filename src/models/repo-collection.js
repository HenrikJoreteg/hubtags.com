import Collection from 'ampersand-rest-collection'
import RepoModel from './repo'
import githubMixin from '../helpers/github-mixin'

export default Collection.extend(githubMixin, {
  url: 'https://api.github.com/user/repos',

  model: RepoModel,

  getModelByName (name) {
    let model = this.findWhere({full_name: name})
    if (!model) {
      model = new RepoModel({full_name: name})
    }
    model.fetch()
    return model
  }
})
