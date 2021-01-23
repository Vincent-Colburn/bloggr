<template>
  <div class="PostComponent">
    <router-link :to="{ name: 'PostsDetails', params: { id: postProp.id}}">
      <div class="card d-flex">
        <div class="card-body">
          <h4 class="card-title" :contenteditable="state.editPost" @blur="editPost">
            {{ postProp.title }}
            <img class="card-img-top" :src="postProp.imgUrl" alt="">
            {{ postProp.body }}
          </h4>
          <i class="fa fa-pencil" aria-hidden="true" v-if="state.account.id == postProp.creatorId" @click="state.editPost = !state.editPost, editPost(e)"></i>
          <i class="fa fa-trash" aria-hidden="true" v-if="state.account.id == postProp.creatorId" @click="deletePost"></i>
          <p>
            Created by : {{ postProp.creator.name }}
            {{ postProp.creator.picture }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { postService } from '../services/PostService'
export default {
  name: 'PostComponent',
  props: {
    postProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      editPost: false,
      comments: computed(() => AppState.comments),
      editComment: false
    })
    return {
      state,
      deletePost() {
        try {
          postService.deletePost(props.postProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      editPost(e) {
        try {
          postService.editPost(props.postProp.id, e.target.innerText)
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
