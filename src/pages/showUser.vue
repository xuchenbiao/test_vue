<template>
<div class="border">

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
      secondPassword:'',
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


  }
}
</script>

<style scoped>

.border{
  width: 100%;
  height: 100%;
  background: #fff;





}

</style>