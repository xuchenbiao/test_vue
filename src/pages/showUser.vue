<template>
  <div class="border">

    <div class="search" style="float: left;">
      <el-input v-model="input" type="password" placeholder="请输入二级密码" @keyup.enter.native="spwd()"></el-input>
      <el-button @click="spwd()"><i class="el-icon-search" ></i></el-button>

    </div>
    <div style="float: right">
      <el-input v-model="input2" type="test" placeholder="查询用户" @keyup.enter.native="susr()"></el-input>
      <el-button @click="susr()"><i class="el-icon-search" ></i></el-button>
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

      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
              size="mini"
              v-if="secondPassword"
              @click="handleEdit( scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              v-if="secondPassword"
              @click="handleDelete( scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--编辑弹出框-->
    <div class="add-form">

      <el-dialog title="编辑" :visible.sync="dialogFormVisible">

        <el-form ref="dataEditForm" :model="formData"  label-position="right" label-width="100px">

          <el-row>

            <el-col :span="12">

              <el-form-item label="用户名" prop="username">

                <el-input v-model="formData.username"/>

              </el-form-item>

            </el-col>

            <el-col :span="12">

              <el-form-item label="密码" prop="password">

                <el-input v-model="formData.password"/>

              </el-form-item>

            </el-col>


          </el-row>




        </el-form>

        <div slot="footer" class="dialog-footer">

          <el-button @click="cancel()">取消</el-button>

          <el-button type="primary" @click="confirmEdit()">确定</el-button>

        </div>

      </el-dialog>

    </div>



    <!--  分页-->
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
      input2:'',

      //表单数据
      formData:{},
      dialogFormVisible:false,

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



    //打开编辑弹窗
    handleEdit(data) {
      // console.log(index, row);

      axios.get('http://localhost/users/name/'+data.username).then(
          res=>{
            if(res.data.flag===true){
              // console.log(res.data.data[0]);
              this.formData=res.data.data[0];

            }
          }
      )
      this.dialogFormVisible=true;

    },
    //取消弹窗
    cancel(){
      this.dialogFormVisible=false;
      this.$message("操作取消");
    },
    //确认编辑
    confirmEdit(){
      axios.put('http://localhost/users',{
        id:this.formData.id,
        username:this.formData.username,
        password:this.formData.password
      }).then(
          res=>{
            if (res.data.flag===true){
              this.$message.success('编辑成功!');
              this.dialogFormVisible=false;
            }
            else{
              this.message.warning("编辑有误,请重试!");
            }
          }
      ).finally(()=>{
        this.getAll();
      })
    },



    handleDelete(data) {
      // console.log(index, row);
      this.$confirm('是否删除').then(()=>{

        axios.delete('http://localhost/users/'+data.id).then(

            res=>{
              console.log(res.data)
              if(res.data.flag===true){
                this.$message.success('删除成功!');
              }

            },
            err=>{
              console.log(err.mesage);
            }

        ).finally(()=>{
          this.getAll();
        })
      })
    },
    //确定二级密码
    spwd(){
      axios.post("http://localhost:8080/api/adminiplus",{password:this.input}).then(
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
    },
    //查询用户
    susr(){
      //输入不为空
      if(this.input2===''){
        this.getAll();
      }
      else {
        axios.get('http://localhost:8080/api/users/name/'+this.input2).then(
            res=>{
              if(res.data.flag===true){
                this.tableData=res.data.data;
              }
            }
        )
      }

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