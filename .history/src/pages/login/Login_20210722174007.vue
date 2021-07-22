<template>
  <div class="container">
    <show />
    <div class="login-box">
      <div class="login-header">
        <span>欢迎登录</span>
      </div>
      <div class="login-form">
        <a-form-model ref="loginFormRef"
                      :model="loginForm"
                      v-bind="layout"
                      :rules="loginFormRules">
          <a-form-model-item label="用户名"
                             prop="name">
            <a-input v-model="loginForm.name"
                     type="text"
                     autocomplete="off"
                     placeholder="请输入用户名" />
          </a-form-model-item>
          <a-form-model-item label="密码"
                             prop="password">
            <a-input v-model="loginForm.password"
                     type="password"
                     autocomplete="off"
                     placeholder="请输入密码" />
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="login-btn">
        <a-button type="primary"
                  class="btn-login"
                  @click="login">登录</a-button>
        <a-button @click="register">注册</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Mixin } from '../../mixin'
import Showfrom './Show.vue'
export default {
  components: { Show },
  mixins: [Mixin],
  created() { },
  data() {
    return {
      loginForm: {
        name: 'yogln',
        password: '123456',
      },
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('/login', this.loginForm)
      if (res.status !== 200) {
        return this.$message.error('登录失败')
      }
      window.sessionStorage.setItem('token', res.data.token)
      window.sessionStorage.setItem('id', res.data.id)
      this.$message.success('登录成功')
      this.$router.push('/home')
    },
    register() {
      this.$router.push('/register')
    },
  },
}
</script>

<style lang="less" scoped>
.login-box {
  display: relative;
  padding: 40px 10px;
  width: 340px;
  height: 300px;
  background: rgba(255, 255, 255, 0.6);
  position: fixed;
  left: 72%;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.8;
  .login-header {
    margin-top: -10px;
    display: flex;
    justify-content: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1.6px solid #818679;
    span {
      text-align: center;
      letter-spacing: 12px;
    }
  }
  .login-form {
    padding: 20px;
  }
  .login-btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .btn-login {
      margin: 0 10px;
    }
  }
}
</style>