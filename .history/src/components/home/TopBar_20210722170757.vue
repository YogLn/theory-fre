<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <span class="logo">Forum</span>
      </div>
      <div class="center">
        <router-link v-for="(item, index) in title"
                     :class="currentIndex === index ? 'active' : ''"
                     :to="item.path"
                     :key="index"
                     class="title-item"
                     @click.native="titleClick(index)">
          {{item.name}}
        </router-link>
      </div>
      <div class="right">
        <img :src="avatarUrl"
             alt="">
        <!-- 下拉菜单 -->
        <a-dropdown>
          <a class="ant-dropdown-link"
             @click="e => e.preventDefault()">
            {{username}}
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-upload list-type="picture"
                        @change="changeAvatar"
                        :action="uploadURL"
                        :headers="headerObj">
                <a href="javascript:;">修改头像</a>
              </a-upload>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;"
                 @click="loginOut">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 个人信息
      username: '',
      avatarUrl: '',
      currentIndex: 0,
      title: [
        {
          name: '首页',
          path: '/moment',
        },
        {
          name: '动态',
          path: '/upload',
        }
      ],
      headerObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      uploadURL: 'http://121.4.100.103:5000/upload/avatar',
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const userId = window.sessionStorage.getItem('id')
      const { data: res } = await this.$http.get(`/users/${userId}`)
      this.username = res.name
      if (res.avatar_url) {
        this.avatarUrl = res.avatar_url
      } else {
        // 选取的默认头像
        this.avatarUrl = 'http://121.4.100.103:5000/users/1/avatar'
      }
    },
    async changeAvatar({ fileList }) {
      const avatarList = fileList
      const formData = new FormData()
      console.log(avatarList)
      formData.append('avatar', avatarList[0].originFileObj)
      const res = await this.$http.post('/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: window.sessionStorage.getItem('token'),
        },
      })
      if (res.status !== 200) {
        return this.$message.error('修改头像失败')
      }
      return this.$message.success('修改头像成功')
    },
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    titleClick(index) {
      this.currentIndex = index
    },
  },
}
</script>

<style lang="less" scoped>
.home {
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  .header {
    display: flex;
    align-items: center;
    background-color: #8c8c8c;
    .left {
      .logo {
        // background-image: -webkit-linear-gradient(bottom, red, #fd8403, yellow);
        height: 60px;
        color: #f35626;
        background: coral;
        background-image: -webkit-linear-gradient(45deg, #f35626, #feab3a);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-animation: hue6sinfinitelinear;
        font-size: 32px;
        padding: 0 8px;
        font-weight: 900;
        cursor: pointer;
      }
    }
    .center {
      display: flex;
      justify-content: center;
      height: 50px;
      width: 84%;
      .title-item {
        padding: 0 20px;
        line-height: 50px;
        font-size: 18px;
        cursor: pointer;
      }
      .active {
        font-size: 22px;
        text-shadow: 0.2px 0;
        color: #fff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
        margin: 0 8px;
      }
    }
  }
}
</style>