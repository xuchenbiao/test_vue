<template>

  <div class="border">
    <div class="filter-container">
      <el-input placeholder="图书类别" v-model="pagination.type" @keyup.enter.native="searchByClass()"  style="width: 200px;" class="filter-item"></el-input>
      <el-button @click="searchByClass()" class="dalfBut" >查询</el-button>

      <el-input placeholder="图书名称" v-model="pagination.name" @keyup.enter.native="searchByName()" style="width: 200px;" class="filter-item"></el-input>
      <el-button @click="searchByName()" class="dalfBut">查询</el-button>
    </div>

    <el-table size="small" border  current-row-key="id" :data="dataList" stripe highlight-current-row>

      <el-table-column type="index" align="center" label="序号"></el-table-column>

      <el-table-column prop="type" label="图书类别" align="center"></el-table-column>

      <el-table-column prop="name" label="图书名称" align="center"></el-table-column>

      <el-table-column prop="description" label="描述" align="center"></el-table-column>
      <el-table-column prop="number" label="数量" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" align="center"></el-table-column>


      <el-table-column label="操作" align="center">

        <template slot-scope="scope">

          <el-button type="success" size="mini" @click="handleBorrow(scope.row)">借书</el-button>
          <el-button  type="primary" size="mini" @click="handleCar(scope.row)">加入购物车</el-button>


        </template>s

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



    <!--            借书数量界面-->
    <div class="add-form">
      <el-dialog title="借书数量" :visible.sync="dialogFormVisibleBorrow">
        <el-row>
          <el-input v-model="borrow.borrowNums" type="textarea"> </el-input>
        </el-row>

        <div slot="footer" class="dialog-footer">

          <el-button @click="cancel()">取消</el-button>

          <el-button type="primary" @click="btnBorrow()">确定</el-button>





        </div>
      </el-dialog>


    </div>

<!--    加入购物车页面-->

    <div class="add-form">
      <el-dialog title="数量" :visible.sync="dialogFormVisibleCar">
        <el-row>
          <el-input v-model="car.num" type="textarea"> </el-input>
        </el-row>

        <div slot="footer" class="dialog-footer">

          <el-button @click="cancel()">取消</el-button>

          <el-button type="primary" @click="btnCar()">确定</el-button>





        </div>
      </el-dialog>


    </div>
  </div>



</template>

<script>

import axios from "axios";

export default {
  name: "UserShowBooks",
  data(){
    return{
      dataList: [],//当前页要展示的列表数据
      dialogFormVisible: false,//添加表单是否可见
      dialogFormVisible4Edit:false,//编辑表单是否可见
      dialogFormVisibleBorrow:false, //编辑借书表单是否可见
      dialogFormVisibleCar:false, //编辑加入购物车表单是否可见
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

      car:{
        name:'',
        price:'',
        num:'',
      }
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
      axios.get("http://localhost:8080/api/books").then((res)=>{
        console.log(res.data)
        this.dataList=res.data.data;

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


    //取消
    cancel(){
      this.dialogFormVisible=false;
      this.dialogFormVisible4Edit=false;
      this.dialogFormVisibleBorrow=false;
      this.dialogFormVisibleCar=false;
      this.borrow.borrowNums=''

      this.car.num=''
      this.$message.info("当前操作取消");
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

    //打开借书界面
    handleBorrow(row){
      // console.log(row.id)
      this.dialogFormVisibleBorrow=true;
      this.borrow.id=row.id


    },
    //进行借书
    btnBorrow(){

      axios.get("http://localhost:8080/api/borrows/"+this.borrow.id+"/"+this.borrow.borrowNums).then(
          res=>{
            console.log(res.data);
            if(res.data.flag===true){
              this.$message.success('借书成功!');
              this.dialogFormVisibleBorrow=false;
              this.borrow.borrowNums='';

            }
            else {
              this.$message.warning('借书失败!')
            }

          },
          err=>{
            console.log(err.message)
          }
      ).finally(()=>{
        this.getAll();
      })
    },
    //弹出购物添加界面
    handleCar(data){
      console.log('购物车添加界面数据',data);
      this.dialogFormVisibleCar=true;
      this.car.name=data.name;
      this.car.price=data.price;
    },
    //正式添加进购物车
    btnCar(){
      axios.post('http://localhost:8080/api/cars',{
        name:this.car.name,
        price: this.car.price,
        number:this.car.num
      }).then(
          res=>{
            console.log("加入购物车步骤",res.data.data)
            if (res.data.flag===true){
              this.$message.success("加入购物车成功!");
              this.car.num='';
              this.dialogFormVisibleCar=false;
            }
            else {
              this.$message.warning("数量错误!请查看是否数量超过现有存量!");
            }
          }
      )
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
              this.pagination.type='';
              this.pagination.name='';

            }
            else {

              this.pagination.type='';
              this.pagination.name='';


            }
          }
      )
    },
    //    图书名称查询
    searchByName(){
      axios.get("http://localhost:8080/api/books/name/"+this.pagination.name).then(
          res=>{
            if (res.data.flag===true){
              this.dataList=res.data.data;
              this.pagination.name='';
              this.pagination.type='';



            }
            else {

              this.pagination.name='';
              this.pagination.type='';



            }
          }
      )
    },





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