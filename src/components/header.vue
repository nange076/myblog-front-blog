<!-- 头部公用 -->
<template>
<div class="box">
    <navbar></navbar>
    <div class="headImgBox" >
      <div class="scene">
        <div><span id="luke"></span></div>
      </div>
	</div>
</div>
</template>
<script>
import navbar from "./navbar";
export default {
	components: { //定义组件
    navbar
	},
}
</script>

<style>
.scene {
  position: absolute;
  padding-top: 50px;
  width: 100%;
  /*height:300px;*/
  text-align: center;
  font-size: 100px;
  font-weight: 200;
  color: #fff;
  left: 0;
  z-index: 2;
  font-family: 'Sigmar One', Arial;
  text-shadow: 0 2px 2px #47456d;
}
.scene span {
  transform: matrix(1, 0, 0, 1, 0, 0);
  -webkit-transform: matrix(1, 0, 0, 1, 0, 0);
  text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
}
.box{
  padding-bottom: 20px;
  z-index: 9;
}
</style>
