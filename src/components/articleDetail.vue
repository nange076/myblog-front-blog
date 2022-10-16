<!-- 文章详情模块 -->
<template>
        <div class="detailBox tcommonBox" >
            <header class="head">
                <h1>
                    <a :href="'#/DetailShare?aid='+detailObj.id" target="_blank">
                        {{detailObj.title}}
                    </a>
                </h1>
                <h2>
                    <i class="fa fa-fw fa-user"></i>发表于 <span >{{detailObj.createTime}}</span> •
                    <i class="fa fa-fw fa-eye"></i>{{detailObj.viewCount}} 次围观 •
                   <a :href="'#/Share?classId='+detailObj.categoryId" class="info-type">
                     <i class="el-icon-document" >
                       {{detailObj.categoryName}}
                     </i>
                   </a>
                </h2>
            </header>
<!--            <div  class="article-content markdown-body" v-html="detailObj.content"></div>-->
            <mavon-editor
              class="editor"
              :ishljs="true"
              v-html="detailObj.content"
              default-open="preview"
              :editable="false"
              :subfield="false"
              :toolbarsFlag="false"
              :box-shadow="false"
              code-style="atom-one-light"
              box-shadow="false"
              navigation="true"
              box-shadow-style="0 2px 12px 0 rgba(10, 44, 52)"
            ></mavon-editor>
            <div class="donate">
                <div class="donate-word">
                    <span @click="pdonate=!pdonate">赞赏</span>
                </div>
                <el-row :class="pdonate?'donate-body':'donate-body donate-body-show'" :gutter="30">
                    <el-col  :span="12"   class="donate-item">
                        <div class="donate-tip">
                            <img :src="detailObj.wechat_image?detailObj.wechat_image: 'static/img/wechat_pay.png'" :onerror="$store.state.errorImg"/>
                            <span>微信扫一扫，向我赞赏</span>
                        </div>
                    </el-col>
                    <el-col :span="12"  class="donate-item">
                        <div class="donate-tip">
                            <img :src="detailObj.alipay_image?detailObj.alipay_image:'static/img/ali_pay.jpg'" :onerror="$store.state.errorImg"/>
                            <span>支付宝扫一扫，向我赞赏</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
</template>

<script>
import {initDate} from '../utils/server.js'
import {getArticle,updateViewCount} from '../api/article.js'
import { mavonEditor } from 'mavon-editor'
    export default {
        data() { //选项 / 数据
            return {
                aid:'',//文章ID
                pdonate:true,//打开赞赏控制,
                detailObj:{},//返回详情数据
                haslogin:false,//是否已经登录
                userId:'',//用户id
                codeStyle:'github',
                externalLink: {
                markdown_css: function () {
                  // 这是你的markdown css文件路径
                  return '/mavon-editor/markdown/github-markdown.min.css'
                },
                hljs_js: function () {
                  // 这是你的hljs文件路径
                  return '/mavon-editor/highlightjs/highlight.min.js'
                },
                hljs_css: function (css) {
                  // 这是你的代码高亮配色文件路径
                  return '/mavon-editor/highlightjs/styles/' + css + '.min.css'
                },
                hljs_lang: function (lang) {
                  // 这是你的代码高亮语言解析路径
                  return '/mavon-editor/highlightjs/languages/' + lang + '.min.js'
                },
                katex_css: function () {
                  // 这是你的katex配色方案路径路径
                  return '/mavon-editor/katex/katex.min.css'
                },
                katex_js: function () {
                  // 这是你的katex.js路径
                  return '/mavon-editor/katex/katex.min.js'
                }
              }
            }
        },
        methods: { //事件处理器
            showInitDate:function(date,full){//年月日的编辑
                // console.log(detailObj.create_time,date,full);
                return initDate(date,full);
            },
            getArticleDetail:function(){
              console.log("-----发送请求----")
                getArticle(this.aid).then((response)=>{
                    this.detailObj = response
                     const markdownIt = mavonEditor.getMarkdownIt()
                    // markdownIt.re
                    this.detailObj.content = markdownIt.render(response.content);
                })
            },
            routeChange:function(){
                var that = this;
                that.aid = that.$route.query.aid==undefined?1:parseInt(that.$route.query.aid);//获取传参的aid
                //判断用户是否存在
                if(localStorage.getItem('userInfo')){
                    that.haslogin = true;
                    that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    that.userId = that.userInfo.userId;
                    // console.log(that.userInfo);
                }else{
                    that.haslogin = false;
                }
                //获取详情接口
                this.getArticleDetail()
                updateViewCount(that.aid)
            }
        },
        watch: {
           // 如果路由有变化，会再次执行该方法
           '$route':'routeChange'
         },
        components: { //定义组件

        },
        created() { //生命周期函数
            var that = this;
            this.routeChange();
        },

    }
</script>

<style lang="less" scoped>
/*点赞 收藏*/
.dlikeColBox{
    display: inline-block;
    float:right;
}
.dlikeBox,.dcollectBox{
    display: inline-block;
    padding:0 10px;
    height:35px;
    color: #e26d6d;
    line-height: 35px;
    border-radius: 35px;
    border: 1px solid #e26d6d;
    cursor: pointer;
}

/*赞赏*/
.donate-word{
    margin:40px 0;
    text-align: center;
}
.donate-word span{
    display: inline-block;
    width:80px;
    height:34px;
    line-height: 34px;
    color:#fff;
    background: #e26d6d;
    margin:0 auto;
    border-radius: 4px;
    cursor: pointer;
}
.donate-body{
    display: none;
}
.donate-body-show{
    display: block;
}
.donate-item{
    text-align: right;
}
.donate-item:last-child{
    text-align: left;
}
.donate-item img{
    width:100%;
    display: block;
    height:auto;
}
.donate-item div{
    display: inline-block;
    width: 150px;
    padding: 0 6px;
    box-sizing: border-box;
    text-align: center;
}
.donate-item div span{
    display: inline-block;
    width:100%;
    margin: 10px 0;
    text-align: center;
}
.donate-body .donate-item:first-of-type div{
    color:#44b549;
}
.donate-body .donate-item:nth-of-type(2) div{
    color:#00a0e9;
}

.bd_weixin_popup{
    position: fixed!important;
}



@font-face {
  font-family: octicons-link;
  src: url(data:font/woff;charset=utf-8;base64,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) format('woff');
}

.detailBox{
  z-index: 2;
}
.tcommonBox{
  background: transparent;
  backdrop-filter: blur(2px);
}
.head{
  height: 100%;
  border-radius: 4px;
}
.editor{
  padding: 0 20px;
}
.markdown-body .highlight pre,
.markdown-body pre {
  padding: 3px !important;
}
</style>
