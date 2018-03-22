// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.css'
//import axios from 'axios';
import Vue from 'vue'
import App from './App'
import Ajax from './Mixin/ajax'
import initGenetella from './Mixin/InitGenetella'
// import SystemSettings from './Mixin/SystemSettings'
// import Utils from './Mixin/Utils'
import router from './router'
//import 'jquery'
import com from '../static/common'
import '../static/jetter'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'bootstrap/dist/js/bootstrap'
Vue.prototype.$echarts = echarts;
//Vue.prototype.$ajax = axios;
Vue.prototype.$com = com;
// Vue.config.productionTip = false;
Vue.config.devtools = false;//配置是否允许vue-devtools检查代码，方便调试，默认是ture，生产环境下是false
Vue.config.productionTip = false;//阻止vue启动时生成生产消息
/* eslint-disable no-new */
Vue.use(ElementUI);
// Vue.use(echarts);
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mixins: [ Ajax, initGenetella ]
});
