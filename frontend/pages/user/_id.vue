<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我关注的" name="followings">
        <p v-for="(f,index) in followings" :key="index">{{f.nickname}}</p>
      </el-tab-pane>
      <el-tab-pane label="粉丝" name="fans">
        <p v-for="(f,index) in fans" :key="index">{{f.nickname}}</p>
      </el-tab-pane>
      <el-tab-pane label="我的文章" name="articles">
        <div v-for="(item,i) in articles" :key="i">
          <nuxt-link :to="'/articles/'+item._id">
            <span>{{item.title}}</span>
          </nuxt-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我喜欢的文章" name="likeArticles">
        <div v-for="(item,i) in likeArticles" :key="i">
          <nuxt-link :to="'/articles/'+item._id">
            <span>{{item.title}}</span>
          </nuxt-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script >
import { storage } from '~/untils/storage'
import { USERINFO_KEY } from '~/untils/config'
export default {
  data() {
    return {
      activeName: 'followings',
      fans: [],
      articles: [],
      followings: [],
      likeArticles: []
    }
  },
  computed: {},
  mounted() {
    this.getFollowings()
    this.getFans()
    this.getArticles()
    this.getLikeArticles()
  },
  methods: {
    handleClick() {},
    async getFollowings() {
      const ret = await this.$http.get('/user/get-my-followings')
      if (ret.code === 0) {
        this.followings = ret.data
      }
    },
    async getFans() {
      const ret = await this.$http.get('/user/get-my-fans')
      if (ret.code === 0) {
        this.fans = ret.data
      }
    },
    async getArticles() {
      const ret = await this.$http.get('/user/get-my-articles')
      if (ret.code === 0) {
        this.articles = ret.data
      }
    },
    async getLikeArticles() {
      const ret = await this.$http.get('/user/get-my-like-articles')
      if (ret.code === 0) {
        this.likeArticles = ret.data
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
