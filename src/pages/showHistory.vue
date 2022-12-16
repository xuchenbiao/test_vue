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

    <span style="font-size: 30px;">总计:￥{{sum}}</span>
    <el-button type="danger" style="float: right;" @click="DelAll" >删除全部历史记录</el-button>

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
    this.getSum();
  },
  methods:{
    getAll(){
      axios.get("http://localhost:8080/api/counts/"+this.pagination.currentPage+"/"+this.pagination.pageSize).then(
          res=>{
            // console.log(res.data)
            this.pagination.currentPage = res.data.data.current;
            this.pagination.total = res.data.data.total;
            this.tableData=res.data.data.records;
          }
      )
    },

    getSum(){
      axios.get('http://localhost:8080/api/counts/price').then(
          res=>{
            // console.log(res.data);
            if (res.data.flag===true){
              this.sum=res.data.data;
            }

          }
      )
    },

    //切换页码
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      //执行查询
      this.getAll();
    },

  //  删除全部历史记录
    DelAll(){
      this.$confirm("此操作永久删除当前信息，是否继续？","提示",{type:"info"}).then(()=>{
        axios.delete("http://localhost:8080/api/counts").then(
            res=>{
              if (res.data.flag===true){
                this.$message("删除成功")
              }
              else {
                this.$message.warning("删除失败!")
              }
            }
        ).finally(()=>{
          this.getSum();
          this.getAll();


        })
      })

    }





  }
}
</script>

<style scoped>

</style>