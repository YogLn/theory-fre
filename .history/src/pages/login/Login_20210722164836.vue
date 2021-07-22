<template>
  <div class="container">
    <div class="item yellow">
      <p>大家好！<br />&nbsp;&nbsp;&nbsp;&nbsp;我是YogLn</p>
    </div>
    <div class="item blue">
      <p>大家好！<br />&nbsp;&nbsp;&nbsp;&nbsp;我是YogLn</p>
    </div>
    <div class="item green">
      <p>大家好！<br />&nbsp;&nbsp;&nbsp;&nbsp;我是YogLn</p>
    </div>
    <div class="item pink">
      <p>大家好！<br />&nbsp;&nbsp;&nbsp;&nbsp;我是YogLn</p>
    </div>
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
export default {
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
.container {
  height: 100vh;
  position: relative;

  .item {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 66px;
    font-style: italic;
    transform: translate(-100%);
  }

  .item p {
    letter-spacing: 0.2em;
    color: #fff;
    transform: translateX(-190%);
  }

  .yellow {
    background-color: rgb(160, 160, 26);
    animation: bg 0.3s linear forwards;
  }
  .yellow p {
    animation: text 3s 0.3s cubic-bezier(0, 0.49, 0, 1) forwards;
  }

  .blue {
    background-color: rgb(36, 61, 143);
    clip: rect(0, 1100px, 100vh, 0);
    animation: bg 2.4s 0.6s cubic-bezier(0, 0.49, 0, 1) forwards;
  }
  .blue p {
    animation: text 2.4s 0.6s cubic-bezier(0, 0.49, 0, 1) forwards;
  }

  .green {
    background-color: rgb(34, 126, 57);
    clip: rect(0, 920px, 100vh, 0);
    animation: bg 2.1s 0.9s cubic-bezier(0, 0.49, 0, 1) forwards;
  }
  .green p {
    animation: text 2.1s 0.9s cubic-bezier(0, 0.49, 0, 1) forwards;
  }

  .pink {
    background-color: rgb(192, 55, 139);
    clip: rect(0, 780px, 100vh, 0);
    animation: bg 1.8s 1.2s cubic-bezier(0, 0.49, 0, 1) forwards;
  }
  .pink p {
    animation: text 1.8s 1.2s cubic-bezier(0, 0.49, 0, 1) forwards;
  }

  @keyframes bg {
    from {
      transform: translate(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes text {
    from {
      transform: translate(-190%);
    }
    to {
      transform: translateX(0);
    }
  }

  .login-box {
    display: relative;
    padding: 40px 10px;
    width: 350px;
    height: 300px;
    background: rgba(255, 255, 255, 0.6);
    position: fixed;
    left: 72%;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.2;
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
}
</style>