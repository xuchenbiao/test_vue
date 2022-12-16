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
          label="单项总价"
          width="180"
      >
      </el-table-column>
      <el-table-column
          prop="date"
          label="日期">
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <div class="pagination-container">

      <el-pagination
          class="pagiantion"

          @current-change="handleCurrentChange"

          :current-page="pagination.currentPage"

          :page-size="pagination.pageSize"

          layout="total, prev, pager, next, jumper"

          :total="pagination.total">

      </el-pagination>

    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "UserShowHistory",

  data(){
    return{
      tableData:[],

      pagination: {//分页相关模型数据
        currentPage: 1,//当前页码
        pageSize:5,//每页显示的记录数
        total:0,//总记录数
        type: "",
        name:"",
        description:""
      },
    }
  },

  created(){
    this.getAll();
  },
  methods:{
    getAll(){
      axios.get("http://localhost:8080/api/counts/rtotal/"+this.pagination.currentPage+"/"+this.pagination.pageSize).then(
          res=>{
            console.log(res.data)
            this.pagination.currentPage = res.data.data.current;
            this.pagination.total = res.data.data.total;
            this.tableData=res.data.data.records;
          }
      )
    },

    //切换页码
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      //执行查询
      this.getAll();
    },


  }
}
</script>

<style scoped>

</style>