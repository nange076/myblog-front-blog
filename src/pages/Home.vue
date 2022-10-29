<!-- 首页 -->
<template>
  <div>
    <navbar></navbar>
      <div class="container">
        <el-row  :gutter="30">
          <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
            <sg-articlelist class="articlelist"></sg-articlelist>
          </el-col>
          <el-col :sm="24"  :md="8" >
            <sg-rightlist></sg-rightlist>
          </el-col>
        </el-row>
      </div>
      <div class="placeholder"></div>
      <foot></foot>
  </div>
</template>

<script>
import header from '../components/header.vue'
import navbar from "../components/navbar";
import articlelist from '../components/articlelist.vue'
import rightlist from '../components/rightlist.vue'
import Foot from "../components/foot";
    export default {
        name:'Home',
        data() { //选项 / 数据
            return {

            }
        },
        methods: { //事件处理器

        },
        components: {
          Foot, //定义组件
            'sg-navbar':header,
            'navbar':navbar,
            'sg-articlelist':articlelist,
            'sg-rightlist':rightlist,
        },
        created() { //生命周期函数
          console.log(process.env.ENV)
        }
    }
</script>

<style>

</style>
