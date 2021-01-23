<template>
  <div class="row d-flex ">
    <div class="col-md-11">
      <p class="mx-3">
        <!-- Post by: {{ post.creator.name }} -->
      </p><h3 class="text-center justify-items-center align-items-center">
        Post Title: {{ state.post.title }}
      </h3>
      <div class="row justify-content-center align-items-center text-center">
        <br>
        {{ state.post.body }}
      </div>
      <div class="row border-bottom">
        <img class="card-img-top" :src="state.post.imgUrl" alt="">
      </div>
      <div class="row d-flex align-items-center justify-content-center">
        <h4 class="mx-5 py-2 border-bottom">
          Join the Conversation!
        </h4>
      </div>
      <div class="row d-flex align-items-center justify-content-center">
        <form class="form-inline" @submit.prevent="addComment">
          <div>
            <p>Comment below: </p>
            <label for="">Enter your comment here </label>
            <input
              type="text"
              name="body"
              id="body"
              v-model="state.newComment.body"
              placeholder="Enter you comment here..."
              class="form-control d-flex"
              aria-describedby="postId"
            />
            <input />
            <!-- <input type="hidden" name="{{state.Blog.ObjectId}}" value="{{ state.post.id }}" />
            <input type="hidden" name="creator" value="{{ state.user }}" /> -->
            <button type="submit" class="btn btn-success">
              Add comment
            </button>
          </div>
        </form>
      </div>
      <div class="row d-flex align-items-center justify-content-center border">
        <CommentComponent v-for="comment in comments" :key="comment.id" :comment-prop="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
import { postService } from '../services/PostService'
export default {
  name: 'PostDetailsPage',
  props: {
    postProp: { type: Object, required: true },
    commentProp: { type: Object, required: true },
    creator: { type: String, required: true },
    blog: { type: String, ref: 'Blog', required: true }
    // body: { type: String, required: true }
  },
  setup(props) {
    const router = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      post: computed(() => AppState.activePost),
      user: computed(() => AppState.user),
      newComment: {

      },

      loaded: false
    })

    onMounted(async() => {
      try {
        await postService.getOne(router.params.id)
        await postService.getComments(router.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      // this is where the computed posts was you moved to the state
      comments: computed(() => AppState.comments),
      async addComment() {
        try {
          const id = state.post.id
          const creator = state.user
          const newComment = state.newComment
          // console.log('this is your new creator', state.account.sub)
          await commentService.createComment(newComment, creator, id)
          state.newComment = {}
          // const body =
          // let newerComment = { id, creator, state.newComment}
          // router.push({ name: 'Blog', params: { id } })
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
