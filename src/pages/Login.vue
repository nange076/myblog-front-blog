<!-- 登录注册 -->
<template>
  <div>
    <div class="head">
      <navbar></navbar>
    </div>
    <div class="content">
      <div class="container">
        <!-- 登录注册 -->
        <div  class="form">
          <el-form :model="form" status-icon :rules="rules" ref="form" v-if="login==1" class="loginBox">
            <div class="lr-title">
              <h1>ZenithZone</h1>
            </div>
            <el-form-item prop="username">
              <el-input
                type="text"
                placeholder="用户名"
                v-model="form.username">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="密码"
                @keyup.enter.native="loginEnterFun"
                v-model="form.password">
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <div class="ca-box">
                <el-input
                  class="ca-input"
                  type="text"
                  placeholder="验证码"
                  v-model="form.code"
                ></el-input>
                <img :src="captcha" class="ca" @click="getCaptchaInfo">
              </div>
            </el-form-item>
            <div class="lr-btn tcolors-bg" @click="gotoHome">登录</div>
            <h3>
              <a href="">忘记密码？</a>
            </h3>
          </el-form>
          <el-form :model="form" status-icon :rules="rules" ref="form" v-else class="loginBox">
            <div class="lr-title">
              <h1>ZenithZone</h1>
            </div>
            <el-form-item prop="nusername">
              <el-input
                type="text"
                placeholder="用户名"
                v-model="form.nusername">
              </el-input>
            </el-form-item>
            <el-form-item prop="nnickName">
              <el-input
                type="text"
                placeholder="昵称"
                v-model="form.nnickName">
              </el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                type="email"
                ref="email"
                placeholder="邮箱"
                v-model="form.email">
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <div class="ca-box">
                <el-input
                  class="ca-input"
                  type="text"
                  placeholder="验证码"
                  v-model="form.code"
                ></el-input>
                <el-tooltip effect="dark" content="获取邮箱验证码" placement="right-start">
                  <div class="btn-small tcolors-bg" @click="getRegisterCode"  element-loading-text="获取验证码...">获取验证码</div>
                </el-tooltip>
              </div>
            </el-form-item>
            <el-form-item prop="npassword">
              <el-input
                type="password"
                placeholder="密码:6-12位英文、数字、下划线"
                v-model="form.npassword">
              </el-input>
            </el-form-item>
            <el-form-item prop="npassword2">
              <el-input
                type="password"
                placeholder="确认密码"
                @keyup.enter.native="registerEnterFun"
                v-model="form.npassword2">
              </el-input>
            </el-form-item>
              <div class="lr-btn tcolors-bg" @click="newRegister" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-text="提交中">注册</div>
          </el-form>
        </div>

      </div>
    </div>
    <div class="foot">
      <foot></foot>
    </div>
  </div>

</template>

