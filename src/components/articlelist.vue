<!-- 文章列表 -->
<template>
    <el-row class="sharelistBox">

        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'article'+index">
<div class="box">
  <div class="box-center" >
    <a :href="'#/DetailArticle?aid='+item.id" target="_blank" class="info-head" v-if="item.thumbnail!==''">
      <img :src="item.thumbnail"  alt="" class="maxW">
    </a>
    <a :href="'#/DetailArticle?aid='+item.id" target="_blank" class="info-head" v-else>
      <img src="http://img.zenithzone.top/pic/202209161846839.jpg"  alt="" class="maxW">
    </a>
  </div>
  <!--  右边，各种信息-->
  <div class="box-right">
    <!--标题-->
      <a :href="'#/DetailArticle?aid='+item.id" target="_blank" class="info-head">
        {{item.title}}
      </a>

    <!--          简介-->
      <a class="info-summary" :href="'#/DetailArticle?aid='+item.id" target="_blank" >
        {{item.summary}}
      </a>
    <!--          统计信息-->
    <h2 class="info-bottom">
      <i class="fa fa-fw fa-clock-o"></i><span v-html="showInitDate(item.createTime,'all')">{{showInitDate(item.createTime,'all')}}</span> •
      <i class="fa fa-fw fa-eye"></i>{{item.viewCount}} 次围观 •
      <a :href="'#/Share?classId='+item.categoryId" class="info-type">
        <i class="el-icon-document" >{{item.categoryName}} </i>
      </a>
      </h2>

  </div>
</div>

        </el-col>
         <el-col class="viewmore">
            <a v-show="hasMore" class="tcolors-bg" href="javascript:void(0);" @click="addMoreFun">点击加载更多</a>
            <a v-show="!hasMore" class="tcolors-bg" href="javascript:void(0);">暂无更多数据</a>
        </el-col>
    </el-row>
</template>

<script>
import {initDate} from '../utils/server.js'
import {articleList} from '../api/article'
    export default {
        name:'Share',
        data() { //选项 / 数据
            return {
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    categoryId: 0
                },
                articleList:[],
                hasMore:true
            }
        },

        methods: { //事件处理器
            showInitDate: function(oldDate,full){
                return initDate(oldDate,full)
            },
            getList(){
                articleList(this.queryParams).then((response)=>{
                    this.articleList = this.articleList.concat(response.rows)
                    if(response.total<=this.articleList.length){
                        this.hasMore=false
                    }else{
                        this.hasMore=true
                        this.queryParams.pageNum++
                    }
                })
            },
            showSearchShowList:function(initData){//展示数据
                if(initData){
                    this.articleList = []

                }
                this.getList()
            },
            addMoreFun:function(){//查看更多
                this.showSearchShowList(false);
            },
            routeChange:function(){
                var that = this;
                this.queryParams.categoryId = (that.$route.query.classId==undefined?0:parseInt(that.$route.query.classId));//获取传参的classId
                this.showSearchShowList(true);
            }
        },
        components: { //定义组件

        },
        watch: {
           // 如果路由有变化，会再次执行该方法
           '$route':'routeChange',
           '$store.state.keywords':'routeChange'
         },
        created() { //生命周期函数
            // console.log(this.$route);
            var that = this;
            that.routeChange();
        }
    }
</script>

<style>
/*分享标题*/
.shareTitle{
    margin-bottom: 40px;
    position: relative;
    border-radius: 5px;
    background: #fff;
    padding:15px;
}
.shareclassTwo{
    width:100%;
}
.shareclassTwo li{
    display: inline-block;
}
.shareclassTwo li a{
    display: inline-block;
    padding:3px 7px;
    margin:5px 10px;
    color:#fff;
    border-radius: 4px;
    background: #64609E;
    border: 1px solid #64609E;
    transition: transform 0.2s linear;
    -webkit-transition: transform 0.2s linear;
}
.shareclassTwo li a:hover{
    transform: translate(0,-3px);
    -webkit-transform: translate(0,-3px);
}
.shareclassTwo li a.active{
    background: #fff;
    color:#64609E;

}
/*文章列表*/
    .sharelistBox{
        transition: all 0.5s ease-out;
        font-size: 15px;
    }


    /*.sharelistBox .viewmore a:hover,.s-item .viewdetail a:hover{
        background: #48456C;
    }*/
.ui label{
  color: #0e5e85;
}
.box{
  display: flex;
  flex-flow: row;
}
.box-left{
  padding-top: 10%;
  flex: 0 1 100px;
}
.box-center{
  flex: 5 1 375px;
  overflow: clip;
}
.box-right{
  flex: 5 1 600px;
  display: flex;
  flex-flow: column;
}
.info-head{
  font-weight: bolder;
  font-size: 1.25rem;
  white-space: normal;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  flex: 1 1 auto;
}
.info-summary{
  padding-top: 10px;
  flex: 4 1 auto;
}
.info-head:hover ,.info-summary:hover,.info-type:hover{
  color: #6c95b7;
}
.info-bottom{
  text-align: center;
  padding-bottom: 10px;
  position: absolute;bottom: 0;
  flex: 1 1 auto;
}
.maxW{
  transition: all 0.6s;
}
.maxW:hover{
  transform: scale(1.1);
}
</style>
