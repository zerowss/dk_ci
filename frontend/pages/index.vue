<template>
  <div class="container">
    <div v-for="item in articles" :key="item._id">
      <nuxt-link :to="'/articles/'+item._id">
          <span>{{item.title}}</span>
          <span>{{item.author.nickname}}</span>
        </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const ret = await app.$axios.get('/api/article/list')
    return {
      articles: ret.data.data
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}
</style>
