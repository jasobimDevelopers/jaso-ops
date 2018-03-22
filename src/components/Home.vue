<template>
  <div id="wrapper">
    <!--头部-->
    <div class="head">
      <div id="tit"><img src="../../images/headlogo.png"></div>
      <div class="titRight pull-right">
        <a href="#" style="position:relative; display: inline-block; text-align: center;"><span class="badge">2</span><img src="../../images/wraning.png" alt=""/></a>
        <a href="#"><span class="userP"><img src="../../images/userpic.png" alt=""/></span>{{message}}</a>
        <a href="#" style="border: none; margin-right: 20px;"><span>退出</span></a>
      </div>
    </div>
    <!--导航-->
<div class="left_col clearfix">
  <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
    <div class="menu_section">
      <ul class="nav side-menu" id="menu">
        <li v-for="(item, index) in menuItems" :class="{'active':index==0}">
          <a @click='itemClicked(item, $event,index)' :href='menuUrl(item)'>
            <i v-bind:class="[ item.class ]"></i> <span class="tit">{{ item.title }}</span>
          </a>
          <ul class="nav child_menu" v-if="item.childs && item.childs.length > 0">
            <!--v-for遍历有一个序号参数index ；单击绑定函数传参 index   类名绑定 当act的值等于当前index时增加类名active； -->
            <li v-for="(child,index) in item.childs" v-on:click="addclassfun(index,child.view)" v-bind:class="{activ:index==act}">
              <router-link :to="child.view">{{ child.title }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</div>
    <!--右边内容-->
    <div class="right_col clearfix">
      <!--<div class="">-->
      <div class="main_con">
        <div class="row">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
      name:'home',
    data () {
          return{
            title: "首页",
            lastView:'',
            message:"Charles Lin",
            "act":"false",

              "groupName": "南京运维平台后台管理",

              "menuItems": [
                {
                  "class": "icon01",
                  "title": "虚拟巡检",
                  "name": "xunjian",
                   "view": "/XunJian/XunJianCon",
                },

                {
                  "class": "icon05",
                  "title": "能耗管理",
                  "childs": [
                    { "view": "/EnergyManage/EnergyStatistics", "title": "能源概览" },
                    { "view": "/EnergyManage/EnergySaving", "title": "能耗详情" },
                    { "view": "/EnergyManage/EnergyFenXi", "title": "数据报表" }
                  ]
                },
                {
                  "class": "icon02",
                  "title": "设施管理",
                  "childs": [
                    { "view": "/FacilityManage/MaintenanceManage", "title": "维护管理" },
                    { "view": "/FacilityManage/weixiuManage", "title": "维修管理" },
                    { "view": "/FacilityManage/RepairPlan", "title": "抢修预案" }
                  ]
                },
                {
                  "class": "icon03",
                  "title": "安全管理",
                  "childs": [
                    { "view": "/SafetyManage/Video", "title": "视频监控" },
                    { "view": "/SafetyManage/FireManage", "title": "消防管理" },
                    { "view": "/SafetyManage/ElectronicPatrol", "title": "电子巡更" }
                  ]
                },
                {
                  "class": "icon04",
                  "title": "BA管理",
                  "childs": [
                    { "view": "/BA/AirConditioner", "title": "空调管理" },
                    { "view": "/BA/SendAir", "title": "送排风管理" },
                    { "view": "/BA/SendWater", "title": "给排水管理" },
                    { "view": "/BA/Light", "title": "智能照明管理" },
                    { "view": "/BA/ActiveManage", "title": "动力系统管理" },
                    { "view": "/BA/Electric", "title": "输变电管理" },
                    { "view": "/BA/Elevator", "title": "电梯管理" }
                  ]
                },

                {
                  "class": "icon06",
                  "title": "资料管理",
                  "childs": [
                    { "view": "/Admin/DesignData", "title": "设计资料" },
                    { "view": "/Admin/ShiGongDesign", "title": "施工资料" },
                    { "view": "/Admin/OperationData", "title": "运维资料" }
                  ]
                },
                {
                  "class": "icon07",
                  "title": "系统管理",
                  "childs": [
                    { "view": "/System/UserManage", "title": "用户管理" },
                    { "view": "/System/AuthorManage", "title": "权限管理" },
                    { "view": "/System/DailyLog", "title": "工作日志" }
                  ]
                },
                {
                  "class": "icon08",
                  "title": "服务中心",
                  "childs": [
                    { "view": "/ServeManage/Duty", "title": "任务分配" },
                    { "view": "/ServeManage/WorkOrder", "title": "工单编制" },
                    { "view": "/ServeManage/Calendar", "title": "日历表" },
                    { "view": "/ServeManage/Satisfaction", "title": "满意度调查" }
                  ]
                }
          ]
          }

    },
    mounted(){
      this.lastView=location.pathname;
    },
    created () {
      this.loadUserInfo();
      this.$router.afterEach(route => {
        this.title = route.meta
      });
      this.$router.beforeEach((to, from, next) => {
        // 阻止点击导航菜单分组时跳转页面
        if(to.path !== '/') {
          next()
        }
      })
    },
    methods: {
      loadUserInfo () {},
      toggleMenu () {
        var $BODY = $('body');
        var $SIDEBAR_MENU = $('#sidebar-menu');
        if ($BODY.hasClass('nav-md')) {
          $SIDEBAR_MENU.find('li.active ul').hide();
          $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
        } else {
          $SIDEBAR_MENU.find('li.active-sm ul').show();
          $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        }
        $BODY.toggleClass('nav-md nav-sm');
        this.$root.setContentHeight();
      },
      addclassfun:function(index,view) {
        //alert(index)n不能从0开始  刷新单击第一个没效果
        this.act = index;//点击时 act值等于当前index
        if(this.lastView=='/SafetyManage/Video'){
          J.jump(view);
        }
        this.lastView=location.pathname;
      },
      menuUrl(menu) {
        if (menu.view) {
          return "" + menu.view
        } else {
          return "#"
        }
      },
      itemClicked(view, source,index) {    //视图   来源   当前页面
        this.toggleMenu(event.target,index);
  /* this.toggleMenu(view.target,index);*/
        this.act="false";
      },
      toggleMenu(link,index) {
        var $li = $('#menu>li').eq(index);
        var $BODY = $('body');
        var $SIDEBAR_MENU = $('#sidebar-menu');
        var $VM = this;
        if ($li.is('.active')) {
          $li.children('ul>li').addClass('active');
          $li.removeClass('active active-sm');
          $('ul:first', $li).slideUp(function () {
            $VM.$root.setContentHeight()
          });
        } else {
          // 点击子菜单关闭其他菜单
          if (!$li.parent().is('.child_menu')) {
            $SIDEBAR_MENU.find('li').removeClass('active active-sm');
            $SIDEBAR_MENU.find('li ul').slideUp()
          } else {
            if ($BODY.is(".nav-sm")) {
              $SIDEBAR_MENU.find("li").removeClass("active active-sm");
              $SIDEBAR_MENU.find("li ul").slideUp()
            }
          }
          $li.addClass('active');
          $('ul:first', $li).slideDown(function () {
            $VM.$root.setContentHeight()
          })
        }
      },
    }
  }
</script>

<style>
  *{
    padding: 0;
    margin: 0;
    font-size: 14px;
  }
  .menu_section ul{
    width: 200px;
    height: auto;
  }
  h2{
    background: green;
    border: 1px solid #fff;
    color: #fff;
    height: 30px;
    line-height: 30px;
    text-indent: 24px;
  }

</style>

