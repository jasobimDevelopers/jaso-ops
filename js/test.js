import echarts from "echarts";
var viewer,viewToken;
// 指定待显示的模型或图纸（viewToken从服务端获取）
var baseUrl="http://jasobim.com.cn/iot/";
var options = new BimfaceSDKLoaderConfig();
options.configuration = "Debug";
options.staticHost = "http://static.bimface.com";
//BimfaceSDKLoader.load(options,onSDKLoadSucceeded,onSDKLoadFailed);
//添加显示信息
function onSDKLoadSucceeded(viewMetaData){
  // 初始化viewer
  var view = document.getElementById('domId');
  var WebAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
  WebAppConfig.domElement = view;
  var appEvents = Glodon.Bimface.Application.WebApplication3DEvent;


  var app = new Glodon.Bimface.Application.WebApplication3D(WebAppConfig);
  viewer = app.getViewer();
  app.addView(viewMetaData.viewToken);

  // 初始化DrawableContainer
  var drawableConfig = new Glodon.Bimface.Plugins.Drawable.DrawableContainerConfig();
  drawableConfig.viewer = viewer;
  var drawableContainer = new Glodon.Bimface.Plugins.Drawable.DrawableContainer(drawableConfig);
  app.addEventListener(appEvents.ViewAdded, function() {
    app.render();
  });
  app.addEventListener(appEvents.ComponentsSelectionChanged, function(objectData) {
    if(!objectData.worldPosition)return
    var config = new Glodon.Bimface.Plugins.Drawable.CustomItemConfig();

    // 创建自定义元素，可以是一个dom element，也可以是个字符串
    // ***************************************************
    var circle = document.createElement('div');
    circle.style.width = '300px';
    // circle.style.height = '32px';
    circle.style.borderRadius = '3%';
    circle.style.border = '1px solid #fff';
    circle.style.background = 'rgba(39,42,51,0.8)';
    circle.style.color = '#000';
    circle.innerHTML = '<div class="message">' +
        '<div class="messageCon">' +
      '<div class="title">1#楼 (类型：精品酒店)</div>' +
      '<div class="itemlist"><ul>' +
      '<li>室内PM2.5 <h3>32</h3></li><li>室内湿度 <h3>32</h3></li><li>建筑功率 <h3>6900</h3></li><li>今日耗电量 <h3>108KWH</h3></li>' +
      '</ul></div>' +
      '</div>'+
        // '<div id="itemEcharts" style="{width:280px; height:160px}"></div>'+
    '</div>';
    var echart = document.createElement("div");
    echart.setAttribute('id','itemEcharts');
    echart.style.width = '300px';
    echart.style.height = '160px';
  //var echart = document.getElementById("itemEcharts");
    circle.appendChild(echart);
    initChart(echart);
    config.content = circle;
    // ****************************************************

    config.viewer = viewer;
    //增加一个Tip提示
    // config.tooltip = 'my tip';
    config.worldPosition = objectData.worldPosition;

    //生成customItem实例
    var customItem = new Glodon.Bimface.Plugins.Drawable.CustomItem(config);

    //自定义标签的鼠标左键事件
    customItem.onClick(function(item) {
      drawableContainer.removeItemById(item.id);
      // console.log(item.id);
    });


    // 添加自定义标签
    drawableContainer.addItem(customItem);
    //设置Tip的样式
    customItem.setTooltipStyle({border:'1px'});
  });
};

function onSDKLoadFailed(error){

};
$(function(){
  $.ajax({
    type: "GET",
    url: baseUrl+"api/bimface/getModelViewToken?",

    data: {fileId:1199737096102080 },

    dataType: "json",

    success: function(data){

      viewToken=data.data;
      //alert(viewToken);
      //viewToken="6356c8581ff744ca814f1cc89d108e88"
      options.viewToken = viewToken;
      BimfaceSDKLoader.load(options,onSDKLoadSucceeded,onSDKLoadFailed);
      //var getdatas=data;
    }
  });
});
function initChart(charts) {
  var myecharts = echarts.init(charts);
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
      bottom: '1%',
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
        data:[10, 52, 10, 34, 39, 30, 20,10, 52, 10, 34, 39]
      }
    ]
  })
}


