import axios from 'axios';
var com={
  ajax:function (opt) {
    axios({
      method: opt.method||'post',
      url: (opt.base||'http://jasobim.com.cn:8080/iot/api')+opt.url,
      params: opt.params||{},
    }).then(function (response) {
      opt.success(response.data);
    }).catch(function (error) {
      if(opt.error){
        opt.error(error);
      }
      alert(error);
    });
  },
  valid:{
    email:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
    tel:[{required: true, message: '请输入手机号', trigger: 'blur'},
      { pattern:/^([1]\d{10})$/, message: '请输入正确手机号', trigger: 'blur,change'}],
    userName:[{ required: true, message: '请输入用户名', trigger: 'blur' },
      { message: '请输入正确的用户名', trigger: 'blur,change' }],
    password:[{ required: true, message: '请输入密码', trigger: 'blur' },
      { message: '请输入正确的密码', trigger: 'blur,change' }
    ]
  },
  validate:function(form,callback){
    // form.validate((valid) => {
      // if (valid) {
        // callback();
      // } else {
        // alert('数据格式有误！请按提示改正。');
        // return false;
      // }
    // });
     // }
  form.validate(function(valid){
      if (valid) {
        callback();
      } else {
        alert('数据格式有误！请按提示改正。');
        return false;
      }
    });
  },getIndex:function (arr,ele) {
    for(var i=0;i<arr.length;i++){
      if(arr[i]==ele) {
        return i;
      }
    }
  }
};
export default com;
