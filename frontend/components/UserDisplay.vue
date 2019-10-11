<template>
  <div>
    <el-row :gutter="20" type="flex" justify="space-between" align="middle">
      <el-col :span="12">
        <div>
          <nuxt-link :to="'/user/'+id">{{articleInfo.author.nickname}}</nuxt-link>
        </div>
        <div>
          <span>{{formart(articleInfo.createdAt)}}</span>
          <span>阅读次数{{articleInfo.views_volume}}</span>
        </div>
      </el-col>
      <el-col :span="12" style="text-align:right;">
        <el-button @click="following" size="small" :type="buttonType" plain>{{showFollowText}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script >
export default {
  data() {
    return {
      buttonType: '',
      id: '',
      showFollowText: '关注'
    }
  },
  props: ['articleInfo'],
  mounted() {
    this.id = this.articleInfo.author._id
    this.getFollow()
  },
  methods: {
    async getFollow() {
      const ret = await this.$http.get('/user/follow/' + this.id)
      if (ret.hasOwnProperty('message')) {
        this.$message.warning(ret.message)
      } else {
        if (ret.data) {
          this.buttonType = 'primary'
          this.showFollowText = '已关注'
        } else {
          this.buttonType = ''
          this.showFollowText = '关注'
        }
      }
    },
    async following() {
      const type = !this.buttonType ? 'put' : 'delete'
      const ret = await this.$http[type]('/user/follow/' + this.id)
      if (ret.code === 0) {
        if (ret.hasOwnProperty('message')) {
          this.$message.warning(ret.message)
        } else {
          this.$message.success(ret.data)
          this.buttonType = type === 'delete' ? '' : 'primary'
          this.showFollowText = type === 'delete' ? '关注' : '已关注'
        }
      }
    },
    formart(val) {
      return val ? String(val).slice(0, 10) : ''
    }
  }
}
</script>

<style scoped lang='less'>
.el-button--primary.is-plain {
  &.is-plain {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
}
</style>
