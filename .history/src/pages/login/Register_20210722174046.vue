<template>
  <div class="container">
    <div class="login-box">
      <div class="login-header">
        <span>欢迎注册</span>
      </div>
      <div class="login-form">
        <a-form-model ref="registerFormRef"
                      :model="registerForm"
                      v-bind="layout"
                      :rules="loginFormRules">
          <a-form-model-item label="用户名"
                             prop="name">
            <a-input v-model="registerForm.name"
                     type="text"
                     autocomplete="off"
                     placeholder="请输入用户名" />
          </a-form-model-item>
          <a-form-model-item label="密码"
                             prop="password">
            <a-input v-model="registerForm.password"
                     type="password"
                     autocomplete="off"
                     placeholder="请输入密码" />
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="login-btn">
        <a-button type="primary"
                  class="btn-login"
                  @click="register">注册</a-button>
        <a-button @click="back">返回</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Mixin } from '../../mixin'
import Show from './Show.vue'
export default {
  components: { Show },
  mixins: [Mixin],
  created() { },
  data() {
    return {
      registerForm: {
        name: '',
        password: '',
      }
    }
  },
  methods: {
    register() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return this.$message.warning('请正确填写注册信息')
        const res = await this.$http.post('/users', this.registerForm)
        if (res.status !== 200) return this.$message.error('注册失败')
        this.$message.success('注册成功')
        window.sessionStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('id', res.data.id)
        this.$router.push('/home')
      })
    },
    back() {
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .login-box {
    display: relative;
    padding: 40px 10px;
    width: 350px;
    height: 300px;
    background: rgba(255, 255, 255, 0.6);
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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