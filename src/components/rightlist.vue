<!-- 右侧固定导航栏 -->
<template>
  <div class="rightlistBox">
      <div class="card">
        <div class="card-header"
             style="background-image: url(/static/img/lucy.jpg)">
          <div class="card-header-slanted-edge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200"><path class="polygon" d="M-20,200,1000,0V200Z" /></svg>
<!--            <a href="#" class="btn-follow"><span class="sr-only">Follow</span></a>-->
          </div>
        </div>

        <div class="card-body">
          <h2 class="name">haonan</h2>
          <h4 class="job-title">后端</h4>
          <div class="bio">大四学生一枚</div>
          <div class="social-accounts">
            <a :href="catchMeObj.git" target="_blank"><i class="fa fa-fw fa-github"></i></a>
            <a :href="catchMeObj.wechat" target="_blank"><i class="fa fa-fw fa-wechat"></i></a>
            <a :href="catchMeObj.qq" target="_blank"><i class="fa fa-fw fa-qq"></i></a>
          </div>
        </div>

        <div class="card-footer">
          <div class="stats">
            <div class="stat">
              <span class="label">注册人数</span>
              <span class="value" v-text="this.userCount"></span>
            </div>
            <div class="stat hasBorder">
              <span class="label">已发布文章</span>
              <span class="value" v-text="this.articleCount"></span>
            </div>
          </div>
        </div>
      </div>
    <div class="hotArticle" >
      <h2>热门文章</h2>
      <h3>hot article</h3>
      <div>
        <ul>
            <li v-for="(item, index) in browseList" :key="'browseList' + index">
              <a :href="'#/DetailArticle?aid=' + item.id" target="_blank">
                {{item.title }}-{{item.viewCount}}次访问</a>
            </li>
        </ul>
      </div>
    </div>
    <!-- 右侧上滑小图片 -->
    <div
      v-if="this.$store.state.themeObj.user_start != 0"
      :class="gotoTop ? 'toTop hidden' : 'toTop goTop hidden'"
      @click="toTopfun"
    >
      <img
        :src="
          this.$store.state.themeObj.right_img
            ? this.$store.state.themeObj.right_img
            : 'static/img/scroll.png'
        "
        alt=""
      />
    </div>
    <div
      v-else
      :class="gotoTop ? 'toTophui hidden' : 'toTophui goTophui hidden'"
      @click="toTopfun"
    >
      <img
        :src="
          this.$store.state.themeObj.right_img
            ? this.$store.state.themeObj.right_img
            : 'static/img/scroll.png'
        "
        alt=""
      />
    </div>
  </div>
</template>


<script>
import { hotArticleList } from "../api/article";
import {getCountInfo} from "../api/counter";
export default {
  data() {
    //选项 / 数据
    return {
      fixDo: false,
      loveme: false,
      gotoTop: false, //返回顶部
      going: false, //是否正在执行上滑动作
      browseList: "", //热门文章 浏览量最多
      artCommentList: "", //最新评论
      articleCount:'',
      userCount:'',
      catchMeObj: {
        //个人信息
        git: "https://github.com/nange076",
        qq: "/static/img/qq.png",
        wechat: "/static/img/wechat.png",
      },
    };
  },
  methods: {
    //事件处理器
    toTopfun: function (e) {
      var that = this;
      this.gotoTop = false;
      this.going = true;
      var timer = setInterval(function () {
        //获取滚动条距离顶部高度
        var osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-osTop / 7);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        //到达顶部，清除定时器
        if (osTop == 0) {
          that.going = false;
          clearInterval(timer);
          timer = null;
        }
      }, 30);
    },
    getHotArticleList() {
      hotArticleList().then((response) => {
        this.browseList = response;
      });
    },
    getCount(){
     getCountInfo().then((res) =>{
        this.articleCount=res.articleCount;
        this.userCount=res.userCount;
     })
    }
  },
  components: {
    //定义组件
  },

  created() {
    //生命周期函数
    var that = this;
    window.onscroll = function () {
      var t = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(t);
      if (!that.going) {
        if (t > 600) {
          that.gotoTop = true;
        } else {
          that.gotoTop = false;
        }
      }
      if (t > 1200) {
        that.fixDo = true;
      } else {
        that.fixDo = false;
      }
    };
    //查询浏览量最多的10篇文章数据
    this.getHotArticleList();
    this.getCount()
  },
};
</script>

