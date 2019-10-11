<template>
  <div class="register-form">
    <h4 class="form-title">注 册</h4>
    <el-form ref="registerForm" :model="ruleForm" label-width="0" :rules="rules">
      <!--   昵称   -->
      <el-form-item prop="nickname">
        <div class="form-line">
          <svg-icon icon-class="login" class-name="normall-icon"></svg-icon>
          <el-input placeholder="昵称" v-model="ruleForm.nickname"></el-input>
        </div>
      </el-form-item>
      <!--    邮箱  -->
      <el-form-item prop="email">
        <div class="form-line">
          <svg-icon icon-class="email" class-name="normall-icon"></svg-icon>
          <el-input placeholder="邮箱" v-model="ruleForm.email" @change="changEmail"></el-input>
          <el-button style="margin-left: 10px" :disabled="isCanCode" v-show="isShowCode" type="text"
                     @click="getEmailCode">{{emailTip}}
          </el-button>
        </div>
      </el-form-item>
      <!--   邮箱验证码   -->
      <el-form-item prop="emailCode" v-show="isCanCode">
        <div class="form-line">
          <svg-icon icon-class="code" class-name="normall-icon"></svg-icon>
          <el-input maxlength="6" placeholder="邮箱验证码" v-model="ruleForm.emailCode"></el-input>
        </div>
      </el-form-item>
      <!--   预防机器人   -->
      <el-form-item>
        <div class="form-line">
          <div>
            <img :src="captcha" alt="验证码" @click="refreshCaptchaCode">
          </div>
          <el-input maxlength="4" v-model="ruleForm.captchaCode" placeholder="请填写图中验证码"></el-input>
        </div>
      </el-form-item>
      <!--   密码   -->
      <el-form-item prop="password">
        <div class="form-line">
          <svg-icon icon-class="password" class-name="normall-icon"></svg-icon>
          <el-input show-password type="password" placeholder="密码" v-model="ruleForm.password">
          </el-input>
        </div>
      </el-form-item>
      <!--   确认密码   -->
      <el-form-item prop="checkPass">
        <div class="form-line">
          <svg-icon icon-class="password" class-name="normall-icon"></svg-icon>
          <el-input type="password" placeholder="确认密码" v-model="ruleForm.checkPass"></el-input>
        </div>
      </el-form-item>
      <!--   按钮   -->
      <el-row class="form-item">
        <el-button type="primary" class="submit-btn" size="small" @click="submintRegisterForm('registerForm')">注 册
        </el-button>
      </el-row>
    </el-form>
    <el-row style="text-align:right;">
      <nuxt-link to="/login">
        <el-button type="primary" size="small">有账号,去登录</el-button>
      </nuxt-link>
    </el-row>
  </div>
</template>

<script>
    import {isEmail} from "~/untils/validatorFunction"
    import md5 from "md5"

    export default {
        layout: 'login',
        data() {
            const validateName = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("请输入昵称"))
                } else {
                    if (this.isSameName) {
                        callback(new Error("昵称不可用"))
                    }
                    callback()
                }
            }
            const validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("请输入密码"))
                } else {
                    if (this.ruleForm.checkPass !== "") {
                        this.$refs.registerForm.validateField("checkPass")
                    }
                    callback()
                }
            }
            const validatePass2 = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("请再次输入密码"))
                } else if (value !== this.ruleForm.password) {
                    callback(new Error("两次输入密码不一致!"))
                } else {
                    callback()
                }
            }
            const validateCode = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("验证码不能为空"))
                } else if (isNaN(value) || value.length != 4) {
                    callback(new Error("验证码格式错误!"))
                } else {
                    callback()
                }
            }
            const validateEmail = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("邮箱不能为空"))
                } else if (!isEmail(value)) {
                    callback(new Error("邮箱格式错误!"))
                } else {
                    callback()
                }
            }
            return {
                ruleForm: {
                    nickname: "",
                    email: "",
                    emailCode: "",
                    captchaCode: '',
                    password: "",
                    checkPass: ""
                },
                rules: {
                    nickname: [
                        {
                            required: true,
                            validator: validateName,
                            trigger: "blur"
                        }
                    ],
                    email: [
                        {
                            required: true,
                            validator: validateEmail,
                            trigger: "blur"
                        }
                    ],
                    password: [
                        {
                            required: true,
                            validator: validatePass,
                            trigger: "blur"
                        }
                    ],
                    checkPass: [
                        {
                            required: true,
                            validator: validatePass2,
                            trigger: "blur"
                        }
                    ],
                    emailCode: [
                        {
                            required: true,
                            validator: validateCode,
                            trigger: "blur"
                        }
                    ],
                    captchaCode: [
                        {
                            required: true,
                            validator: validateCode,
                            trigger: "blur"
                        }
                    ]
                },
                isShowCode: false,
                isCanCode: false,
                emailTip: "获取验证码",
                countDown: 60,
                isSameName: false,
                captcha: '/api/user/send-captcha-code'
            }
        },
        methods: {
            /**
             * @description: 获取email验证码
             */
            changEmail(value) {
                if (value && isEmail(value)) {
                    this.isShowCode = true
                } else {
                    this.isShowCode = false
                }
            },
            getEmailCode() {
                this.isCanCode = true
                let timer = setInterval(() => {
                    this.countDown--
                    this.emailTip = `${this.countDown}秒后获取`
                    if (this.countDown == 0) {
                        clearInterval(timer)
                        this.emailTip = "获取验证码"
                        this.isCanCode = false
                        this.countDown = 60
                    }
                }, 1000)
                this.getCode()
            },
            async getCode() {
                const res = await this.$http.get("/user/send-email-code?email=" + this.ruleForm.email)
                if (res.data && res.data.code === 0) {
                    this.$message.success("验证码已发送")
                }
            },
            /**
             * 刷新captcha码
             */
            refreshCaptchaCode() {
                this.captcha = '/api/user/send-captcha-code?t=' + new Date().getTime()
            },
            // 注册
            submintRegisterForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.register()
                    }
                })
            },
            async register() {
                const params = {...this.ruleForm}
                params['password'] = md5(params['password'])
                const res = await this.$http.post("/user/register", params)
                console.log(res, "ppos")
                if (res.data && res.data.code === 0) {
                    this.$message.success("注册成功")
                    this.$router.push('/login')
                }
            }
        }
    }

</script>

<style scoped lang="less">
  .register-form {
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
