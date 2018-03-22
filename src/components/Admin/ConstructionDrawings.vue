<template>
  <div class="designDate">
    <div class="designmain">
      <div class="designHeader">管综图纸</div>
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
    <input type='button' value='返回' onclick="window.history.go(-1)">
  </div>
</template>
<script>
  export default{
    name:'ConstructionDrawings',//施工深化图纸
    data(){
      return{
       // activeName:'first',
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
          url:'/constructionInfos/admin/getConstructionFileList',
          params:{
            //  floor:this.buildingId,//floor：代表楼栋数，默认第一栋，filetype:0、设计图纸，1、设计计算草书）
            token:J.cookie('token'),//每一个请求都要加这个
            filetype:2,
          },
          success:function(data){
//            self.lists=data.data;
            self.currentPage=1;
            self.tol=data.data.length;
            self.data=self.group(data.data,self.pageSize);
            self.lists=self.data[0];
            //console.log(self.lists[0].token)
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
  .designDate .designmain{ width: 95%; margin:0 auto;}
  .designDate input[type=button]{
    float: right;
    margin-right: 30px;
    width: 100px;
    height: 30px;
    background: #85ce61;
    border-color: #85ce61;
    border: none;
    border-radius: 2px;
  }
  .designDate .designmain select option{  color: #000;  }
  .designDate .designmain .tableCon { width: 98%;margin: 0 auto;}
  .designDate .designmain .tableCon tr th{ width: 5%; line-height: 65px; text-align: center; border-bottom: 1px solid #636363; }
  .designDate .designmain .tableCon tr td{ width: 5%; line-height: 40px; text-align: center; border-bottom: 1px solid #636363;}
  el-pagination{ margin-top: 30px;}
</style>

