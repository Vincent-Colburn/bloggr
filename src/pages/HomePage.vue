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
          <button>Create a shitpost  </button>
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
          const id = await postService.createPost(state.newPost)
          state.newPost = {}
          router.push({ name: 'PostDetails', params: { id } })
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