<script>
import navbar from "../components/navbar";
import foot from "../components/foot";
import {userLogin,userRegister,getCaptcha,sendRegisterMail} from '../api/user.js'
import {setToken} from '../utils/auth.js'
import {Message} from "element-ui";
export default {
  name: 'Login',
  data() { //选项 / 数据
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.npassword2 !== '') {
          this.$refs.form.validateField('npassword2');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.npassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form:{
        username: '',//用户名
        email: '',//邮箱
        nnickName:'',//新用户昵称
        password: '',//密码
        nusername: '',//新用户注册名
        npassword: '',//新用户注册密码
        npassword2: '',//新用户注册重复密码
        code:'',//验证码
      },
      login: 0,//是否已经登录
      uuid:'',
      captcha:'',

      rules:{
        username: [
          {required: true ,message: '请输入用户名',trigger: 'blur'}
        ],
        password:[
          {required: true ,message: '请输入密码',trigger: 'blur'}
        ],
        nusername:[
          {required: true ,message: '请输入用户名',trigger: 'blur'}
        ],
        nnickName:[
          {required: true ,message: '请输入昵称',trigger: 'blur'}
        ],
        email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        npassword:[
          {validator: validatePass,trigger: 'blur'}
        ],
        npassword2:[
          {validator: validatePass2,trigger: 'blur'}
        ],
        code:[
          {required: true ,message: '请输入验证码',trigger: 'blur'}
        ],
      }

    }
  },
  methods: { //事件处理器
   async routeChange(){
      var that = this;
      that.login = that.$route.query.login==undefined?1:parseInt(that.$route.query.login);//获取传参的login
      that.urlstate = that.$route.query.urlstate==undefined?0:that.$route.query.urlstate;//获取传参的usrlstate状态码
      this.$refs.form.resetFields();
    },
    loginEnterFun: function(e){
      var keyCode = window.event? e.keyCode:e.which;
      // console.log('回车登录',keyCode,e);
      if(keyCode == 13 ){
        this.gotoHome();
      }
    },
    //获取邮件验证码
    getRegisterCode(){
     this.$refs.form.validateField("email",(valid)=>{
       if (valid.length>0){
         console.log("email validated fail")
         return
       }
       sendRegisterMail(this.form.email).then(res=>{
          this.uuid=res.uuid
          Message.success("邮件验证码发送成功")
       })
     })
    },
    gotoHome:function(){//用户登录
     this.$refs.form.validate((valid)=>{
       if(valid){
         userLogin(this.form.username,this.form.password,this.form.code,this.uuid).then((response)=>{
           // 登录成功记录token和用户信息，登录失败给对应提示
           setToken(response.token)
           // 存储用户信息
           localStorage.setItem("userInfo",JSON.stringify(response.userInfo))
           if(localStorage.getItem('logUrl')){
             this.$router.push({path:localStorage.getItem('logUrl')});
           }else{
             this.$router.push({path:'/'});
           }
           this.getCaptchaInfo()
         })
       }else{
         console.log('error submit!!');
         return false;
       }
     });
    },
    registerEnterFun: function(e){
      var keyCode = window.event? e.keyCode:e.which;
      // console.log('回车注册',keyCode,e);
      if(keyCode == 13 ){
        this.newRegister();
      }
    },
    newRegister:function(){//注册提交
      this.$refs.form.validate((valid)=>{
        if(valid){
          this.fullscreenLoading = true;
          userRegister(this.form.nusername,this.form.nnickName,this.form.email,this.form.npassword,this.uuid,this.form.code).then((response)=>{
            //注册成功后跳转到登录
            Message.success("注册成功！去登陆吧！")
            this.goLogin()
          }).catch((error)=>{
            this.fullscreenLoading = false;
          })
        }
      })
    },
    goLogin:function(){//去登陆
      this.$router.push({path:'/Login?login=1'});
    },
    goRegister: function(){//去注册
      this.$router.push({path:'/Login?login=0'});
    },
    getCaptchaInfo(){
     getCaptcha().then(response =>{
        this.uuid=response.uuid
        this.captcha=response.img
     })
    }

  },
  components: { //定义组件
    navbar,
    foot,
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route':'routeChange',
    login:{
      async handler(newV,oldV){
        if(this.login ==1){
         await this.getCaptchaInfo()
         await this.$refs.form.resetFields()
        }
      },
    }

},
created() { //生命周期函数
    var that = this;
    that.routeChange()
  },
}
</script>

