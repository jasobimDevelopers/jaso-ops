import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import XunJianCon from '@/components/XunJian/XunJianCon'
//设施管理
import MaintenanceManage from '@/components/FacilityManage/MaintenanceManage'
import weixiuManage from '@/components/FacilityManage/weixiuManage'
import RepairPlan from '@/components/FacilityManage/RepairPlan'
//安全管理
import Video from '@/components/SafetyManage/Video'
import FireManage from '@/components/SafetyManage/FireManage'
import ElectronicPatrol from '@/components/SafetyManage/ElectronicPatrol'
// BA管理
import AirConditioner from '@/components/BAManage/AirConditioner'
import SendAir from '@/components/BAManage/SendAir'
import SendWater from '@/components/BAManage/SendWater'
import Light from '@/components/BAManage/Light'
import ActiveManage from '@/components/BAManage/ActiveManage'
import Electric from '@/components/BAManage/Electric'
import Elevator from '@/components/BAManage/Elevator'
//能耗管理
import EnergyStatistics from '@/components/EnergyManage/EnergyStatistics'
import EnergySaving from '@/components/EnergyManage/EnergySaving'
import EnergyFenXi from '@/components/EnergyManage/EnergyFenXi'
//资料管理
import DesignData from '@/components/Admin/DesignData'
import ShiGongDesign from '@/components/Admin/ShiGongDesign'
import OperationData from '@/components/Admin/OperationData'
//设计资料
import Drawing from '@/components/Admin/designDrawing'
import DesignBook from '@/components/Admin/designBook'
//施工资料
import ConstructionList from '@/components/Admin/ConstructionList'
import ConcealedAcceptance from '@/components/Admin/ConcealedAcceptance'
import ConstructionDrawings from '@/components/Admin/ConstructionDrawings'
//运维资料
import SpareParts from '@/components/Admin/SpareParts'
import UserGuide from '@/components/Admin/UserGuide'
import ContactInformation from '@/components/Admin/ContactInformation'
//运维资料
//系统管理
import UserManage from '@/components/System/UserManage'
import AuthorManage from '@/components/System/AuthorManage'
import DailyLog from '@/components/System/DailyLog'
//服务中心
import Duty from '@/components/ServeManage/Duty'
import WorkOrder from '@/components/ServeManage/WorkOrder'
import Calendar from '@/components/ServeManage/Calendar'
import Satisfaction from '@/components/ServeManage/Satisfaction'
import ElementUI from 'element-ui'
Vue.use(Router);
Vue.use(ElementUI);
require('../../css/custom.css');
require('../../css/shouye.css');
export default new Router({
  mode: 'history',
  base:'/',
  routes: [
  /*  {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },*/
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    /*{
      path: '/login',
      name: 'Login',
      component: Login
    },*/
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/XunJian/XunJianCon',
      children : [
        { path: "/XunJian/XunJianCon", name:'xunjian', component: XunJianCon,},
        // 能耗管理
        { path: "/EnergyManage/EnergyStatistics", component: EnergyStatistics, meta: "能源概览" },
        { path: "/EnergyManage/EnergySaving", component: EnergySaving, meta: "能耗详情" },
        { path: "/EnergyManage/EnergyFenXi", component: EnergyFenXi, meta: "数据报表" },
        //设施管理
        { path :"/FacilityManage/MaintenanceManage", component: MaintenanceManage,meta:"设施管理"},
        { path :"/FacilityManage/weixiuManage", component: weixiuManage,meta:"维修管理"},
        {path :"/FacilityManage/RepairPlan", component: RepairPlan,meta:"抢修预案"},
        //安全管理
        { path: "/SafetyManage/Video", component: Video, meta: "视频监控" },
        { path: "/SafetyManage/FireManage", component: FireManage, meta: "消防管理" },
        { path: "/SafetyManage/ElectronicPatrol", component: ElectronicPatrol, meta: "电子巡更" },
        // BA管理
        { path: "/BA/AirConditioner", component: AirConditioner, meta: "空调管理" },
        { path: "/BA/SendAir", component: SendAir, meta: "送排风管理" },
        { path: "/BA/SendWater", component: SendWater, meta: "给排水管理" },
        { path: "/BA/Light", component: Light, meta: "智能照明管理" },
        { path: "/BA/ActiveManage", component: ActiveManage, meta: "动力系统管理" },
        { path: "/BA/Electric", component: Electric, meta: "输变电管理" },
        { path: "/BA/Elevator", component: Elevator, meta: "电梯管理" },
        // 资料管理
        //
        { path: "/Admin/DesignData", component: DesignData, meta: "设计资料" , },
        ////设计资料
        { path:'/Admin/designDrawing', name:'drawing', component:Drawing,},
        { path:'/Admin/designBook', name:'designBook', component:DesignBook},
        //
        { path: "/Admin/ShiGongDesign", component: ShiGongDesign, meta: "施工资料" },
        ////施工资料
        { path: "/Admin/ConstructionList", component: ConstructionList},
        { path: "/Admin/ConcealedAcceptance", component: ConcealedAcceptance},
        { path: "/Admin/ConstructionDrawings", component: ConstructionDrawings},
        //
        { path: "/Admin/OperationData", component: OperationData, meta: "运维资料" },
        ////运维资料
        { path: "/Admin/SpareParts", component: SpareParts},
        { path: "/Admin/UserGuide", component: UserGuide},
        { path: "/Admin/ContactInformation", component: ContactInformation},

        // 系统管理
        { path: "/System/UserManage", component: UserManage, meta: "用户管理" },
        { path: "/System/AuthorManage",component: AuthorManage, meta: "权限管理" },
        { path: "/System/DailyLog", component: DailyLog, meta: "工作日志" },

        //服务中心
        { path: "/ServeManage/Duty", component: Duty, meta: "任务分配" },
        { path: "/ServeManage/WorkOrder", component: WorkOrder, meta: "工单编制" },
        { path: "/ServeManage/Calendar", component: Calendar, meta: "日历表" },
        { path: "/ServeManage/Satisfaction", component: Satisfaction, meta: "满意度调查" },

      ]
    },

   /*     { name: 'login', path: '/',component:require('./Components/Login.vue'),path:'/Login' },
    { path: "/Xunjian/xunJian", component: XunJianCon, meta: "虚拟巡检",},

    // 设施管理Home.vue
    { path: "/FacilityManage/MaintenanceManage", component: MaintenanceManage, meta: "维护管理" },
    { path: "/FacilityManage/weixiuManage", component: weixiuManage, meta: "维修管理" },
    { path: "/FacilityManage/RepairPlan", component: RepairPlan, meta: "抢修预案" },
    // 安全管理
    { path: "/SafetyManage/Video", component: Video, meta: "视频监控" },
    { path: "/SafetyManage/FireManage", component: FireManage, meta: "消防管理" },
    { path: "/SafetyManage/ElectronicPatrol", component: ElectronicPatrol, meta: "电子巡更" },
    // BA管理
    { path: "/BA/AirConditioner", component: AirConditioner, meta: "空调管理" },
    { path: "/BA/SendAir", component: SendAir, meta: "送排风管理" },
    { path: "/BA/SendWater", component: SendWater, meta: "给排水管理" },
    { path: "/BA/Light", component: Light, meta: "智能照明管理" },
    { path: "/BA/ActiveManage", component: ActiveManage, meta: "动力系统管理" },
    { path: "/BA/Electric", component: Electric, meta: "输变电管理" },
    { path: "/BA/Elevator", component: Elevator, meta: "电梯管理" },
    // 能耗管理
    { path: "/EnergyManage/EnergyStatistics", component: EnergyStatistics, meta: "能源概览" },
    { path: "/EnergyManage/EnergySaving", component: EnergySaving, meta: "节能考核" },
    { path: "/EnergyManage/EnergyFenXi", component: EnergyFenXi, meta: "用能分析" },

    // 资料管理
    { path: "/Admin/DesignData", component: DesignData, meta: "设计资料" },
    { path: "/Admin/ShiGongDesign", component: ShiGongDesign, meta: "施工资料" },
    { path: "/Admin/OperationData", component: OperationData, meta: "运维资料" },

    // 系统管理
    { path: "/System/UserManage", component: UserManage, meta: "用户管理" },
    { path: "/System/AuthorManage",component: AuthorManage, meta: "权限管理" },
    { path: "/System/DailyLog", component: DailyLog, meta: "工作日志" },

    //服务中心
    { path: "/ServeManage/Duty", component: Duty, meta: "任务分配" },
    { path: "/ServeManage/WorkOrder", component: WorkOrder, meta: "工单编制" },
    { path: "/ServeManage/Calendar", component: Calendar, meta: "日历表" },
    { path: "/ServeManage/Satisfaction", component: Satisfaction, meta: "满意度调查" },

*/
  ]
})
