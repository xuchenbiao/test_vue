<template>
  <div class="quanju">
    <el-container style="height: 100%">
      <el-header>
        <div id="header">
          <span><i class="el-icon-user-solid"></i>欢迎你,用户</span>
          <span   @click="loginOut()" style="cursor: pointer"><i class="iconfont icon-tuichu"></i></span>
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              style="border: 0;"
              active-text-color="#ffd04b">

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>整体菜单</span>
              </template>

              <el-menu-item index="1" @click="goToUser()"><i class="el-icon-user"></i>用户管理</el-menu-item>
              <el-menu-item index="2" @click="goToBooks()">
                <i class="el-icon-reading"></i>
                <span slot="title" >图书管理</span>
              </el-menu-item>

            </el-submenu>


          </el-menu>
        </el-aside>
        <el-main>
<!--          子组件中的子组件-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>

<script>

export default {
  name: "AdminPage",
  methods:{
    goToUser(){
      this.$router.push('/admin/user');
    },
    goToBooks(){
      this.$router.push('/admin/books')
    },
    //退出登陆
    loginOut(){
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/*框架的整体布局*/
.quanju{
  width: 100%;
  height: 100%;
  background-color:#545c64;
}

.el-header {
  background-color: rgb(84,92,100);
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: rgb(84,92,100);
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;

}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

/*header布局*/
#header{
  display: flex;
  justify-content: space-between;
}

</style>