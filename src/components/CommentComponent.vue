<template>
  <div class="row mx-3">
    <div class="CommentComponent">
      <div class="card">
        <h4 class="card-title" :contenteditable="state.editComment" @blur="editComment">
          {{ commentProp.creator.name }} :
        </h4>
        <div class="card-body">
          <div class="card-body" :contenteditable="state.editComment" @blur="editComment">
            {{ commentProp.body }}
            <!-- id maybe? {{ commentProp.id }} -->
            <i class="fa fa-pencil mx-3" aria-hidden="true" v-if="state.account.id == state.user" @click="state.editComment = !state.editComment, editComment(e)"></i>
            <i class="fa fa-trash mx-3 " aria-hidden="true" v-if="state.account.id == state.user" @click="deleteComment"></i>
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
    postId: { type: String, required: true },
    creator: { type: Object, required: true },
    body: { type: Object, required: true },
    blog: { type: Object, ref: 'Blog', required: true }
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
          const id = props.commentProp.id
          commentService.deleteComment(id)
        } catch (error) {
          logger.error(error)
        }
      },
      editComment(e) {
        try {
          const editedComment = e.target.innerText
          console.log('look right here for comment edit', editedComment)
          commentService.editComment(props.commentProp.id, editedComment)
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
