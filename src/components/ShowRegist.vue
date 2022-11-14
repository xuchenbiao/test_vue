<template>
  <div class="box">
    <i class="el-icon-close" @click="closeDetail()"   style="position:relative ; font-size: 20px;top:-84px; left: 164px; cursor: pointer;"></i>
    <span @click="back()"    style="color: rgb(22,22,22);position: relative; left:-100px; cursor: pointer;" ><i class="el-icon-arrow-left" ></i>返回</span>
    <div class="c1">

      <h1 style="text-align: center"  >注册</h1>
      <div class="input-box">
        <label>新用户名</label>
        <input type="text" name="username" v-model="username" />
      </div>
      <div class="input-box">
        <label>密码</label>
        <input
            type="password"
            name="password"
            id="password"
            v-model="password"
        />
      </div>
      <div class="btn-box">
        <a href="#">忘记密码?</a>
        <div>
          <button id="regist" @click="regist()">注册</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShowRegist",
  data() {
    return {
      username:'',
      password:'',
    };
  },
  methods:{


    closeDetail(){
      //向父组件传递参数关闭登陆窗口
      this.$emit('func1',false,false);
    },
    regist(){
      axios.post("http://localhost/enrolls",{username:this.username,password:this.password}).then(
          res=>{
            console.log(res.data);
            if(res.data.flag===true){
                this.$message.success(res.data.msg);

            //    注册成功后打开登陆组件,关闭注册组件
              setTimeout(()=>{
                this.$emit('func1',true,false);
              },1000)

            }
            else {
              this.$message.warning(res.data.msg)
            }
          }
      )
    },

    back(){
      this.$emit('func1',true,false);
    }
  }
};
</script>

<style>

.box {
  position:fixed;

  top: 200px;
  left: 1100px;

  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 420px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  background: rgba(136, 139, 141, 0.7);
  z-index: 99;
}

.box > h2 {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
}

.box .input-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-bottom: 10px;
}

.box .input-box > label {
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
}

.box .input-box > input {
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  height: 35px;
  width: 250px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  transition: 0.2s;
  outline: none;
  padding: 0 10px;
  letter-spacing: 1px;
}

.box .input-box > input:focus {
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.box .btn-box {
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.box .btn-box > a {
  font-size: 14px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  transition: 0.2s;
  width: 250px;
  text-align: end;
}

.box .btn-box > a:hover {
  color: rgba(255, 255, 255, 1);
}

.box .btn-box > div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  margin-top: 20px;
}

.box .btn-box > div > button {
  width: 120px;
  height: 35px;
  border: 1px solid rgba(197, 81, 58, 0.8);
  background: rgba(197, 81, 58, 0.5);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  transition: 0.2s;
  margin-right: 20px;
}
.box .btn-box > div > a {
  width: 118px;
  height: 33px;
  border: 1px solid rgba(197, 81, 58, 0.8);
  background: rgba(197, 81, 58, 0.5);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  transition: 0.2s;

  text-decoration: none;
  font-size: 14px;
  text-align: center;
  line-height: 35px;
}

.box .btn-box > div > button:nth-of-type(2) {
  margin-left: 10px;
}

.box .btn-box > div > button:hover {
  border: 1px solid rgba(248, 108, 76, 0.8);
  background: rgba(248, 108, 76, 0.5);
}

#eyes {
  position: relative;
  width: 25px;
  height: auto;
  left: 219px;
  bottom: 23px;
}
</style>