<style lang="less">
.rightlistBox {
  position: relative;
}
.rightlistBox section {
  transition: all 0.2s linear;
  position: relative;
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.rightlistBox section:hover {
  transform: translate(0, -2px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
/*回到顶部*/
/*返回到顶部*/
.toTop {
  position: fixed;
  right: 40px;
  top: -150px;
  z-index: 99;
  width: 70px;
  height: 900px;
  transition: all 0.5s 0.3s ease-in-out;
  cursor: pointer;
}
.goTop {
  top: -950px;
}
.toTop img,
.toTophui img {
  width: 100%;
  height: auto;
}
.toTophui {
  position: fixed;
  right: 10px;
  bottom: 80px;
  z-index: 99;
  width: 120px;
  height: 120px;
  transition: all 0.5s 0.3s ease-in-out;
  cursor: pointer;
  animation: toflow 2s ease-in-out infinite;
}
@keyframes toflow {
  0% {
    /*top:400px;*/
    transform: scale(0.95) translate(0, 10px);
  }
  50% {
    /*top:410px;*/
    transform: scale(1) translate(0, 0px);
  }
  100% {
    /*top:400px;*/
    transform: scale(0.95) translate(0, 10px);
  }
}
.goTophui {
  bottom: 120vh;
}
//新个人卡片
@import url(https://fonts.googleapis.com/css?family=Exo+2:300,400,700);
body{
  padding:0;
  margin:0;
  font-size:14px;
  font-family: "Exo 2", sans-serif;
  color: #333;
}

.card{
  border-radius: 5px;
  position: relative;
  width: 315px; /* Remove for full width */
  height: 450px; /* Remove for full width */
  margin:30px auto;
  background: #fbfdff;
  box-shadow: 0 0 100px rgba(0,0,0, .3);
}
.card-header{
  border-radius: 5px;
  position: relative;
  height: 220px;
  background-size: cover;
  background-position: top;
}
.card-header:after{
  content:'';
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgb(5,85,134), rgba(181,181,181, 0.1));
}

.card-header-bar{
  position: absolute;
  top:0;
  width: 100%;
  z-index: 1;
  width: 100%;
}

.sr-only{
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0,0,0,0);
  border: none;
  overflow: hidden;
}
.btn-message{
  display: inline-block;
  background: url(https://res.cloudinary.com/dj14cmwoz/image/upload/v1491077483/profile-card/images/message.svg) no-repeat;
  width: 19.37px;
  height: 16.99px;
  margin-right:10px;
  margin-top:10px;
  float: right;
}
.btn-menu{
  display: inline-block;
  background: url(https://res.cloudinary.com/dj14cmwoz/image/upload/v1491077483/profile-card/images/menu.svg) no-repeat;
  width: 19px;
  height: 12.16px;
  margin-left:10px;
  margin-top:10px;
  float: left;
}

svg .polygon{
  fill: #fff;
}
.card-header-slanted-edge{
  position: absolute;
  bottom: -3px;
  z-index: 1;
  width: 100%;
  right:0;
  left:0;
}

.btn-follow{
  position: absolute;
  top: -15px;
  right: 25px;
  width: 45px;
  height: 45px;
  background: linear-gradient(to left, #2D77C1, #68FAC2);
  border-radius:100%;
  box-shadow: 0 10px 15px rgba(110,221,235, .53);
}

.btn-follow:after{
  content: '';
  position:absolute;
  background: url(https://res.cloudinary.com/dj14cmwoz/image/upload/v1491077480/profile-card/images/add.svg) no-repeat;
  width:17px;
  height: 17px;
  left: 50%;
  top:50%;
  transform: translate(-50%, -50%);
}

.card-body{
  text-align:center;
  padding-left: 10px;
}

.name{
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 auto;
}

.job-title{
  font-size: 14px;
  font-weight: 300;
  margin-top: 5px;
  color: #919191;
}

.bio{
  font-size: 14px;
  color: #7B7B7B;
  font-weight: 300;
  margin: 10px auto;
  line-height: 20px;
}
.social-accounts img{
  width: 15px;
}

.social-accounts a{
  margin-left: 10px;
}
.social-accounts a:first-child{
  margin-left: 0;
}

.card-footer{
  /*position:fixed; /* Full card width/height */
  position: absolute; /* Fixed card width/height */
  left: 0;
  width: 100%;
  bottom: 20px;
}
.stats{
  display: flex;
  justify-content: center;
}
.stat{
  box-sizing: border-box;
  width: calc(100% / 3);
  text-align: center;
}
.hasBorder{
  border-left: 1px solid #EBEBEB;
}
.stat .label{
  display: block;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 11px;
  letter-spacing: 1px;
  color: #95989A;
}

.stat .value{
  display: block;
  font-weight: 700;
  font-size:20px;
  margin-top: 5px;
}

.hotArticle{
  display: flex;
  flex-flow: column nowrap;
  border-radius: 5px;
  position: relative;
  width: 315px; /* Remove for full width */
  height: auto; /* Remove for full width */
  margin:30px auto;
  background: #fbfdff;
  box-shadow: 0 0 100px rgba(0,0,0, .3);
}
.hotArticle h2{
  padding-top: 10px;
  text-align: center;
  font-weight: 700;
  font-size:20px;
}
.hotArticle h3{
  text-align: center;
  font-weight: 500;
  color: #919191;
  font-size:15px;
}
.hotArticle a{
  text-align: left;
  font-weight: 200;
  font-size:13px;
}
.hotArticle li{

  padding: 5px 10px 5px 10px;
}

</style>
