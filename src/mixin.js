export const Mixin = {
  data() {
    return {
      loginFormRules:  {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },

      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
    }
  },
}