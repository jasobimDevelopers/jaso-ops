<script src="../../../static/common.js"></script>
<template>
  <div class="designDate">
    <div class="designmain designDrawing">
      <div class="designHeader">设计图纸</div>
      <select name="" id="" @change="load" v-model="buildingId">
        <option value="1">1#楼</option><!--到时候填入对应的id就可以-->
        <option value="2">2#楼</option>
        <option value="3">3#楼</option>
        <option value="4">4#楼</option>
        <option value="5">5#楼</option>
        <option value="6">6#楼</option>
        <option value="7">7#楼</option>
        <option value="8">8#楼</option>
        <option value="9">9#楼</option>
        <option value="10">10#楼</option>
        <option value="11">11#楼</option>
        <option value="12">12#楼</option>
        <option value="-1">地下室</option><!--到时候填入对应的id就可以-->
      </select>
      <div class="formTab">
        <ul>
        <li v-for="item in btn" v-bind:class="(item.protype==protype)?'active':''" v-on:click="active(item.protype)">{{item.name}}</li>
        </ul>
      </div>
      <div >
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

        <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="tol">
      </el-pagination>

        <!-->
      </div>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="电气" name="first">
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

        </el-tab-pane>
        <el-tab-pane label="给排水" name="second">
          <table class="tableCon">
            <tr>
              <th style="width: 200px;">序号</th>
              <th style="width: 500px;">文件名</th>
              <th style="width: 150px;">类别</th>
              <th style="width: 150px;">操作</th>
            </tr>
            <tr v-for="water of waterS">
              <td>{{water.id}}</td>
              <td>{{water.remark}}</td>
              <td>{{water.filetype}}</td>
              <td><a v-bind:href="'http://jasobim.com.cn:8080/iot/'+water.fileurl" v-bind:download="water.id">下载</a></td>
            </tr>
          </table>

        </el-tab-pane>
        <el-tab-pane label="消防" name="third">
          <table class="tableCon">
            <tr>
              <th style="width: 200px;">序号</th>
              <th style="width: 500px;">文件名</th>
              <th style="width: 150px;">类别</th>
              <th style="width: 150px;">操作</th>
            </tr>
            <tr v-for="safe of safety">
              <td>{{safe.id}}</td>
              <td>{{safe.remark}}</td>
              <td>{{safe.filetype}}</td>
              <td><a v-bind:href="'http://jasobim.com.cn:8080/iot/'+safe.fileurl" v-bind:download="safe.id">下载</a></td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="建筑" name="fifth">
          <table class="tableCon">
            <tr>
              <th style="width: 200px;">序号</th>
              <th style="width: 500px;">文件名</th>
              <th style="width: 150px;">类别</th>
              <th style="width: 150px;">操作</th>
            </tr>
            <tr v-for="build of building">
              <td>{{build.id}}</td>
              <td>{{build.remark}}</td>
              <td>{{build.filetype}}</td>
              <td><a v-bind:href="'http://jasobim.com.cn:8080/iot/'+build.fileurl" v-bind:download="build.id">下载</a></td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="结构" name="sixth">
          <table class="tableCon">
            <tr>
              <th style="width: 200px;">序号</th>
              <th style="width: 500px;">文件名</th>
              <th style="width: 150px;">类别</th>
              <th style="width: 150px;">操作</th>
            </tr>
            <tr v-for="structure of structures">
              <td>{{structure.id}}</td>
              <td>{{structure.remark}}</td>
              <td>{{structure.filetype}}</td>
              <td><a v-bind:href="'http://jasobim.com.cn:8080/iot/'+structure.fileurl" v-bind:download="structure.id">下载</a></td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="暖通" name="seven">
          <table class="tableCon">
            <tr>
              <th style="width: 200px;">序号</th>
              <th style="width: 500px;">文件名</th>
              <th style="width: 150px;">类别</th>
              <th style="width: 150px;">操作</th>
            </tr>
            <tr v-for="warm of warmer">
              <td>{{warm.id}}</td>
              <td>{{warm.remark}}</td>
              <td>{{warm.filetype}}</td>
              <td><a v-bind:href="'http://jasobim.com.cn:8080/iot/'+warm.fileurl" v-bind:download="warm.id">下载</a></td>
            </tr>
          </table>

        </el-tab-pane>
      </el-tabs>-->
      <input type=button value=返回 onclick="window.history.go(-1)">
    </div>

  </div>
