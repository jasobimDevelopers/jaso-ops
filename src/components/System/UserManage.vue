<template>
  <div id="userManage">
    <div class="userManage_top">
      <el-form :model="queryData" :inline="true" class="demo-form-inline">
        <el-form-item label="ID"><el-input v-model="queryData.id"></el-input></el-form-item>
        <el-form-item label="姓名"><el-input v-model="queryData.name"></el-input></el-form-item>
        <el-form-item label="所属岗位"><el-input v-model="queryData.depart"></el-input></el-form-item>
        <el-form-item label="工号"><el-input v-model="queryData.jobnumber"></el-input></el-form-item>
        <el-form-item><el-button type="primary" class="choose" @click="query()">筛选</el-button></el-form-item>
        <el-form-item><el-button type="warning" @click="dialogVisible03 = true" class="add additem">新增</el-button></el-form-item>
      </el-form>
      <!--添加弹框-->
      <el-dialog class="userAdd" title="新增用户" :visible.sync="dialogVisible03" style="top: 0;">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="用户名"><el-input v-model="form.userName" class="inline-input" ></el-input></el-form-item>
          <el-form-item label="密码"><el-input v-model="form.password" type="password" placeholder="请输入密码" class="inline-input" ></el-input></el-form-item>
          <el-form-item label="真实姓名"><el-input v-model="form.realName" class="inline-input" ></el-input></el-form-item>
          <el-form-item label="所属岗位">
            <el-select v-model="form.depart" placeholder="">
              <el-option label="项目部" value="项目部"></el-option>
              <el-option label="技术部" value="技术部"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="用户类型"><el-input v-model="form.userType" class="inline-input"></el-input></el-form-item>-->
          <el-form-item prop="email" label="邮箱" class="demo-dynamic">
            <el-input v-model="form.email" class="inline-input"></el-input></el-form-item>
          <el-form-item prop="tel" label="手机号" class="demo-dynamic">
            <el-input v-model="form.tel" class="inline-input"></el-input>
          </el-form-item>
          <el-form-item label="工号"><el-input v-model="form.jobnumber" class="inline-input"></el-input></el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="sendTo" type="success" @click="submitForm()">提交记录</el-button>
        </div>
      </el-dialog>
    </div>
    <!---->
    <div class="userManage_bottom_con">
      <div class="userManage_bottom">
        <table class="tableCon">
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>所属岗位</th>
            <th>邮箱</th>
            <th>手机号</th>
            <th>工号</th>
            <th>操作</th>
          </tr>
          <tr v-for="(person,index) of lists">
            <td>{{person.id}}</td>
            <td>{{person.realName}}</td>
            <td>{{person.depart}}</td>
            <td>{{person.email}}</td>
            <td>{{person.tel}}</td>
            <td>{{person.jobnumber}}</td>
            <td><button @click="updateusers(index)" class="change" style="border: none; background: none; color: #00aeef;">用户编辑</button></td>
          </tr>
        </table>
      </div>
      <!--添加弹框-->
      <el-dialog title="用户编辑" :visible.sync="dialogVisible04" style="top: 0;">
        <el-form :model="listss" :rules="rules" ref="listss">
          <el-form-item label="ID"><el-input v-model="listss.id" :value="listss.id"  class="inline-input" ></el-input></el-form-item>
          <el-form-item label="姓名"><el-input v-model="listss.realName" :value="listss.realName" class="inline-input"></el-input></el-form-item>
          <el-form-item label="所属岗位"><el-input v-model="listss.depart" :value="listss.depart" class="inline-input"></el-input></el-form-item>
          <el-form-item prop="email" label="邮箱" class="demo-dynamic">
            <el-input v-model="listss.email" :value="listss.email" class="inline-input"></el-input></el-form-item>
          <el-form-item prop="tel" label="手机号" class="demo-dynamic">
            <el-input v-model="listss.tel" :value="listss.tel" class="inline-input"></el-input></el-form-item>
          <el-form-item label="工号"><el-input v-model="listss.jobnumber" :value="listss.jobnumber" class="inline-input"></el-input></el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button class="sendTo " type="warning" @click="confirmEditChange()">确认修改</el-button>
          <el-button class="sendTo" type="danger" @click="confirmEditDel()" >删除用户</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        dialogVisible03: false,//新增
        dialogVisible04: false,//查看
        param:{},
        lists:[],
        token:{
          id:'',
          token:''
        },
        //筛选
        queryData:{
          id:'',
          name:'',
          depart:'',
          jobnumber:''
        },
        queryResult:[],
        //用户编辑
        listss:{
          id:'',
          realName:'',
          depart:'',
          email:'',
          tel:'',
          jobnumber:'',
          token:''
        },
        forms:{
          id:'',
          realName:'',
          depart:'',
          email:'',
          tel:'',
          jobnumber:'',
          token:''
        },
        //新增用户
        form:{
          id:'',
          userName:'',
          password:'',
          realName:'',
          registerDate:'',
          email:'',
          tel:'',
//          userType:'',
          depart:'',
          jobnumber:'',
          region:''
        },
        //验证
        rules:{
          email:this.$com.valid.email,
          tel:this.$com.valid.tel
        }
      }
    },
    mounted(){
      this.load();
    },
    methods: {
      load(){
          var self = this;
        self.$com.ajax({
          method:'get',
          url:'/user/getUserList',
          success:function(data){
            self.lists=data.data;
            console.log(self.lists[0].token)
          }
        });
      },
      // 新增用户
      submitForm(){
        var self = this;
        self.$com.validate(self.$refs.form,function(){
          self.$com.ajax({
            url:'/user/addUser',
            params: {
              'userName': self.form.userName,
              'password': self.form.password,
              'depart': self.form.depart,
              'realName': self.form.realName,
              'email': self.form.email,
              'tel': self.form.tel,
              'jobnumber': self.form.jobnumber
            },
            success:function (data) {
              self.$message({
                message: '添加用户成功',
                type: 'success'
              });
              self.load();
            }
          });
          self.dialogVisible03 = false;
        });
      },
      //  编辑
      updateusers(index){
        this.listss=this.lists[index];
        this.dialogVisible04 = true
      },
      //修改
      confirmEditChange(){
        var self = this;
        self.$com.validate(self.$refs.listss,function () {
          self.$com.ajax({
            url:'/user/updateUser',
            params:{
              'id': self.listss.id,
              'realName': self.listss.realName,
              'depart':self.listss.depart,
              'email':self.listss.email,
              'tel':self.listss.tel,
              'jobnumber':self.listss.jobnumber,
              token:self.listss.token,
            },
            success:function (data) {
              self.$message({
                message: '修改用户成功',
                type: 'success'
              });
            }
          });
          self.dialogVisible04 = false;
        })
      },

      //删除
      confirmEditDel(){
        var self = this;
        self.$com.validate(self.$refs.listss,function () {
          self.$com.ajax({
            method: 'GET',
            url:'/user/deleteUser',
            params:{
              'id': self.listss.id,
              'realName': self.listss.realName,
              'depart':self.listss.depart,
              'email':self.listss.email,
              'tel':self.listss.tel,
              'jobnumber':self.listss.jobnumber,
              token:self.listss.token,
            },
            success:function (data) {
              self.$message({
                message: '删除用户成功',
                type: 'success'
              });
              self.load();
            }
          });
          self.dialogVisible04 = false;
        })
      },
      //筛选
      query(){
        //params:this.queryData
        /*var _this=this;
        _this.$com.ajax({
          method:'get',
          url:'/user/query',
          params:this.queryData,
          success:function (data) {
            _this.lists=data;
          }
        });*/
        var data=[
          {
            id:'',
            realName:'',
            depart:'',
            email:'',
            tel:'',
            jobnumber:'',
            token:''
          },
        ];
        this.lists=data;
      },
    },
  }

