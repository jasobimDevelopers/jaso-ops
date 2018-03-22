<template>
  <div class="login">
      <div class="App" id="logoIn">
        <div class="log"><img src="../../images/logo.png" width="393" height="166" alt=""/></div>
        <div class="regMain">
          <div class="userName">
            <input class="username" type="text" name="userName" v-model="formData.userName" /><i></i>
          </div>
          <div class="userPassword">
            <input class="userpassword" type="password" name="password" v-model="formData.password" /><i></i>
          </div>
        </div>
        <button class="btn regIn" type="button" @click="login">登录</button>
        <!--<button class="btn regIn" type="button" v-on:keyup.13="login">登录</button>-->
      </div>

  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'login',
    data () {
      return {
        formData: {
          userName: '',
          password: ''
        },
        //验证
        rules:{
          userName:this.$com.valid.userName,
          password:this.$com.valid.password
        }
      }
    },
    methods:{
      login () {
        var self = this;
        var pwd=this.formData.password;
        var pwdd=/^(\w)/;
      /*  self.$com.validate(self.$refs.formData,function(){
          self.$com.ajax({
            url:'/user/login',
            params: {'userName':this.formData.userName , 'password':this.formData.password},
            success:function (data) {
              if(data.callStatus == 'SUCCEED'){
                self.$message({
                  message: '登录成功',
                  type: 'success'
                });
                self.$router.push({name:'Home', path: '/home' });
              }else {
                self.$message.error('用户名或密码错误');
              }
            }
          });
          self.dialogVisible03 = false;
        });*/
       if(this.formData.userName == "" || this.formData.password == ""){
          self.$message.error('请输入用户名或密码');
        }else {
            if( pwd.length >20 || pwd.length<6){//校验密码：只能输入6-20个字母、数字、下划线
              self.$message.error('对不起，密码长度必须在6-20位之间');
            }else if( !pwdd.exec(pwd) ){
              self.$message.error('对不起，密码不能包含非法字符');
            }else{
              self.$com.ajax({
                url: "/user/login",
                params: {
                    'userName':this.formData.userName ,
                    'password':this.formData.password},
                // dataType: "json",
                success: function (data) {
                  if(data.callStatus == 'SUCCEED'){
//                alert("登录成功");
                    J.cookie('token',data.token);
                    self.$router.push({name:'Home', path: '/home' });
                  }else {
                    self.$message.error('用户名或密码错误');
                  }
                }
              })
            }
        }
      }
    }
  }
</script>

<style>
  /*公共部分*/
  html,body,div{ margin: 0;padding: 0;  }
  .clearfix:after{
    content: '';
    height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
  a{text-decoration: none;  }
  input{ outline: none;}
  /*内容部分*/
.login{
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left: 0;
  background: url("../../images/bg.png") no-repeat;
  background-size: cover;
}
.login p{
  /*color: red;*/
  text-align: left;
  /* line-height: 30px; */
  position: absolute;
 margin-top: 35px;
  width: 100%;
  margin-left: 40px;
}
  #logoIn{
    width: 380px;
    position: absolute;
    top: 25%;
    left: calc(50% - 190px);
  }
  #logoIn .logo{ margin-bottom: 40px;}
  #logoIn .regMain{
    height: 184px;
    background: url("../../images/bg_item.png") no-repeat;
    background-size: 100% 100%;
  }
  #logoIn .regMain .userName,#logoIn .regMain .userPassword{
    width: 100%;
    height: 79px;
    padding-top: 12px;
    position: relative;
  }
  #logoIn .regMain .userPassword{ padding-top: 0;}
  #logoIn .regMain .userName .username,#logoIn .regMain .userPassword .userpassword{
    /*font-family: Regular;*/
    padding-left: 42px;
    background: none;
    border: none;
    width: 100%;
    height: 79px;
    box-sizing: border-box;
    outline: none;
    font-size: 24px;
    color: #0cf3ff;
  }
  #logoIn .regMain .userName .username:focus{ border: none;}
  #logoIn .regMain .userName i,#logoIn .regMain .userPassword i{
    position: absolute;
    right: 50px;
    top: 38px;
    display: inline-block;
    width: 30px;
    height: 30px;
  }
  #logoIn .regMain .userPassword i{ top: 25px;}
  #logoIn .regMain .userName i{
    width: 30px;
    height: 30px;
    background: url("../../images/name.png") no-repeat;
    background-size: 100%;
  }
  #logoIn .regMain .userPassword i{
    width: 30px;
    height: 30px;
    background: url("../../images/password.png") no-repeat;
    background-size: 100%;
  }
  #logoIn .btn{
    margin-top: 46px;
    display: inline-block;
    width: 380px;
    height: 60px;
    text-align: center;
    background: #3cc8e7;
    color: #fff;
    font-family: "Microsoft YaHei";
    font-size: 28px;
    border: none;
    border-radius: 10px;
    cursor: pointer;}

</style>
