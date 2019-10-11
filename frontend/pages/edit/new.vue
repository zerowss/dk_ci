<template>
  <div class="edit-article-wrap">
    <div class="submit-article">
      <el-button type="primary" size="small" @click="submit">提交</el-button>
    </div>
    <el-row :gutter="20" style="height:100%;">
      <el-col :span="12">
        <textarea @input="update" name="md" id="md" class="md-editor"></textarea>
      </el-col>
      <el-col :span="12">
        <div class="showMd markdown-body" v-html="compliedMarkdown"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script >
import marked from 'marked'
import debounce from 'loadsh/debounce'
export default {
  head:{
    link:[
      {rel:'stylesheet',href:'https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.css',}
    ]
  },
  data() {
    return {
      content: ''
    }
  },
  computed: {
    compliedMarkdown() {
      return marked(this.content)
    }
  },
  methods: {
    update: debounce(function(e) {
      this.content = e.target.value
    }, 150),
    async submit() {
      const ret = await this.$http.post('/article/create', {
        content: this.content
      })
      if (ret.code === 0) {
        this.$message.success('创建成功')
        // this.$router.push('/articles/list')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.edit-article-wrap {
  height: 100%;
  .submit-article {
    text-align: right;
    margin-bottom: 10px;
  }
  .el-col {
    height: 100%;
  }
  .md-editor {
    width: 100%;
    height: 100%;
    font-size: 20px;
    outline: none;
    border: none;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .showMd {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
}
</style>
