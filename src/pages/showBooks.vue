<template>

  <div class="border">
    <div class="filter-container">
      <el-input placeholder="图书类别" v-model="pagination.type" @keyup.enter.native="searchByClass()"  style="width: 200px;" class="filter-item"></el-input>
      <el-button @click="searchByClass()" class="dalfBut" >查询</el-button>

      <el-input placeholder="图书名称或类别" v-model="pagination.name" @keyup.enter.native="searchByName()" style="width: 200px;margin-left: 10px;" class="filter-item"></el-input>
      <el-button @click="searchByName()" class="dalfBut" >查询</el-button>
      <el-button type="primary" class="butT" @click="handleCancel()" v-if="is_cancel">取消查询</el-button>

      <el-button type="primary" class="butT" @click="handleCreate()">新建</el-button>

    </div>

    <el-table size="small" border  current-row-key="id" :data="dataList" stripe highlight-current-row>

      <el-table-column type="index" align="center" label="序号"></el-table-column>

      <el-table-column prop="type" label="图书类别" align="center"></el-table-column>

      <el-table-column prop="name" label="图书名称" align="center"></el-table-column>

      <el-table-column prop="description" label="描述" align="center"></el-table-column>
      <el-table-column prop="number" label="数量" align="center"></el-table-column>

      <el-table-column label="操作" align="center">

        <template slot-scope="scope">

          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>

          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>



        </template>

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

    <!--             新增标签弹层-->

    <div class="add-form">

      <el-dialog title="新增图书" :visible.sync="dialogFormVisible">

        <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

          <el-row>

            <el-col :span="12">

              <el-form-item label="图书类别" prop="type">

                <el-input v-model="formData.type"/>

              </el-form-item>

            </el-col>

            <el-col :span="12">

              <el-form-item label="图书名称" prop="name">

                <el-input v-model="formData.name"/>

              </el-form-item>

            </el-col>
            <el-col :span="12">

              <el-form-item label="图书数量" prop="number">

                <el-input v-model="formData.number"/>

              </el-form-item>

            </el-col>

          </el-row>


          <el-row>

            <el-col :span="24">

              <el-form-item label="描述">

                <el-input v-model="formData.description" type="textarea"></el-input>

              </el-form-item>

            </el-col>

          </el-row>

        </el-form>

        <div slot="footer" class="dialog-footer">

          <el-button @click="cancel()">取消</el-button>

          <el-button type="primary" @click="handleAdd()">确定</el-button>

        </div>

      </el-dialog>

    </div>

    <!-- 编辑标签弹层 -->

    <div class="add-form">

      <el-dialog title="编辑检查项" :visible.sync="dialogFormVisible4Edit">

        <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

          <el-row>

            <el-col :span="12">

              <el-form-item label="图书类别" prop="type">

                <el-input v-model="formData.type"/>

              </el-form-item>

            </el-col>

            <el-col :span="12">

              <el-form-item label="图书名称" prop="name">

                <el-input v-model="formData.name"/>

              </el-form-item>

            </el-col>
            <el-col :span="12">

              <el-form-item label="图书数量" prop="number">

                <el-input v-model="formData.number"/>

              </el-form-item>

            </el-col>

          </el-row>

          <el-row>

            <el-col :span="24">

              <el-form-item label="描述">

                <el-input v-model="formData.description" type="textarea"></el-input>

              </el-form-item>

            </el-col>

          </el-row>

        </el-form>

        <div slot="footer" class="dialog-footer">

          <el-button @click="cancel()">取消</el-button>

          <el-button type="primary" @click="handleEdit()">确定</el-button>

        </div>

      </el-dialog>

    </div>

  </div>



</template>

<script>

import axios from "axios";

