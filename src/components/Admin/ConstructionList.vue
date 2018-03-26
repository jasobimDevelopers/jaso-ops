<template>
  <div class="designDate">
    <div class="designmain">
      <div class="designHeader">专项设计工单</div>
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
          <td><a v-bind:href="'http://jasobim.com.cn/iot/'+list.fileurl" v-bind:download="list.id">下载</a></td>
        </tr>
      </table>

    </div>
    <input type=button value=返回 onclick="window.history.go(-1)">
  </div>
</template>
<script>
  export default{
    name:'ConstructionList',//设计子单
    data(){
        return{
          lists:[]
        }
    },
    mounted(){
        this.load()
    },
    methods:{
      load(){
          var self = this;
          self.$com.ajax({
            method:'get',
            url:'/constructionInfos/admin/getConstructionFileList',
            params:{
              //  floor:this.buildingId,//floor：代表楼栋数，默认第一栋，filetype:0、设计图纸，1、设计计算草书）
              token:J.cookie('token'),//每一个请求都要加这个
              filetype:0,
            },
            success:function(data){
              self.lists=data.data;
              //console.log(self.lists[0].token)
            }
          })
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
  .designDate .designmain .tableCon { width: 98%;margin: 0 auto;}
  .designDate .designmain .tableCon tr th{ width: 5%; line-height: 65px; text-align: center; border-bottom: 1px solid #636363; }
  .designDate .designmain .tableCon tr td{ width: 5%; line-height: 40px; text-align: center; border-bottom: 1px solid #636363;}
</style>
