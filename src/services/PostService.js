import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostService {
  async getPosts() {
    const res = await api.get('blogs')
    console.log('this is your service doing the get all', res)
    AppState.posts = res.data
  }

  async getOne(id) {
    const res = await api.get('blogs/' + id)
    AppState.activePost = res.data
  }

  async getComments(postId) {
    const res = await api.get('blogs/' + postId + '/comments')
    console.log('this is your service getting the comments', res)
    AppState.comments = res.data
  }

  async createPost(postData) {
    const res = await api.post('blogs', postData)
    AppState.posts.push(res.data)
    console.log('this is your service creating the post', res)
  }

  async deletePost(postId) {
    await api.delete('api/blogs' + postId)
    const postInd = AppState.posts.findIndex(p => p.id === postId)
    AppState.posts.splice(postInd, 1)
  }

  async editPost(postId, newTitle) {
    const postData = { title: newTitle }
    const res = await api.put('blogs/' + postId, postData)
    console.log('this is yoru service editing the post')

    const postInd = AppState.posts.findIndex(p => p.id === postId)
    AppState.posts.splice(postInd, 1, res.data)
    this.getPosts()
  }
}

export const postService = new PostService()
