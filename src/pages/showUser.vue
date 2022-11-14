<template>
<div class="border">

  <div class="search" style="float: left;">
    <el-input v-model="input" type="password" placeholder="请输入二级密码" @keyup.enter.native="spwd()"></el-input>
    <el-button @click="spwd()"><i class="el-icon-search" ></i></el-button>
  </div>

  <el-table
      :data="tableData"
      stripe
      border
      style="width: 100% ;">
    <el-table-column
        label="姓名"
        width="300">
      <template slot-scope="scope">

        <span style="margin-left: 10px">{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="密码"
        width="300">
      <template slot-scope="scope" v-if="secondPassword">

        <span style="margin-left: 10px">{{ scope.row.password }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>


  <div class="block">

    <el-pagination
        style="float: right"
        layout="prev, pager, next"
        :total="tableData.length">
    </el-pagination>
  </div>

</div>


</template>

<script>
import axios from "axios"
export default {
  name: "showUser",
  data() {
    return {
      tableData: [],
    //  二级密码输入,
      secondPassword:false,
      //输入框
      input:'',
    }
  },
  created(){
    this.getAll();
  },

  methods: {
    // 获取用户全部信息
    getAll(){
      axios.get('http://localhost/adminiplus/admini').then(
          res=>{
            console.log(res.data);
            if (res.data.flag===true){
              this.tableData=res.data.data;
              console.log(this.tableData)
            }
          }
      )
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  //确定二级密码
    spwd(){
       axios.post("http://localhost/adminiplus",{password:this.input}).then(
           res=>{
             console.log(res.data);
             if(res.data.flag===true){
               this.$message.success("二级密码正确!欢迎你,管理员");
               this.secondPassword=true;
               this.input='';
             }
             else {
               this.$message.warning(res.data.msg);
               this.input='';
             }
           }
       )
    }

  }
}
</script>

<style scoped>

.border{
  width: 100%;
  height: 100%;
  background: #fff;

}
.el-input{
  width: 200px;
  height: 110px;
  float: left;
}

</style>