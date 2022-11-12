<template>
  <div id="Login" style="position: relative">
    <!-- 登陆注册弹窗界面 -->
    <ShowLogin ></ShowLogin>
    <!-- 整体界面布局 -->
    <div class="cas">
      <div class="header">
        <span id="list" @click="showDetail()">登陆/注册</span>
      </div>

      <el-carousel
          direction="horizontal"
          :interval="2000"
          height="500px"
          indicator-position="none"
          autoplay
      >
        <el-carousel-item v-for="item in image" :key="item.id">
          <h3 class="des">{{ item.text }}</h3>
          <el-image
              style="width: 100%; height: 100%"
              :src="item.src"
              fit="fill"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import ShowLogin from "@/components/ShowLogin.vue";

export default {
  name: "LoginS",
  components: { ShowLogin },
  data() {
    return {
      image: [
        {
          id: 0,
          text: "艺术来源于生活",
          src: require("@/img/bg1.jpg"),
        },
        {
          id: 1,
          text: "人生就是要去拼搏",
          src: require("@/img/bg2.jpg"),
        },
      ],

      // 展示或者隐藏登陆界面
      detail:false
    };
  },

  methods: {
    showDetail() {

    },
  },
};
</script>

<style>
.header {
  position: absolute;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-image: linear-gradient(
      to bottom,
      rgba(22, 22, 22, 1),
      rgba(22, 22, 22, 0.5)
  );
  z-index: 99;
}
.cas {
  position: relative;
  margin: 0 auto;
  width: 180vh;
  height: auto;
}

#list {
  float: right;
  color: rgb(113, 117, 120);
  font-size: 12px;
  cursor: pointer;
}
#list:hover {
  color: green;
}

.des {
  font-size: 2em;
  position: absolute;
  width: 100%;
  text-align: center;
  top: 8em;

  color: rgb(255, 255, 255);
  font-weight: 500;
  letter-spacing: 0.875rem;
  text-transform: uppercase;

  z-index: 99;
}
</style>