</template>
<script>
  export default{
      name:'drawing',//设计图纸
    data(){
      return{
          btn:[
            {name:"电气",protype:0},
            {name:"给排水",protype:1},
            {name:"消防",protype:2},
            {name:"建筑",protype:3},
            {name:"结构",protype:4},
            {name:"暖通",protype:5},
          ],
        protype:0,
        buildingId:1,//楼号
        lists:[],//电气
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
        active:function(str){
          this.protype=str;
          this.load();
        },
        load(){
          var self = this;
          self.$com.ajax({
            method:'get',
            url:'/designInfos/admin/getDesignFileList',
            params:{
              floor:this.buildingId,//floor：代表楼栋数，默认第一栋，filetype:0、设计图纸，1、设计计算草书）
              token:J.cookie('token'),//每一个请求都要加这个
              filetype:0,
              protype:this.protype
            },
            success:(data)=>{//=>可以直接用this
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
  .wrap div{
    width: 300px;
    height: 300px;
    background-color: #0cc;
  }
  .active{
    background-color: red
  }
  .designDate{  background: #1b1c21; height: 850px; border-radius: 10px;}
  .designDate .designHeader{ line-height: 50px; border-bottom: 1px solid #666; width: 98%; margin: 0 auto; font-size: 16px;}
  .designDate .designmain{ width: 95%; margin: 0 auto;}
  .designDate .designmain .el-tabs__item{color: #fff;}
  .designDate .designmain .formTab{width: 100%;}
  .designDate .designmain .formTab ul {width: 100%;}
  .designDate .designmain .formTab ul li{ width: 80px; display: inline-block; color: #fff; text-align: center; cursor: pointer;}
  /*.designDate .designmain .formTab ul li.active{ border-bottom: 1px solid #f0ad4e;}*/
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
/*  .designDate .designmain .el-tabs{ width: 100%; position: relative; margin-left: 30px;}
  .designDate .designmain .el-tabs__content{ display: inline-block;}
  .designDate .designmain .el-tabs__active-bar{ display: none; color: #20a0ff;}
  .designDate .designmain .el-tabs__header{ width: 27%; border-right: 1px solid rgb(121, 121, 123); display: inline-block; height: 700px;border-bottom: none;}
  .designDate .designmain .el-tabs__item{ display: block; padding: 0; color: #fff; width: 100%; border-bottom: 1px solid rgb(121, 121, 123); }
  .designDate .designmain .el-tabs__item.is-active{ color: #ef8041;}
  .designDate .designmain .el-tabs__item:hover{ color: #ef8041;}
  .designDate .designmain .el-tabs__nav{ width: 100%;}
  .designDate .designmain .el-tabs__content{ position: absolute;!* border: 1px solid #FFA800;*! width: 73%; height: 100%; padding: 0 3%;}
  .designDate .designmain .el-form-item__label{ width: 100%; float: none; text-align: center; color: #fff; font-size: 18px; font-weight: inherit; line-height: 40px;}
  .designDate .designmain .el-form-item{ color: #fff; font-size: 14px; border: none; background: none; }
  .designDate .designmain .el-form-item .el-form-item-con{ color: #ef8041; font-size: 14px; display: block; }
  !*#repairPlan .fujian{ color: #ef8041; font-size: 14px; display: block; margin-left: 30px; }*!
  .designDate .designmain .el-form-item__content{ position: absolute; bottom: 100px;}*/
  .designDate .designmain select{
    width: 100px;
    background: none;
    height: 40px;
    padding-left: 8px;
    border: 1px solid #666;
    margin: 30px;
  }
  .designDate .designmain select option{  color: #000;  }
  .designDate .designmain .tableCon { width: 98%;margin: 0 auto;}
  .designDate .designmain .tableCon tr th{ width: 5%; line-height: 65px; text-align: center; border-bottom: 1px solid #636363; }
  .designDate .designmain .tableCon tr td{ width: 5%; line-height: 40px; text-align: center; border-bottom: 1px solid #636363;}
  .designDate .designmain .el-pagination::after{ clear: none;}
</style>

