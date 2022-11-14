<template>
  <div class="border">
    <h1 style="font-size: 50px;">恭喜</h1>
    <h2 style="font-size: 30px;">您累计总收入为:</h2>
    <h3 style="font-size: 50px">{{sum}}&nbsp;元</h3>
  </div>


</template>

<script>
import axios from "axios"
export default {
  name: "homePage",
  data(){
    return{
      sum:0,
    }
  },

  mounted(){
    axios.get('http://localhost/counts/price').then(
        res=>{
          // console.log(res.data);
          if (res.data.flag===true){
            this.sum=res.data.data;
          }

        }
    )
  }
}
</script>

<style scoped>

</style>