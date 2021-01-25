<template>
  <div class="about text-center">
    <h1>Welcome {{ state.account.name }}</h1>
    <img class="rounded" :src="state.account.picture" alt="" />
    <p>{{ state.user.email }}</p>
    <!-- </div> -->

    <!-- <router-link :to="{ name: 'PostsDetails', params: { id: postProp.id}}"> -->
    <div class="row d-flex container-fluid text-center justify-content-center align-items-center">
      <div class="col-4">
        <AccountPostComponent v-for="post in posts" :key="post.id" :post-prop="post" />
      </div>
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { postService } from '../services/PostService'
// import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'AccountPostComponent',
  props: {
    title: { type: String, required: true },
    body: { type: String, required: true },
    // imgUrl: { type: String },
    // tags: [{ type: String }],
    published: { type: Boolean, default: true }
    // creator: { type: String, required: true }
  },
  setup() {
    // const router = useRouter()
    const state = reactive({
      newPost: {},
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await postService.getAccountPosts()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      posts: computed(() => AppState.accountPosts),
      account: computed(() => AppState.account)

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
