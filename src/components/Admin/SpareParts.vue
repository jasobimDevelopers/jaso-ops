<template>
  <div class="designDate">
    <div class="designmain">
      <div class="designHeader">备品备件</div>
      <table class="tableCon">
        <tr>
          <th style="width: 200px;">序号</th>
          <th style="width: 500px;">文件名</th>
          <th style="width: 150px;">类别</th>
          <th style="width: 150px;">操作</th>
        </tr>
        <tr v-for="list of lists">
          <td>{{list.id}}</td>
          <td>{{list.remark}}</td>
          <td>{{list.filetype}}</td>
          <td><a v-bind:href="'http://jasobim.com.cn:8080/iot/'+list.fileurl" v-bind:download="list.id">下载</a></td>
          <!--<td><a v-bind:href="'http://jasobim.com.cn:8080/iot/'+list.fileurl" v-bind:download="list.id">下载</a></td>-->
        </tr>
      </table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="tol">
      </el-pagination>
    </div>
    <input type=button value=返回 onclick="window.history.go(-1)">
  </div>
</template>
<script>
  export default{
      name:'SpareParts',//备品备件
    data(){
          return{
              //activeName:'first',
              lists:[],
            data:[],//获取到的数据条数
            tol:0,//总数
            currentPage:1,//当前页
            pageSize:4//每页的个数
          }
    },
    mounted(){
      this.load();
    },
    methods:{
      handleCurrentChange(){
        this.lists=this.data[this.currentPage-1];
      },
      load(){
        var self = this;
        self.$com.ajax({
          method:'get',
          url:'/operationInfos/admin/getOperationFilesList',
          params:{
            token:J.cookie('token'),//每一个请求都要加这个
            filetype:0,
          },
          success:(data)=>{//=>可以直接用this
//         self.lists=data.data;
            this.currentPage=1;
            this.tol=data.data.length;
            this.data=this.group(data.data,this.pageSize);
            this.lists=this.data[0];
          }
        });
      },
      group(arr,n){
        var a=[];
        for(var i=0;i<arr.length;i+=n){
          a.push(arr.slice(i,i+n));
        }
        return a;
      }
    }
  }
</script>
<style>
  .designDate{  background: #1b1c21; height: 850px; border-radius: 10px;}
  .designDate .designHeader{ line-height: 50px; border-bottom: 1px solid #666; width: 98%; margin: 0 auto; font-size: 16px;}
  .designDate .designmain{ width: 95%; margin: 0 auto;}
  .designDate .designmain .el-tabs__item{color: #fff;}
  .designDate input[type=button]{
    float: right;
    margin: 30px;
    width: 100px;
    height: 30px;
    background: #85ce61;
    border-color: #85ce61;
    border: none;
    border-radius: 2px;
  }
  .designDate .designmain .tableCon { width: 98%; margin: 0 auto;}
  .designDate .designmain .tableCon tr th{ width: 5%; line-height: 65px; text-align: center; border-bottom: 1px solid #636363; }
  .designDate .designmain .tableCon tr td{ width: 5%; line-height: 40px; text-align: center; border-bottom: 1px solid #636363;}
  .designDate .designmain .el-pagination::after{ clear: none;}
</style>
