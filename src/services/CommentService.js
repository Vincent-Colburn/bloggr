import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentService {
  // async getAll() {
  //   const res = await api.get()
  // }
  async getOne(id) {
    const res = await api.get('comments/' + id)
    AppState.activeComment = res.data
  }

  async createComment(newComment) {
    console.log('this is service where newComment is', newComment)

    const res = await api.post('/comments', newComment)
    console.log('this is your service getting comments', res)
    console.log('this is your resdata pushing to appst', res.data)
    AppState.comments.push(res.data)
  }

  async editComment(id, editedComment) {
    const commentData = { body: editedComment }
    const res = await api.put('comments/' + id, commentData)
    console.log('this is your service editing the comment', res)

    const commentInd = AppState.comments.findIndex(c => c.id === id)
    AppState.comments.splice(commentInd, 1, res.data)
  }

  async deleteComment(commentId) {
    await api.delete('comments/' + commentId)

    const commentInd = AppState.posts.findIndex(c => c.id === commentId)
    AppState.comments.splice(commentInd, 1)
  }
}

export const commentService = new CommentService()

// account stuff that broke everything

// class CommentService {
//   // async getAll() {
//   //   const res = await api.get()
//   // }
//   async getOne(id) {
//     const res = await api.get('comments/' + id)
//     AppState.activeComment = res.data
//   }

//   async createComment(newComment) {
//     console.log('this is service where newComment is', newComment)

//     const res = await api.post('api//comments', newComment)
//     console.log('this is your service getting comments', res)
//     console.log('this is your resdata pushing to appst', res.data)
//     AppState.comments.push(res.data)
//   }

//   async editComment(id, editedComment) {
//     const commentData = { body: editedComment }
//     const res = await api.put('api/comments/' + id, commentData)
//     console.log('this is your service editing the comment', res)

//     const commentInd = AppState.comments.findIndex(c => c.id === id)
//     AppState.comments.splice(commentInd, 1, res.data)
//   }

//   async deleteComment(commentId) {
//     await api.delete('api/comments/' + commentId)

//     const commentInd = AppState.posts.findIndex(c => c.id === commentId)
//     AppState.comments.splice(commentInd, 1)
//   }
// }

// export const commentService = new CommentService()
