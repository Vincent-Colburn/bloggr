import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentService {
  // async getAll() {
  //   const res = await api.get()
  // }
  async createComment(newComment, creator, id) {
    console.log('dis right hur is your comment creator', creator)
    console.log('dis right hur stinky id', id)
    console.log('this is our state user', newComment)
    const addComment = { newComment, creator, id }
    const res = await api.post('/comments', addComment)
    // const res = await api.post('blogs/', commentData, id, creator)
    console.log('this is your service getting comments', res)
    console.log('this is your resdata pushing to appst', res.data)
    AppState.comments.push(res.data)
    return res.data.id
  }

  async editComment(commentId, postId, newBody) {
    const commentData = { body: newBody }
    const res = await api.put('api/blogs' + postId + 'comments' + commentId, commentData)
    console.log('this is your service editing the comment', res)

    const commentInd = AppState.comments.findIndex(c => c.id === commentId)
    AppState.comments.splice(commentInd, 1, res.data)
  }

  async deleteComment(postId, commentId) {
    await api.delete('api/blogs' + postId, commentId)

    const commentInd = AppState.posts.findIndex(c => c.id === commentId)
    AppState.comments.splice(commentInd, 1)
  }
}

export const commentService = new CommentService()
