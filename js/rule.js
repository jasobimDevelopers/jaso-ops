/**
 * Created by ljzhang on 2017/11/22.
 */
/*
 2017-11-08 @ Lee
 说明:集运一号微信端-项目公共基础函数库
 */
var token=getCookie('token');

//读取cookie

//去除字符串两边的空格的函数
function Trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "")
}

//检测字符串长度是否符合要求
String.prototype.checkLen = function (minLen,maxLen) {
  if (this.length<=maxLen && this.length>=minLen){
    return true;
  }else {
    return false;
  }
}

//****匹配大小写英文、数字、下划线
String.prototype.isRealAccount =function () {
  return /\W/.test(this)?false:true;
}

//****密码必须包含：大小写字母、数字、以及特殊符号
String.prototype.isReal =function () {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(this);
}

//***校验手机号码：必须以数字开头，除数字外，可含有“-”
String.prototype.isMobile = function () {
  return /^1[34578]\d{9}$/.test(this);
}

//解析日期
function  getDate(str) {
  var date = new Date(parseInt(str.slice(6)));
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes();/*+ seperator2 + date.getSeconds()*/
  return currentdate;
}

//手机号验证
function  checkTel(str) {
  var str = Trim(str);
  var res = new Array();
  if (!str){
    res['result'] = 0;
    res['msg'] = '对不起，手机号码不能为空';
    return res;
  }
  if (!str.isMobile()){
    res['result'] = 0;
    res['msg']='对不起，请输入正确格式的手机号';
    return res;
  }
  res['result'] = 1;
  res['msg'] = 'success';
  return res;
}

//邮箱验证
function checkMail(str) {
  var str = Trim(str);
  var res = new Array();
  if ( !str){
    res['result'] = 0;
    res['msg'] = '对不起，邮箱账号不能为空';
    return res;

  }
  if (!str.isMail()){
    res['result'] = 0;
    res['msg'] = '对不起，请输入正确格式的邮箱账号';
    return res;
  }
  res['result'] = 1;
  res['msg'] = 'success';
  return res;
}
//校验邮箱地址
String.prototype.isMail= function () {
  return /^(?:[\w-]+\.?)*[\w-]+@(?:[\w-]+\.)+[\w]{2,3}$/.test(this);
}

//密码验证
function checkPwd(str) {
  var str = Trim(str);
  var res = new Array();
  if(!str.checkLen(6,20)){
    res['result'] = 0;
    res['msg'] = '对不起，密码长度必须在6-20位之间';
    return res;
  }
  if (!str.isReal()){
    res['result'] = 0;
    res['msg'] = '密码须包含：大小写字母、数字、以及特殊符号';
    return res;
  }
  res['result'] = 1;
  res['msg'] = 'success';
  return res;
}

//页面跳转
function load(time,url){
  setTimeout(function(){
    window.location.href=url;
  },time);
}

//设置缓存
function setCookie(name,value,time) {
  var strsec = getsec(time);
  var exp = new Date();
  exp.setTime(exp.getTime() + strsec*1);
  document.cookie = name + "=" + encodeURIComponent(value) + ((time==null) ? "" : ";expires="+exp.toGMTString())+";path=/";
}
//*****缓存时间转换 s:秒 h:小时 d:
function getsec(str) {
  var str1=str.substring(1,str.length)*1;
  var str2=str.substring(0,1);
  if (str2 == 's'){
    return str1*1000;
  }else if (str2 == 'h'){
    return str1*60*60*1000;
  }else if(str2 == 'd'){
    return str1*24*60*60*1000;
  }
}

//读取cookie
function getCookie(c_name) {
  if(document.cookie.length>0){
    c_Start = document.cookie.indexOf(c_name + "=");
    if(c_Start !=-1){
      c_Start = c_Start + c_name.length + 1;
      c_end = document.cookie.indexOf(";",c_Start);
      if (c_end == -1) c_end = document.cookie.length;
      return decodeURIComponent(document.cookie.substring(c_Start,c_end));
    }
  }
  return "";
}
//删除cookie
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if(cval != null){
    document.cookie = name + "="+cval+";expires="+exp.toGMTString();
  }
}
//获取url里面的参数
function get_url_data(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}
//获取参数数组
function GetRequest() {
  var url  = location.search;//获取url中 ？ 后的字符串
  var theRequest = new Array();
  if (url.indexOf("?") != -1){
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0;i<strs.length;i++){
      theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
