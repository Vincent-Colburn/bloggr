<template>
  <div class="row">
    <div class="CommentComponent">
      <div class="card">
        <div class="card-body">
          <div class="card-body">
            <h4 class="card-title" :contenteditable="state.editComment" @blur="editComment">
              {{ commentProp.creator.name }}
              {{ commentProp.body }}
            </h4>
            <i class="fa fa-pencil" aria-hidden="true" v-if="state.account.id == commentProp.creatorId" @click="state.editComment = !state.editComment, editComment(e)"></i>
            <i class="fa fa-trash" aria-hidden="true" v-if="state.account.id == commentProp.creatorId" @click="deleteComment"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
export default {
  name: 'CommentComponent',
  props: {
    commentProp: { type: Object, required: true },
    postId: { type: String, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments)
    })
    return {
      state,
      deleteComment() {
        try {
          commentService.deleteComment(props.commentProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      editComment(e) {
        try {
          commentService.editcomment(props.postProp.id, props.commentProp.id, e.target.innerText)
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
