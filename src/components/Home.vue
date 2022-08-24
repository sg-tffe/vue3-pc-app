<template>
  <div id="home" class="m-home">
    <div class="content">
      <h2 class="title">欢迎</h2>
      <p class="subtitle">使用业务系统系统</p>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'

@Options({})
export default class HelloWorld extends Vue {}
</script>

<style scoped lang="scss">
.m-home {
  width: 846px;
  padding-top: 100px;
  margin: 0 auto;
  .content {
    padding-top: 85px;
    vertical-align: top;
    background: url('../assets/home.png') right top no-repeat;
    height: 340px;
    .title {
      font-size: 50px;
      color: #545a5a;
    }
    .subtitle {
      font-size: 31px;
      color: #999;
      margin-top: 5px;
    }
  }
}
</style>
