<template>
  <div class="mainPage row d-xl-flex container-fluid">
    <div class="col-10 align-items-center">
      <div class="row d-flex bg-dark text-light text-center justify-content-center align-items-center">
        <h1 class="text-center">
          Welcome to Discount Reddit
        </h1>
      </div>
      <div class="row text-center justify-content-center align-items-center">
        <div v-if="state.user.isAuthenticated" class="">
          <div class="col">
            <form class="form-inline border justify-content-center align-items-center" @submit.prevent="createPost">
              <div>
                <p>Enter post information below below: </p>
                <label for="">Enter Post Here </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  v-model="state.newPost.title"
                  placeholder="Enter you Title here..."
                  class="form-control d-flex"
                  aria-describedby="helpId"
                />

                <input
                  type="text"
                  name="body"
                  id="body"
                  v-model="state.newPost.body"
                  placeholder="Enter you body here..."
                  class="form-control d-flex"
                  aria-describedby="postId"
                />
                <input
                  type="text"
                  name="imgUrl"
                  id="imgUrl"
                  v-model="state.newPost.imgUrl"
                  placeholder="Enter you imgUrl here..."
                  class="form-control d-flex"
                  aria-describedby="helpId"
                />
                <input
                  type="hidden"
                  name="creator"
                  id="{{state.user}}"
                  v-model="state.newPost.creator"
                  placeholder="Enter you comment here..."
                  class="form-control d-flex"
                  aria-describedby="postId"
                />

                <!-- <input type="hidden" name="{{state.Blog.ObjectId}}" value="{{ state.post.id }}" />
            <input type="hidden" name="creator" value="{{ state.user }}" /> -->
                <button type="submit" class="btn btn-success">
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="row d-flex container-fluid text-center justify-content-center align-items-center">
        <div class="col-4">
          <PostComponent v-for="post in posts" :key="post.id" :post-prop="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { postService } from '../services/PostService'
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  props: {
    title: { type: String, required: true },
    body: { type: String, required: true },
    imgUrl: { type: String },
    tags: [{ type: String }],
    published: { type: Boolean, default: true },
    creator: { type: String, required: true }
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      newPost: {},
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await postService.getPosts()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      posts: computed(() => AppState.posts),
      async createPost() {
        try {
          console.log('this is what you are looking for', state.newPost)
          const id = await postService.createPost(state.newPost)
          state.newPost = {}
          router.push({ name: 'PostsDetails', params: { id } })
        } catch (error) {
          logger.error(error)
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
