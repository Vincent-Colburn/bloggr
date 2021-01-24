<template>
  <div class="row d-flex ">
    <div class="col-md-11">
      <div class="row container-fluid justify-content-center align-items-center text-center">
        <p class="mx-3">
        <!-- Post by: {{ post.creator.name }} -->
        </p><h3 class="text-center justify-items-center align-items-center" :contenteditable="state.editPost" @blur="editPost">
          {{ activePost.title }}
        </h3>
        <i class="fa fa-pencil border mx-2" aria-hidden="true" v-if="state.account.id == state.user.id" :contenteditable="state.editPost" @click="state.editPost = !state.editPost"></i>
        <i class="fa fa-trash text-danger mx-5 border" aria-hidden="true" v-if="state.account.id == state.user.id" @click="deletePost"></i>
      </div>
      <!-- {{ state.post.id }} -->
      <div class="row mx-5">
        {{ activePost.body }}
      </div>
      <!-- new end row div hurr -->
      <div class="row border-bottom">
        <img class="card-img-top" :src="activePost.imgUrl" alt="">
      </div>
      <div class="row d-flex align-items-center justify-content-center">
        <h4 class="mx-5 py-2 border-bottom">
          Join the Conversation!
        </h4>
      </div>
      <div class="row d-flex align-items-left justify-content-left">
        <div class="col">
          <form class="form-inline border justify-content-center align-items-center" @submit.prevent="createComment">
            <div>
              <p>Comment below: </p>
              <label for="">Enter your comment here </label>
              <input
                type="text"
                name="body"
                id="{{state.user}}"
                v-model="state.newComment.body"
                placeholder="Enter you comment here..."
                class="form-control d-flex"
                aria-describedby="postId"
              />
              <input
                type="hidden"
                name="blog"
                id="{{state.post.id}}"
                v-bind="state.newComment.blog"
                class="form-control d-flex"
                aria-describedby="postId"
              />

              <input
                type="hidden"
                name="creator"
                id="{{state.user}}"
                v-model="state.newComment.creator"
                class="form-control d-flex"
                aria-describedby="postId"
              />
              <!-- {{ state.user }} -->
              <!-- <input type="hidden" name="{{state.Blog.ObjectId}}" value="{{ state.post.id }}" />
            <input type="hidden" name="creator" value="{{ state.user }}" /> -->
              <button type="submit" class="btn btn-success">
                Add comment
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- <div class="row d-flex align-items-center justify-content-center border"> -->
      <CommentComponent v-for="comment in comments" :key="comment.id" :comment-prop="comment" />
      <!-- </div> -->
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
    // postProp: { type: Object, required: false },
    commentProp: { type: Object, required: true },
    creator: { type: Object, required: true },
    blog: { type: String, ref: 'Blog', required: true }
    // postId: { type: String, required: true }
    // body: { type: String, required: true }
  },
  setup() {
    const router = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      activePost: computed(() => AppState.activePost),
      post: computed(() => AppState.activePost),
      user: computed(() => AppState.user),
      newComment: {}
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
      activePost: computed(() => AppState.activePost),
      user: computed(() => AppState.user),
      async createComment(body) {
        try {
          // const blog = AppState.activePost
          // console.log('this is hopefully your new commetn', state.user)
          const body = state.newComment.body
          const creator = state.user
          const blog = state.activePost
          const addedComment = { creator, blog, body }

          await commentService.createComment(addedComment)

          // this is basically garbage
          // const blog = state.post._id
          // const creatorId = state.user
          // const object = state.newComment
          // const newData = { object, creator, blog }
          // console.log('this is your acct', newData)
          // console.log('this is your new creator', state.account.sub)
          // state.newComment = {}
          // const body =
          // let newerComment = { id, creator, state.newComment}
          // router.push({ name: 'Blog', params: { id } })
        } catch (error) {
          logger.error(error)
        }
      },
      deletePost() {
        try {
          postService.deletePost(state.post.id)
        } catch (error) {
          logger.error(error)
        }
      },
      editPost(e) {
        try {
          postService.editPost(state.post.id, e.target.innerText)
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
