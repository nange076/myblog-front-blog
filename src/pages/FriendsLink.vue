<!-- 友情链接 -->
<template>
  <div>
    <navbar></navbar>
        <div class="container">
            <el-row  :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <sg-friends></sg-friends>
                    <sg-message></sg-message>
                </el-col>
                <el-col :sm="24"  :md="8" >
                    <sg-rightlist></sg-rightlist>
                </el-col>
            </el-row>
        </div>
        <foot></foot>
  </div>
</template>

<script>
import navbar from "../components/navbar";
import header from '../components/header.vue'
import friends from '../components/friends.vue'
import rightlist from '../components/rightlist.vue'
import message from '../components/message.vue'
import foot from "../components/foot";
    export default {
        name: 'FriendsLink',
        data() { //选项 / 数据
            return {

            }
        },
        methods: { //事件处理器

        },
        components: { //定义组件
          foot,
          navbar,
            'sg-nav':header,
            'sg-message':message,
            'sg-friends':friends,
            'sg-rightlist':rightlist,
        },
        created() { //生命周期函数

        }
    }
</script>

<style>

</style>
