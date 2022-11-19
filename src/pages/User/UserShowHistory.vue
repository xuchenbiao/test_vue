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
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "UserShowHistory",
  data(){
    return{
      tableData:[],
    }
  },

  created(){
    this.getAll();
  },
  methods:{
    getAll(){
      axios.get("http://localhost:8080/api/counts").then(
          res=>{
            console.log(res.data)
            this.tableData=res.data.data;
          }
      )
    }

  }
}
</script>

<style scoped>

</style>