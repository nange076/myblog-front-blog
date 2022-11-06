<template>
  <div class="footer-inner">
    <div class="footer-content">
      <a> 备案号：</a>
      <span> 赣ICP备2022008112号</span>
      <br>
      <a>前端托管于腾讯云web容器--后端部署于阿里云轻量级服务器</a>
      <br>
      <a>Made By haonan</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "foot"
}
</script>

<style scoped>
.footer-inner {
  height: 50px;
  padding: 1rem 0 1rem 0;
  text-align: center;
  background-color: rgba(30, 28, 28, 0.85);
}
.footer-inner a{
  color: #ffffff;
  font-weight: 200;
  font-size: 15px;
}
.footer-inner span{
  color: #00a0e9;
}
</style>
