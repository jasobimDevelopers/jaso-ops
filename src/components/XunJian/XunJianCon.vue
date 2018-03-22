<template>
  <div id="xunjian">
      <div class="content">
            <div class="firstCon">
              <div class="search">
                <span @click="log">南京研发楼</span>
                <input class="Search-input pull-right hide" id="autocomplete" type="text" placeholder="搜索" autocomplete="off">
                <i class="searchIcon hide"><img src="../../../images/searicon.png" alt=""/></i>
              </div>
              <div class="menuConMain">
                <!-- 定义DOM元素，用于在该DOM元素f中显示模型或图纸 -->
                <div id="domId" style="width:100%; height:750px"></div>
              </div>
            </div>
          </div>

  </div>
</template>

<script>
//  import test from'../../../js/test'
  export default {
    name: 'xunjian',
    data(){
      return{
        viewer:null,
        viewToken:null,
        buildingData:{
          '3925':{
            id:1,
            pm:70,
            humidity:58,
            temp:20,
            area:2000,
            power:33,
            elec:301,
            elecs:[33, 18, 28, 12, 39, 18, 20, 24, 20, 35, 28, 26],
            camera:{"position":{"x":2031.9155829644494,"y":3802.753050964081,"z":2149.5938943776346},"target":{"x":8412.54048879893,"y":15778.177364020425,"z":-9262.249409635308},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '3928':{
            id:1,
            camera:{"position":{"x":2031.9155829644494,"y":3802.753050964081,"z":2149.5938943776346},"target":{"x":8412.54048879893,"y":15778.177364020425,"z":-9262.249409635308},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '3884':{
            id:2,
            camera:{"position":{"x":3389.4158477356495,"y":1779.8274381126669,"z":1963.9442960052227},"target":{"x":3290.9468113575604,"y":15155.565380084361,"z":-9673.635676616352},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '3883':{
            id:2,
            camera:{"position":{"x":3389.4158477356495,"y":1779.8274381126669,"z":1963.9442960052227},"target":{"x":3290.9468113575604,"y":15155.565380084361,"z":-9673.635676616352},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '7272':{
            id:3,
            camera:{"position":{"x":5763.088264405631,"y":3330.709896714545,"z":3113.0654878200658},"target":{"x":5806.972556286942,"y":15253.032618906074,"z":-10009.800980274129},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '6578':{
            id:4,
            camera:{"position":{"x":8145.9882475899285,"y":4731.029094481891,"z":1713.2550348488185},"target":{"x":8728.478031271134,"y":19109.50598539723,"z":-8644.034051196124},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '3920':{
            id:5,
            camera:{"position":{"x":8108.100907517861,"y":2339.479820818043,"z":1790.0543548759802},"target":{"x":8606.142719670379,"y":14633.407569402163,"z":-9282.372681854318},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '6398':{
            id:6,
            camera:{"position":{"x":9748.80761780179,"y":3524.0843658910876,"z":1843.2330785001425},"target":{"x":10222.911882044964,"y":16398.649487435,"z":-9750.490223994131},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '6428':{
            id:7,
            camera:{"position":{"x":11421.274346034254,"y":4806.919112470854,"z":1447.056686882199},"target":{"x":11863.275375866375,"y":18144.479886552534,"z":-7989.123396587051},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '6596':{
            id:8,
            camera:{"position":{"x":9749.09207571842,"y":6236.248042304136,"z":1320.3635496477846},"target":{"x":10191.093105586284,"y":19573.808816424276,"z":-8115.81653384728},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '6458':{
            id:9,
            camera:{"position":{"x":13020.070119329557,"y":6065.992732018094,"z":1565.6697654204233},"target":{"x":13417.827883057427,"y":19569.844921250897,"z":-7987.059582008663},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '6518':{
            id:10,
            camera:{"position":{"x":14646.164469269297,"y":7344.707388377674,"z":1563.3059838382594},"target":{"x":15243.216208059974,"y":20853.0653260135,"z":-7496.841978248469},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '6488':{
            id:11,
            camera:{"position":{"x":12974.41449214777,"y":8759.523709512938,"z":1441.770115013773},"target":{"x":13572.947112470392,"y":22301.38671067689,"z":-7640.849869261222},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
          '6548':{
            id:12,
            camera:{"position":{"x":11497.243987035165,"y":7568.2751090290185,"z":1276.1000398864135},"target":{"x":12095.776607357788,"y":21110.138110192966,"z":-7806.519944388583},"up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},"version":1}
          },
        }
      }
    },
    mounted(){
//      var baseUrl="http://jasobim.com.cn/iot/";
      var viewToken=null;
      var options = new BimfaceSDKLoaderConfig();
      var $this=this;
      options.configuration = "Debug";
      options.staticHost = "http://static.bimface.com";
      this.$com.ajax({
        method: "GET",
        base:'http://jasobim.com.cn/iot/api/bimface/',
        url:"getModelViewToken",
        params:{fileId:1236661085692096 },
        success: function(data){
          viewToken=data;
          //alert(viewToken);
          //viewToken="6356c8581ff744ca814f1cc89d108e88"
          options.viewToken = viewToken;
          BimfaceSDKLoader.load(options,$this.onSDKLoadSucceeded,$this.onSDKLoadFailed);
          //var getdatas=data;
        }
      });

    },
    methods:{
      onSDKLoadSucceeded(viewMetaData){
    // 初始化viewer
        var $this=this;
        var view = J.id('domId');
        var WebAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
        WebAppConfig.domElement = view;
        var appEvents = Glodon.Bimface.Application.WebApplication3DEvent;
        var app = new Glodon.Bimface.Application.WebApplication3D(WebAppConfig);
        $this.viewer = app.getViewer();
        app.addView(viewMetaData.viewToken);

        // 初始化DrawableContainer
        var drawableConfig = new Glodon.Bimface.Plugins.Drawable.DrawableContainerConfig();
        drawableConfig.viewer = $this.viewer;
        window.view=$this.viewer;
        var drawableContainer = new Glodon.Bimface.Plugins.Drawable.DrawableContainer(drawableConfig);
        app.addEventListener(appEvents.ViewAdded, function() {
//            myAdd
//          viewer3D.showComponents(["3115749", "3115695"]);
//          addEnd

          app.render();
          J.cls('bf-tree-toolbar').$css('display','none');
          //主视图
        /* 获取主视图（相机定位）
          1 view
          2 view.getCameraStatus()
          3 JSON.stringify(view.getCameraStatus())*/
          $this.viewer.setCameraStatus({
              "position":{"x":5394.0851818932915,"y":612.4004009486468,"z":339.27006625707565},
              "target":{"x":6598.082774755444,"y":25239.75159347191,"z":1128.6465131357606},
              "up":{"x":0,"y":-0.0000036732052144291623,"z":0.9999999999932538},
              "version":1
          });
        });
        app.addEventListener(appEvents.ComponentsSelectionChanged, function(objectData) {

          if(!objectData.worldPosition)return;
//        var id=objectData.objectId;
          //$this.viewer.zoomToSelectedComponents();
          drawableContainer._items=[]
          console.log(objectData.objectId);
          if(objectData.objectId in $this.buildingData){
            $this.viewer.setCameraStatus($this.buildingData[objectData.objectId].camera);
            $this.getFloorData(objectData.objectId,function(data){
              //当前楼层信息出现时隐藏其他楼层信息
              var config = new Glodon.Bimface.Plugins.Drawable.CustomItemConfig();
              // 创建自定义元素，可以是一个dom element，也可以是个字符串
              var circle=J.ct('div.data-tip').$html(`<div class="message">
              <div class="messageCon">
              <div class="title">`+data.id+`#楼 (类型：精品酒店)</div>
              <div class="itemlist">
                <ul>
                  <li>室内PM2.5 <h3>`+data.pm+`</h3></li>
                  <li>室内湿度 <h3>`+data.humidity+`</h3></li>
                  <li>室内温度 <h3>`+data.temperature+`</h3></li>
                  <li>建筑面积 <h3>`+data.buildingarea+`㎡</h3></li>
                  <li>建筑功率 <h3>`+data.power+`</h3></li>
                  <li>今日耗电量 <h3>`+data.powernow+`KWH</h3></li>
                </ul>
              </div>
              </div>
              </div>`);
              //创建ID为itemEcharts的盒子l
              var echart=J.ct('canvas#itemEcharts').$css({
                width:'300px',
                height:'160px'
              });
              circle.$append(echart);
              $this.initChart(echart,data.list);
              config.content = circle;
              config.viewer = $this.viewer;
              //增加一个Tip提示
              // config.tooltip = 'my tip';
              config.worldPosition = objectData.worldPosition;
              //生成customItem实例
              var customItem = new Glodon.Bimface.Plugins.Drawable.CustomItem(config);
              //自定义标签的鼠标左键事件
              customItem.onClick(function(item) {
                drawableContainer.removeItemById(item.id);
//              console.log(item.id);
              });
              // 添加自定义标签
              drawableContainer.addItem(customItem);
              //设置Tip的样式
              customItem.setTooltipStyle({border:'1px'});
            });
          }

        });

      },
      onSDKLoadFailed(error){
    },
      getFloorData(objId,call){
        var self=this;
        var id=this.buildingData[objId].id;
        this.$com.ajax({
          method: "GET",
          url:"/FloorController/getFloorList",
          params:{
            floor:id,
            token:J.cookie('token')
          },
          success: function(data){
            var d=data.data[0];
            d.id=id;
            var list=[];
            var length=d.energyList.length;
            for(var i=0;i<12;i++){
              list.push(d.energyList[J.random(0,length-1)]);
            }
            d.list=[];
            list.forEach(function (item) {
              d.list.push(item.energyvalue);
            });
            call(d);
          }
        });

      },
      log(){
        console.log(JSON.stringify(view.getCameraStatus()));
      },
      initChart(charts,elecs) {
      var myecharts = this.$echarts.init(charts);
      myecharts.setOption({
        color: ['#3398DB'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : ['2', '4', '6', '8', '10', '12', '14','16','18','20','22','24'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },


        ],
        series : [
          {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:elecs
          }
        ]
      })
    },
    }
  }
</script>

<style>
  .data-tip{
    width:300px;
    position:fixed;
    left:60%;
    top:40%;
    border-radius:3%;
    border:1px solid #fff;
    background-color:rgba(39,42,51,0.8);
    color:#000;
  }

  #xunjian .content{
    background: #1b1c21;
    border-radius: 10px;
  }
  #xunjian .firstCon{ width: 97%; margin: 0 auto;}
  #xunjian .firstCon .search{
    line-height: 50px;
    border-bottom: 1px solid #666;
    position: relative;}
  #xunjian .firstCon .search span{ color: #fff;}
  #xunjian .firstCon .search input{
    height: 30px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    color: #ccc;
    font-size: 16px;
    width: 200px;
    margin-top: 10px;
    padding-left: 8px;
    outline: none;
  }
  #xunjian .firstCon .search .searchIcon {
    position: absolute;
    right: 1%;
    top: 0;
  }
  #xunjian .menuConMain{ width:100%; height: 750px; border: 1px solid #999; overflow: hidden;}
  #xunjian .btn{ position: absolute; color: #333333; z-index: 999;}
  #xunjian  #domId{ position: relative;}
  #xunjian #domId .message{ }
  #xunjian #domId .message .messageCon{
    width: 90%;
    margin: 0 auto;
  }
  #xunjian #domId .message .messageCon .title{
    padding: 24px 0 20px 0;
    border-bottom: 1px solid #fff;
    font-size: 16px;
    color: #fff;
  }
  #xunjian #domId .message .messageCon .itemlist{}
  #xunjian #domId .message .messageCon .itemlist ul{ height: 220px; overflow: hidden}
  #xunjian #domId .message .messageCon .itemlist ul li{
    width: 40%;
    float: left;
    color: #fff;
    margin-top: 20px;
    font-size: 14px;
    margin-left: 20px;
  }
  #xunjian #domId .message .messageCon .itemlist ul li h3{
    font-size: 20px;
    color: #D9EA1c;
    margin-top: 12px;
  }
</style>

<style lang="css">
  .hide{display:none}
</style>
