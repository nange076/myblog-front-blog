<!-- 文章列表 -->
<template>
  <div class="box">
    <div v-for="(item,index) in articleList" :key="'article'+index" >
      <div class="blog-card" v-bind:class="index%2==0?'':'alt'">
        <div class="meta">
          <div class="photo" v-if="item.thumbnail!==''" v-bind:style="{ 'background-image': 'url(' + item.thumbnail+ ')'}"></div>
          <div class="photo" v-else style="background-image: url(https://img.zenithzone.top/pic/202211051709875.jpg)"></div>
          <ul class="details">
            <li class="author">作者：<a>haonan</a></li>
            <li class="date" >创建时间：<a v-text="item.createTime"></a></li>
            <li>- <a v-text="item.viewCount"></a>次围观 -</li>
            <li class="tags">
              <ul>
                <li><a :href="'#/Share?classId='+item.categoryId" v-text="item.categoryName"></a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="description">
          <h1 v-text="item.title"></h1>
          <h2>edit by haonan</h2>
          <p v-text="item.summary"></p>
          <p class="read-more">
            <a :href="'#/DetailArticle?aid='+item.id" target="_blank">查看更多</a>
          </p>
        </div>
      </div>
    </div>
    <div class="pager-box">
      <el-pagination
        :page-size="queryParams.pageSize"
        :current-page.sync="queryParams.pageNum"
        @current-change="showSearchShowList"
        layout="total, prev, pager, next ,jumper"
        :total="total" />
    </div>
  </div>
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
                total:0,
            }
        },

        methods: { //事件处理器
            showInitDate: function(oldDate,full){
                return initDate(oldDate,full)
            },
            getList(){
                articleList(this.queryParams).then((response)=>{
                    this.articleList = response.rows
                    this.total=  parseInt(response.total)
                })
            },
            showSearchShowList:function(initData){//展示数据
                if(initData){
                    this.articleList = []
                }
                this.getList()
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

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
* {
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
.box{
  display: flex;
  flex-flow: column nowrap;
}
.box :last-child{
  align-self: center;
}
html{
  overflow: hidden;
}
.blog-card {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.6%;
  background: #fff;
  line-height: 1.4;
  font-family: sans-serif;
  border-radius: 5px;
  overflow: hidden;
  z-index: 0;
}
.blog-card a {
  color: inherit;
}
.blog-card a:hover {
  color: #6c95b7;
}
.blog-card:hover .photo {
  transform: scale(1.3) rotate(3deg);
}
.blog-card .meta {
  position: relative;
  z-index: 0;
  height: 200px;
}
.blog-card .photo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.2s;
}
.blog-card .details, .blog-card .details ul {
  margin: auto;
  padding: 0;
  list-style: none;
}
.blog-card .details {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -100%;
  margin: auto;
  transition: left 0.2s;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  width: 100%;
  font-size: 0.9rem;
}
.blog-card .details a {
  text-decoration: dotted underline;
}
.blog-card .details ul li {
  display: inline-block;
}
.blog-card .details .tags li {
  margin-right: 2px;
}
.blog-card .details .tags li:first-child {
  margin-left: -4px;
}
.blog-card .description {
  padding: 1rem;
  background: #fff;
  position: relative;
  z-index: 1;
}
.blog-card .description h1, .blog-card .description h2 {
  font-family: Poppins, sans-serif;
}
.blog-card .description h1 {
  line-height: 1;
  margin: 0;
  font-size: 1.7rem;
}
.blog-card .description h2 {
  font-size: 1rem;
  font-weight: 300;
  text-transform: uppercase;
  color: #a2a2a2;
  margin-top: 5px;
}
.blog-card .description .read-more {
  text-align: right;
}
.blog-card .description .read-more a {
  color: #6c95b7;
  display: inline-block;
  position: relative;
  text-decoration: none;
}
.blog-card p {
  position: relative;
  margin: 1rem 0 0;
}

.blog-card:hover .details {
  left: 0%;
}
@media (min-width: 640px) {
  .blog-card {
    flex-direction: row;
    max-width: 700px;
  }
  .blog-card .meta {
    flex-basis: 40%;
    height: auto;
  }
  .blog-card .description {
    flex-basis: 60%;
  }
  .blog-card.alt {
    flex-direction: row-reverse;
  }
  .blog-card.alt .details {
    padding-left: 25px;
  }
}
/*重写element样式*/
.pager-box >>> button,
.pager-box >>> .el-pager li{
  background-color: transparent !important;
  color: rgba(0, 0, 0, 0.97) !important;
  border: 1px solid #0672C4;
}
.pager-box >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0672C4 !important;
}

</style>
