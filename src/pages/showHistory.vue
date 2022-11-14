<template>
  <div class="border">
    <el-table
        :data="tableData"
        stripe
        style="width: 100%">
      <el-table-column
          prop="id"
          label="序号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="图书名称"
          width="180">
      </el-table-column>

      <el-table-column
          prop="price"
          label="单价"
          width="180">
      </el-table-column>
      <el-table-column
          prop="number"
          label="数量"
          width="180">
      </el-table-column>
      <el-table-column
          prop="totalprice"
          label="单项总价">
      </el-table-column>
    </el-table>

    <span style="font-size: 30px;">总计:￥{{sum}}</span>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "showHistory",
  data(){
    return{
      tableData:[],
      sum:0,
    }
  },

  created(){
    this.getAll();
    this.getSum();
  },
  methods:{
    getAll(){
      axios.get("http://localhost/counts").then(
          res=>{
            console.log(res.data)
            this.tableData=res.data.data;
          }
      )
    },

    getSum(){
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
}
</script>

<style scoped>

</style>