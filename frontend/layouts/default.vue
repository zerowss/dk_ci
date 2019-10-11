<template>
  <div>
    <el-container>
      <el-header>
        <div class="header">
          <el-row type="flex" justify="space-between" class="row-bg">
            <el-col :span="6">
              <img src="../static/logo.png" alt="logo" width="60" height="60" />
              <span class="logo-title">DM</span>
            </el-col>
            <el-col :span="12">
              <el-menu
                :default-active="menuIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
              >
                <el-menu-item index="1">
                  <nuxt-link to="/">首页</nuxt-link>
                </el-menu-item>
                <el-menu-item index="2">
                  <nuxt-link to="/edit/new">写文章</nuxt-link>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="6">
              <el-menu
                :default-active="settingIndex"
                class="setting-wrap"
                mode="horizontal"
                @select="handleSelect"
              >
                <el-menu-item index="1">
                  <nuxt-link to="/login" v-if="!userInfo.email">登录</nuxt-link>
                  <nuxt-link v-else :to="'/user/'+userInfo._id">{{userInfo.nickname}}</nuxt-link>
                </el-menu-item>
                <el-menu-item index="2">
                  <nuxt-link to="/register" v-if="!userInfo.email">注册</nuxt-link>
                  <el-button v-else type="text" @click="singOut">退出</el-button>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </el-header>

      <el-container>
        <el-main>
          <nuxt />
        </el-main>
        <el-aside width="200px">
          <div class="container">Aside</div>
        </el-aside>
      </el-container>

      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import { storage } from '~/untils/storage'
import { TOKEN_KEY, USERINFO_KEY } from '~/untils/config'
export default {
  data() {
    return {
      menuIndex: '1',
      settingIndex: '1'
    }
  },
  computed: {
    userInfo(){
      return this.$store.state.user.userInfo || {}
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    handleSelect(key, keyPath) {},
    singOut() {
      storage.removeItem(TOKEN_KEY)
      storage.removeItem(USERINFO_KEY)
      this.$router.push({ path: '/login' })
    },
    async getUserInfo() {
      await this.$store.dispatch('user/getUserInfo')
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
a {
  text-decoration: none;
}
.el-header {
  padding: 0;
}
.el-aside {
  padding: 20px;
}
.container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  .logo-title {
    vertical-align: top;
    display: inline-block;
    color: #e6a23c;
  }
  .row-bg {
    height: 60px;
  }
  .setting-wrap {
    position: relative;
    display: flex;
    justify-content: flex-end;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 0;
  }
  .el-menu--horizontal > .el-menu-item {
    border-bottom: 0;
  }
}
</style>
