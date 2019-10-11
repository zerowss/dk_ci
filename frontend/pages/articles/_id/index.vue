<template>
  <div class="showMd markdown-body">
    <div class="author-show" v-if="articleInfo.author._id">
      <UserDisplay :articleInfo="articleInfo"></UserDisplay>
    </div>
    <div v-html="compliedMarkdown"></div>
    <el-divider></el-divider>
    <div class="showLike">
      <el-button @click="likeAction" type="info" >
        <svg-icon icon-class="like" class-name="normall-icon">
          <span>{{articleInfo.like}}</span>
        </svg-icon>
      </el-button>
      <el-button @click="dislikeAction" type="info" >
        <svg-icon icon-class="dislike" class-name="normall-icon">
          <span>{{articleInfo.dislike}}</span>
        </svg-icon>
      </el-button>
    </div>
  </div>
</template>

<script >
import UserDisplay from '~/components/UserDisplay.vue'

export default {
  head: {
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.css'
      }
    ]
  },
  data() {
    return {
      compliedMarkdown: '',
      articleInfo: {
        author: {}
      },
      id: '',
      isCanClicke: false
    }
  },
  components: { UserDisplay },
  async mounted() {
    this.id = this.$route.params.id
    if (this.id) {
      await this.getDetail()
    }
  },
  methods: {
    async getDetail() {
      const ret = await this.$http.get('/article/detail/' + this.id)
      this.compliedMarkdown = ret.data.artilce_html
      this.articleInfo = ret.data
    },
    async likeAction() {
      const ret = await this.$http.get('/user/addLikeArticle/'+this.id)
      if (ret.code === 0) {
        this.$message.success(ret.message)
        this.getDetail()
      }
    },
    async dislikeAction() {
      const ret = await this.$http.get('/user/addDislikeArticle/'+this.id)
      if (ret.code === 0) {
        this.$message.success(ret.message)
        this.getDetail()
      } 
    }
  }
}
</script>

<style scoped lang='less'>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
.author-show {
  font-size: 14px;
}
.showMd {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  font-size: 20px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
