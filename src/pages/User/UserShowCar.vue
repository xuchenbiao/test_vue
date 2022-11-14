<template>
  <div class="border">
    <el-table
        :data="tableData"
        stripe
        border
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

      <el-table-column label="操作" align="center">

        <template slot-scope="scope">


          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>



        </template>

      </el-table-column>
    </el-table>

    <div id="submit">
          <span>
            应付金额:<span style="color: red;margin-right: 20px;">￥{{ sum }}</span>
             <el-button type="primary" @click="submit()">提交订单</el-button>
          </span>
      <br>


    </div>
  </div>

</template>

<script>
import axios from "axios";
export default {
  name: "UserShowCar",
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
      axios.get("http://localhost/cars").then(
          res=>{
            if(res.data.flag===true){
              this.tableData=res.data.data;

            }
          }
      )
    },
    getSum(){
      axios.get('http://localhost/cars/price').then(
          res=>{

            this.sum=res.data.data;
          }
      )
    },




  //  提交订单
    submit(){
      this.$confirm("是否付款?","提示",{
        type:'warning',
        confirmButtonText: "是",
        cancelButtonText: "否",
      }).then(()=>{
        axios.post("http://localhost/counts").then(
            res=>{
              if (res.data.flag===true){
                this.$message.success("支付成功!");
              }
            }
        ).finally(()=>{
          this.getAll();
          this.getSum();
        })
      })

    },
    handleDelete(data){
      this.$confirm("是否删除?", "提示", {
        type: "warning",
        confirmButtonText: "是",
        cancelButtonText: "否",
      }).then(() => {
        axios.delete("http://localhost/cars/"+data.id).then(
            res => {
              // console.log(res.data);
              if (res.data.flag === true) {
                this.$message("删除成功!");

              } else {
                this.$alert("出现未知错误,请重试!");
              }
            },

        ).finally(()=>{
          this.getAll();
          this.getSum();
        })
      });
    }


  }
}
</script>

<style scoped>
.border{
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
}

#submit{
  float: right;
  margin: 10px;
}
</style>