export default {
  name: "showBooks",
  data(){
    return{
      dataList: [],//当前页要展示的列表数据
      dialogFormVisible: false,//添加表单是否可见
      dialogFormVisible4Edit:false,//编辑表单是否可见
      dialogFormVisibleBorrow:false, //编辑借书表单是否可见
      formData: {},//表单数据
      rules: {//校验规则
        type: [{ required: true, message: '图书类别为必填项', trigger: 'blur' }],
        name: [{ required: true, message: '图书名称为必填项', trigger: 'blur' }],
        number: [{ required: true, message: '图书数量为必填项', trigger: 'blur' }]
      },
      pagination: {//分页相关模型数据
        currentPage: 1,//当前页码
        pageSize:8,//每页显示的记录数
        total:0,//总记录数
        type: "",
        name:"",
        description:""
      },
      borrow:{
        borrowNums:'',
        id:''
      },

    //  取消查询
      is_cancel:false,
    }






  },

  //钩子函数，VUE对象初始化完成后自动执行
  created() {
    this.getAll();
  },

  methods: {
    //列表
    getAll() {
      // param = "?type="+this.pagination.type;
      // param +="&name="+this.pagination.name;
      // param +="&description="+this.pagination.description;
      // // console.log(param);
      //
      // //发送异步请求
      // axios.get("/books/"+this.pagination.currentPage+"/"+this.pagination.pageSize+param).then((res)=>{
      //     this.pagination.pageSize = res.data.data.size;
      //     this.pagination.currentPage = res.data.data.current;
      //     this.pagination.total = res.data.data.total;
      //
      //     this.dataList = res.data.data.records;
      // });
      axios.get("http://localhost/books").then((res)=>{
        console.log(res.data)
        this.dataList=res.data.data;
        this.is_cancel=false;

      })



    },

    //弹出添加窗口
    handleCreate() {
      this.dialogFormVisible=true;
      this. resetForm();
    },

    //重置表单
    resetForm() {
      this.formData={};
    },

    //添加
    handleAdd () {
      axios.post("http://localhost:8080/api/books",this.formData).then((res)=>{
        console.log(res)
        this.dialogFormVisible = false;
        this.$message.success("添加成功");
        this.getAll();

      })
    },

    //取消
    cancel(){
      this.dialogFormVisible=false;
      this.dialogFormVisible4Edit=false;
      this.dialogFormVisibleBorrow=false;
      this.borrow.borrowNums=''
      this.borrow.borrowNums=''
      this.$message.info("当前操作取消");
    },
    // 删除
    handleDelete(row) {
      //console.log(row)
      this.$confirm("此操作永久删除当前信息，是否继续？","提示",{type:"info"}).then(()=>{
        axios.delete("http://localhost:8080/api/books/"+row.id).then((res)=>{
          console.log(res);
          this.$message.success("删除成功");
        }).finally(()=>{
          //2.重新加载数据
          this.getAll();
        });
      }).catch(()=>{
        this.$message.info("取消操作");
      });
    },

    //弹出编辑窗口
    handleUpdate(row) {
      axios.get("http://localhost:8080/api/books/"+row.id).then((res)=>{

        this.dialogFormVisible4Edit = true;
        this.formData = res.data.data;

      })
    },

    //修改
    handleEdit() {
      axios.put("http://localhost:8080/api/books",this.formData).then((res)=>{
        //判断当前操作是否成功
        console.log(res)
        //1.关闭弹层
        this.dialogFormVisible4Edit = false;
        this.$message.success("修改成功");

      }).finally(()=>{
        //2.重新加载数据
        this.getAll();
      });
    },

    handleCancel(){
      this.pagination.name='';
      this.pagination.type='';
      this.getAll();
    },
    //分页查询

    //切换页码
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      //执行查询
      this.getAll();
    },


    //    图书类别查询
    searchByClass(){
      axios.get("http://localhost:8080/api/books/type/"+this.pagination.type).then(
          res=>{
            if(res.data.flag===true){
              this.dataList=res.data.data;

              this.is_cancel=true;

            }

          }
      )
    },
    //    图书名称查询
    searchByName(){
      if(this.pagination.name===''){
        this.getAll();
      }
      else{
        axios.get("http://localhost:8080/api/books/nade/"+this.pagination.name).then(
            res=>{
              if (res.data.flag===true){
                this.dataList=res.data.data;

                this.is_cancel=true;



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
  background-color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}


</style>