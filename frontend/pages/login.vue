<template>
  <div class="login-form">
    <h4 class="form-title">登 录</h4>
    <el-form ref="loginForm" :model="ruleForm" label-width="0" :rules="rules">
      <!--    邮箱  -->
      <el-form-item prop="email">
        <div class="form-line">
          <svg-icon icon-class="email" class-name="normall-icon"></svg-icon>
          <el-input placeholder="邮箱" v-model="ruleForm.email"></el-input>
        </div>
      </el-form-item>
      <!--   密码   -->
      <el-form-item prop="password">
        <div class="form-line">
          <svg-icon icon-class="password" class-name="normall-icon"></svg-icon>
          <el-input show-password type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
        </div>
      </el-form-item>
      <!--   按钮   -->
      <el-row class="form-item">
        <el-button
          type="primary"
          class="submit-btn"
          size="small"
          @click="submintLoginForm('loginForm')"
        >登 录</el-button>
      </el-row>
    </el-form>
    <el-row style="text-align:right;">
      <nuxt-link to="/register">
        <el-button type="primary" size="small">去注册</el-button>
      </nuxt-link>
    </el-row>
  </div>
</template>

<script>
import { isEmail } from '~/untils/validatorFunction'
import md5 from 'md5'

export default {
  layout: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('邮箱不能为空'))
      } else if (!isEmail(value)) {
        callback(new Error('邮箱格式错误!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {
            required: true,
            validator: validateEmail,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 注册
    submintLoginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        }
      })
    },
    async login() {
      const params = { ...this.ruleForm }
      params['password'] = md5(params['password'])
      const ret = await this.$store.dispatch('user/login', params)
      if (ret.code === 0) {
        this.$message({
          type: 'success',
          message: '登录成功'
        })

        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-form {
  width: 300px;
  min-height: 400px;
  margin: 0 auto;
  position: relative;

  .form-line {
    min-width: 254px;
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    & > div:nth-of-type(1) {
      margin-right: 10px;
    }
  }

  .form-Item {
    position: relative;
    flex-direction: column;
  }

  .form-title {
    margin: 0 0 20px;
    text-align: center;
    color: #3080fe;
    letter-spacing: 12px;
  }

  .input-icon {
    color: #999;
  }

  .checkbox {
    margin-left: 5px;
  }

  .submit-btn {
    margin-bottom: 25px;
    width: 100%;
    background: #3080fe;
    border-radius: 28px;
  }

  .normall-icon {
    color: #999;
  }

  .el-form-item__error {
    padding-left: 20px;
  }
}
</style>
