<template>
  <div class="container">
    <div class="moment">
      <a-list item-layout="vertical"
              size="large"
              :data-source="momentList">
        <a-list-item slot="renderItem"
                     key="item.title"
                     slot-scope="item">
          <template slot="actions">
            <span key="type">
              <a-icon type="star"
                      style="margin-right: 8px" />
              <span class="actionTitle">99</span>
              <a-icon type="like"
                      style="margin-right: 8px" />
              <span class="actionTitle">99</span>
              <a-icon type="message"
                      style="margin-right: 8px"
                      @click="oprate(item.id)" />
              <span class="actionTitle">{{item.commentCount}}</span>
              <a-icon v-if="item.author.id == userId"
                      type="delete"
                      style="margin-right: 8px"
                      @click="deleteMomentById(item.id)" />
              <span class="actionTitle"></span>
            </span>
          </template>
          <img slot="extra"
               width="272"
               alt="logo"
               :src="item.images ? item.images[0] : 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'" />
          <a-skeleton :loading="loading"
                      active
                      avatar>
            <a-list-item-meta :description="item.author.name + ' ' +formateDate(item.updateTime)">
              <a slot="title"
                 :href="item.href">{{ item.title }}</a>
              <a-avatar slot="avatar"
                        :src="item.author.avatarUrl ?item.author.avatarUrl: 'http://121.4.100.103:5000/users/1/avatar'" />
            </a-list-item-meta>
            {{ item.content }}
          </a-skeleton>
        </a-list-item>
      </a-list>
      <!-- 分页 -->
      <div class="pagination">
        <a-pagination show-quick-jumper
                      :default-current="1"
                      :total="count"
                      @change="changePage" />
      </div>
    </div>
    <div class="back-top">
      <a-back-top />
    </div>
  </div>
</template>

<script>
import { formateDate } from '../../utils/format-time'
export default {
  created() {
    this.getMomentList()
    this.userId = window.sessionStorage.getItem('id')
  },
  data() {
    return {
      userId: '',
      momentList: [],
      count: 10,
      query: {
        offset: 0,
        size: 10,
      },
      formateDate,
      loading: true,

      // 点赞和收藏
      isLike: false,
      isStar: false,
    }
  },
  methods: {
    async getMomentList() {
      const { data: res } = await this.$http.get('/moment', this.query)
      console.log(res)
      this.momentList = res
      this.count = res[0].count
      this.loading = false
    },
    async deleteMomentById(id) {
      this.$confirm({
        title: '警告',
        content: '确认删除您的这条动态吗?',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const res = await this.$http.del(`/moment/${id}`)
          if (res.status !== 200) {
            return this.$message.error('删除动态失败')
          }
          this.$message.success('删除动态成功')
          this.getMomentList()
        },
        onCancel: () => {
          this.$message.info('已取消删除')
        },
      })
    },
    changePage(page) {
      this.query.offset = (page - 1) * 10
      this.getMomentList()
    },
    oprate(id) {
      this.$router.push(`/moment/${id}`)
    },
  },
}
</script>

<style lang="less" scoped>
.skeleton-demo {
  border: 1px solid #f4f4f4;
}
.container {
  .moment {
    position: relative;
    margin-top: 50px;
    width: 60%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    .pagination {
      text-align: center;
      margin: 20px 0;
    }

    .actionTitle {
      font-size: 8px;
      margin-right: 16px;
    }
  }
}
</style>