</script>
<style lang="css">
  .row{ background: #18191d;}
  #userManage{ width: 100%; }
  #userManage .userManage_top{ width: 100%; padding: 30px 0; background: #1b1c21; border-radius: 10px; height: 80px; margin-bottom: 30px;}
  #userManage .userManage_top form.demo-form-inline{ display: flex;}
  #userManage .userManage_top form .add{ float: none; border-radius: 0;}
  #userManage .userManage_top .demo-form-inline{ width: 85%; }
  #userManage .userManage_top .demo-form-inline .choose{ margin-left: 47px; border-radius: 0;}
  #userManage .userManage_top .demo-form-inline .el-form-item{ margin-bottom: 0; display: flex; flex: 1; border: none; background: none;}
  #userManage .userManage_top .demo-form-inline .el-form-item .el-form-item__label{  padding: 5px 30px 5px 30px;  color: #fff;  vertical-align: middle; flex: 1;display: inline-table;}
  #userManage .userManage_top .demo-form-inline .el-input__inner {  width: 120px;  height: 30px;  background: #000;  border: none;  border-radius: 0;  color: #fff;  }
  #userManage .userManage_bottom_con{ width: 100%; background: #1b1c21; height: 750px; border-radius: 10px;}
  #userManage .userManage_bottom{ width: 80%; margin-top: 30px;}
  #userManage .demo-form-inline .el-form-item__content{ line-height: inherit; flex: 1}
  #userManage .tableCon{ width: 90%; margin-left: 30px;}
  #userManage .tableCon tr th{ width: 3%; line-height: 65px; text-align: center; border-bottom: 1px solid #636363; }
  #userManage .tableCon tr td{ width: 3%; line-height: 40px; text-align: center; border-bottom: 1px solid #636363;}
  /*add 弹框*/

  #userManage .el-dialog .el-form-item__error {  color: #fa5555;  font-size: 12px;  line-height: 1;  padding: 4px 0; position: inherit; margin: 0 auto;  width: 120px;  top: 100%;  left: 0;}
  #userManage .el-dialog{ background: #212226; border-radius: 10px; left: 0; width: 400px;}
  #userManage .el-dialog.el-dialog--small{ width: 24%; padding: 20px; top:0;}
  #userManage .el-dialog .el-dialog__header{ padding: 0; border-bottom: 1px solid rgb(121, 121, 123); line-height: 40px;}
  #userManage .el-dialog .el-dialog__title{ color: #fff; font-family: Regular; font-size: 14px; padding: 0 20px;}
  #userManage .el-dialog .el-form-item__label{ padding: 0; /*line-height: 40px;*/ margin-right: 20px; width: 100px; color: #fff;}
  #userManage .el-dialog .el-input__inner{width: 200px; height: 30px;  background: #000;  border: none; border-radius: 0;color: #fff;}
  #userManage .el-input{width: inherit;}
  #userManage .el-textarea{width: 82%;}
  #userManage .sendTo{ margin: 20px auto; display: block; width: 120px; border-radius: 0; margin-top: 30px; height: 32px;}
  #userManage .el-dialog .el-form .el-form-item{ margin-bottom: 10px; border: none; background: none;}
  /*#userManage .el-dialog .el-form .areatext .el-textarea__inner{ width: 100%; height: 360px; background: #000; border: none;outline: none; color: #fff;}*/
  #userManage .el-dialog .dialog-footer{ text-align: center;}
  #userManage .el-dialog__footer{ padding-bottom: 30px;}
  #userManage .el-dialog__body{ padding-bottom: 0;}
  #userManage .el-dialog .dialog-footer .el-button--success{ width: 200px; height: 30px; border-radius: 0;}
  #userManage .el-button--warning,#userManage .el-button--primary{ height: 32px;}
  #userManage .el-button--warning,#userManage .el-button{ line-height: 0.5;}
  #userManage .el-dialog__headerbtn{ top: 0!important;}
  .el-form-item__label{ line-height: inherit!important;}
</style>