<style>
html,body{
  height: 100%;
}
body{
  display: block;

}
.box{
}
.head{

}
.content{
  display: block;
}
.foot{
  width: 100%;
  position:fixed;bottom:0;
}
/*登录注册标题*/
.loginTitle{
    text-align: center;
    font-size: 26px;
    padding-top:50px;
    margin-bottom: 20px;
}
.loginBox{
    padding:40px;
    max-width:320px;
    margin:0 auto;
    border-radius: 10px;
    backdrop-filter: blur(2rem);
  background: transparent;
  background: linear-gradient(to top, rgb(255, 255, 255,0.3) 0%, rgba(156, 118, 192, 0.3) 70%);
  border-bottom: 2px solid #b1d8ee;
  border-right: 2px solid #b1d8ee;
  border-top: 2px solid #b6c6d3;
  border-left: 2px solid #b6c6d3;
  transition-duration: 1s;
  transition-property: border-top,
  border-left,
  border-bottom,
  border-right,
  box-shadow;
    backdrop-filter: blur(2px);
}
.loginBox:hover{
  border-top: 2px solid #6c95b7;
  border-left: 2px solid #6c95b7;
  border-bottom: 2px solid rgb(108, 149, 183);
  border-right: 2px solid rgb(108, 149, 183);
  box-shadow: rgba(48, 123, 185, 0.4) 5px 5px, rgba(48, 123, 185, 0.3) 10px 10px, rgba(48, 123, 185, 0.2) 15px 15px, rgba(48, 123, 185, 0.1) 20px 20px, rgba(48, 123, 185, 0.05) 25px 25px;
}
.lr-title{
    position: relative;
    height:32px;
    line-height: 32px;
    margin-bottom: 20px;
}
.lr-title h1{
    text-align: center;
    font-size: 24px;
    color: #48576a;
    font-weight: bold;
    /*width:50%;*/
}
.lr-title p{
    font-size: 12px;
    color: #ffffff;
    position: absolute;
    right:0;
    top:0;
}
.lr-btn{
    text-align: center;
    letter-spacing: 5px;
    padding:8px;
    margin-bottom: 30px;
}
.lr-btn ,.btn-small{
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  /* 给边框加阴影能够使其有立体感 */
  box-shadow: 2px 2px 0 0 rgba(0,0,0,0.3);
}
.btn-small{
  width: 100px;
  height: 30px;
  padding: 4px 10px 5px;
  margin-left: 5px;
  flex: 1 1 auto;
  position: relative;
}
.loginBox .el-alert ,.registerBox .el-alert{
    top:-18px;
    background-color: transparent;
}
.el-alert{
  color: rgba(231, 78, 78, 0.84);
}
.loginBox .el-input input,.registerBox .el-input input{
    border-radius: 4px;
}
.loginBox h3,.registerBox h3{
    color: #0f9ff1;
    text-align: right;
    margin-bottom: 20px;
}
.loginBox h3 a,.registerBox h3 a{
    font-size: 13px;
}
.loginBox .otherLogin{
    max-width:320px;
    padding:30px 40px;
    background: #ddd;
    text-align: center;
    margin-left:-40px;
    margin-right: -40px;
    visibility: hidden;
}
.loginBox .otherLogin p{
    margin-bottom:20px;
    font-size: 16px;
}
.loginBox .otherLogin a i{
    display: inline-block;
    width: 42px;
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    border-radius: 50%;
    color:#fff;
    margin: 0 10px;
}
.loginBox .otherLogin a i.fa-wechat{
    background: #7bc549;
}
.loginBox .otherLogin a i.fa-qq{
    background: #56b6e7;
}
.loginBox .otherLogin a i.fa-weibo{
    background: #ff763b;
}

/*登录成功*/
.registerSuc{
    padding: 40px;
    margin: 0 auto;
}
.registerSuc .sucIcon{
    text-align: center;
    margin-bottom: 30px;
    padding-left:60px;
}
.registerSuc .sucContent{
    line-height: 1.5;
    font-size: 15px;
    text-align: center;
}
.registerSuc .sucContent p{
    margin-top: 10px;
    font-size: 13px;
    color: #999;
}
.registerSuc .sucContent .lastbtn{
    display: inline-block;
    font-size: 14px;
    padding: 3px 10px;
    border-radius: 5px;
    color:#fff;
    cursor: pointer;
}
.registerSuc .sucContent  .el-icon-close{
    fong-size: 13px;
}
.form {
  height: 600px;
  background: transparent;
}
.el-input__inner{
  /* 使input框的背景变透明 */
  background-color: rgb(255, 255, 255,0.5);
  /* 使边框也变透明 */
  border-color: rgba(245, 245, 245, 0.3);
  /* 改变获取焦点后的竖线颜色 */
  caret-color: rgba(30, 28, 28, 0.89);
  /* 给边框加阴影能够使其有立体感 */
  box-shadow: 2px 2px 0 0 rgba(0,0,0,0.2);

}

.el-input__inner:hover{
  border-color: rgb(108, 149, 183);
}

.el-input__inner:focus{
  border-color: rgb(108, 149, 183);
}

.el-input__inner::placeholder {
  color: rgba(0, 0, 0, 0.66);
  text-align:left;
}
.jumpLink{
  text-align: right;
  color: #56124e;
}
.ca-box{
  display: flex;
  flex-flow: row;
}
.ca-input{
 flex: 1 1 auto;
}
.ca{
  padding: 0px 10px 0px;
  flex: 1 1 auto;
  position: relative;

}
</style>
