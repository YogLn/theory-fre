<template>
  <div class="container">
    <top-bar />

    <div class="comment">
      <a-comment>
        <a slot="author">{{this.author.name}}</a>
        <a-avatar slot="avatar" v-if="author.avatarUrl" :src="commentInfo.author.avatarUrl" />
        <a-avatar slot="avatar" v-else src="http://121.4.100.103:5000/users/3/avatar" />
        <p slot="content">{{commentInfo.content}}</p>
        <a-tooltip slot="datetime">
          <span>{{ commentInfo.updateTime}}</span>
        </a-tooltip>
        <div class="pictrue" v-if="commentInfo.images">
          <div v-for="(item, index) in commentInfo.images" :key="index">
            <img  :src="item" alt="">
          </div>
        </div>

        <a-divider />

        <a-comment v-for="(item, index) in comments" :key="index">
          <template v-if="!item.commentId">
            <span slot="actions" key="comment-nested-reply-to" @click="showDialog(item.id)">回复</span>
            <span slot="actions" v-if="item.user.id == userId" key="comment-nested-delete-to" @click="deleteComment(item)">删除</span>
            <a slot="author">{{item.user.name}}</a>
            <a-avatar slot="avatar" v-if="item.user.avatarUrl" :src="item.user.avatarUrl" />
            <a-avatar slot="avatar" v-else src="http://121.4.100.103:5000/users/3/avatar" />
            <p slot="content">{{item.content}}</p>
            <a-tooltip slot="datetime">
              <span>{{ formateTime(item.createTime)}}</span>
            </a-tooltip>
            <a-divider />
          </template>
          <div v-for="(it, id) in comments" :key="id">
            <a-comment v-if="item.id == it.commentId">
              <span slot="actions" key="comment-nested-reply-to" @click="showDialog(it.id)">回复</span>
              <span slot="actions" v-show="it.user.id == userId" key="comment-nested-delete-to" @click="deleteComment(it.id)">删除</span>
              <a slot="author">{{it.user.name}}</a>
              <a-avatar slot="avatar" v-if="it.user.avatarUrl" :src="it.user.avatarUrl" />
              <a-avatar slot="avatar" v-else src="http://121.4.100.103:5000/users/3/avatar" />
              <p slot="content">{{it.content}}</p>
              <a-tooltip slot="datetime">
                <span>{{ formateTime(it.createTime)}}</span>
              </a-tooltip>
              <a-divider />
            </a-comment>
          </div>
        </a-comment>
      </a-comment>

      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" v-model="commentContent" allowClear />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitLoading" type="primary" @click="handleComment">
            添加评论
          </a-button>
        </a-form-item>
      </div>
    </div>

    <!-- 其他的组件 -->
    <a-modal v-model="modalVisible" title="回复评论" centered @ok="replay()">
      <a-form-model :model="replayComment" ref="replayRef">
        <a-form-item>
          <a-textarea :rows="4" v-model="replayComment.content" allowClear />
        </a-form-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import TopBar from '../home/TopBar.vue'
import { formateTime } from '../../utils/format-time'
export default {
  components: { TopBar },
  data() {
    return {
      formateTime,
      momentId: '',
      commentId: '',
      comments: {},
      author: {},
      commentInfo: {},
      commentContent: '',
      submitLoading: false,
      modalVisible: false,
      replayComment: {
        content: '',
      },
      userId: '',
    }
  },
  created() {
    this.userId = window.sessionStorage.getItem('id')
    this.momentId = this.$route.params.momentId
    this.getCommentById(this.$route.params.momentId)
  },
  methods: {
    async getCommentById(momentId) {
      const res = await this.$http.get(`/moment/${momentId}`)
      if (res.status !== 200) {
        return this.$message.error('获取评论列表失败')
      }
      this.commentInfo = res.data
      this.author = res.data.author
      this.comments = res.data.comments
    },
    async handleComment() {
      const res = await this.$http.post(`/comment`, {
        momentId: this.momentId,
        content: this.commentContent,
      })
      if (res.status !== 200) {
        return this.$message.error('评论失败')
      }
      this.commentContent = ''
      this.$message.success('评论成功')
      this.getCommentById(this.momentId)
    },
    async replay() {
      const { content } = this.replayComment
      const res = await this.$http.post(`/comment/${this.commentId}/replay`, {
        momentId: this.momentId,
        content: content,
      })
      if (res.status !== 200) {
        return this.$message.error('回复评论失败')
      }
      this.$message.success('回复评论成功')
      this.getCommentById(this.$route.params.momentId)
      this.replayComment.content = ''
      this.modalVisible = false
    },
    deleteComment(id) {
      this.$confirm({
        title: '警告',
        content: '确认删除这条评论吗?',
        onOk: async () => {
          const res = await this.$http.del(`/comment/${id}`)
          if(res.status !== 200) {
            return this.$message.error('删除评论失败')
          }
          this.$message.success('删除评论成功')
          this.getCommentById(this.momentId)
        },
        onCancel: () => {
          this.$message.info('已取消删除')
        },
      })
    },

    /**
     * 其他
     */
    showDialog(id) {
      this.commentId = id
      this.modalVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  .comment {
    margin-top: 50px;
    width: 60%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    .pictrue {
      display: flex;
      justify-content: space-between;
      img {
        width: 200px;
      }
    }
  }
}
</style>