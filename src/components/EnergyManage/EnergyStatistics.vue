<template>
  <div id="charts01">
    <!--头部-->
    <div class="top">
      <div id="mainFirst" :style="{width:'32%', height:'416px',marginRight:'1%'}">
        <div class="mainFirstCon">
          <div class="title">建筑信息</div>
          <div class="louName">南京研发楼A楼</div>
          <!--时间选择-->
      <!--    <template>
            <div class="block">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </template>-->
          <div class="address"><i></i>江苏省南京市栖霞区</div>
          <div class="size"><i></i>建筑面积4255平方米</div>
          <div class="c-bottom">
            <ul>
              <li><img src="../../../images/circle01.png" alt="">
                <p class="p_name">主变台数</p>
                <p class="p_num">1台</p>
              </li>
              <li><img src="../../../images/circle02.png" alt="">
                <p class="p_name">装机容量</p>
                <p class="p_con">150KVA</p>
              </li>
              <li><img src="../../../images/circle03.png" alt="">
                <p class="p_name">运行容量</p>
                <p class="p_con">150KVA</p>
              </li>
              <li><img src="../../../images/circle04.png" alt="">
                <p class="p_name">计量点数</p>
                <p class="p_num">220个</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="chart0" :style="{width:'32%', height:'416px',marginRight:'1%'}"></div>
      <div class="chose01">
        <el-select v-model="chart0.mutilBuildings" multiple collapse-tags @change="changeChart0" placeholder="请选择">
          <el-option v-for="item in chart0.options" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <select id="select01" @change="changeChart0()">
          <option value="electric">用电量</option>
          <option value="water">用水量</option>
        </select>
      </div>

      <div id="chart1" :style="{width:'32%', height:'416px',}"></div>
      <div class="chose02" >
          <select id="select02" @change="change02()">
            <option value="electric">用电量</option>
            <option value="water">用水量</option>
          </select>
      </div>
    </div>


    <!--底部-->
    <div class="bottom">
      <div id="chart2" :style="{width:'32%', height:'524px',marginRight:'1%'}"></div>
      <div class="chose">
        <select id="select" v-model="dateType" @change="change001()">
          <option value="year">年</option>
          <option value="month">月</option>
          <option value="day">日</option>
        </select>
        <select id="select001" v-model="xType" @change="change001()">
          <option value="loudong">按楼栋</option>
          <option value="zhuanye">按专业</option>
        </select>
        <select  @change="changeDateOption()">
          <option v-for="item in dateOptions[dateType]" v-bind:value="item">{{item}}</option>
        </select>
      </div>
      <div id="chart3" :style="{width:'32%', height:'524px',marginRight:'1%'}"></div>
      <div class="chose03">
        <select id="select03" @change="change03()">
          <option value="power">动力</option>
          <option value="special">特殊</option>
          <option value="konEnergy">暖通空调</option>
          <option value="light">照明插座</option>
        </select>

      </div>
      <div id="chart4" :style="{width:'32%', height:'524px'}"></div>
      <div class="chose04">
        <select id="select04" @change="change04()">
          <option value="electric">用电量</option>
          <option value="water">用水量</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
  //L/m2/a m³/m²/a
  // kWh/m²/a
  import echarts from "echarts";
  //1`12栋楼今日逐时

  //1`12栋楼单位面积能耗
  var data02 = {
    "electric": {
      "shiji":[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      "canzhao":[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    "water": {
      "shiji": [175.6, 182.2,2.6, 5.9, 9.0, 26.4, 28.7, 70.7,  48.7, 18.8, 6.0, 2.3],
      "canzhao": [32.6, 2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 20.0, 6.4, 3.3],
    }
  };
  //总能耗占比
  var data001={
    "loudong":{
        "year":[
            {value:260, name:'1#楼'},
            {value:410, name:'2#楼'},
            {value:294, name:'3#楼'},
            {value:134, name:'4#楼'},
            {value:334, name:'5#楼'},
            {value:534, name:'6#楼'},
            {value:234, name:'7#楼'},
            {value:434, name:'8#楼'},
            {value:600, name:'9#楼'},
            {value:432, name:'10#楼'},
            {value:232, name:'11#楼'},
            {value:132, name:'12#楼'}
        ],
      "month":[
          {value:160, name:'1#楼'},
          {value:110, name:'2#楼'},
          {value:124, name:'3#楼'},
          {value:164, name:'4#楼'},
          {value:234, name:'5#楼'},
          {value:234, name:'6#楼'},
          {value:134, name:'7#楼'},
          {value:134, name:'8#楼'},
          {value:100, name:'9#楼'},
          {value:132, name:'10#楼'},
          {value:182, name:'11#楼'},
          {value:160, name:'12#楼'}
    ],
      "day":[
          {value:30, name:'1#楼'},
          {value:50, name:'2#楼'},
          {value:94, name:'3#楼'},
          {value:34, name:'4#楼'},
          {value:34, name:'5#楼'},
          {value:54, name:'6#楼'},
          {value:24, name:'7#楼'},
          {value:44, name:'8#楼'},
          {value:20, name:'9#楼'},
          {value:22, name:'10#楼'},
          {value:32, name:'11#楼'},
          {value:42, name:'12#楼'}
          ]
   },
    "zhuanye":{
      "year":[
            {value:335, name:'动力'},
            {value:310, name:'特殊'},
            {value:234, name:'暖通空调'},
            {value:234, name:'照明插座'}
            ],
      "month":[
            {value:260, name:'动力'},
            {value:410, name:'特殊'},
            {value:294, name:'暖通空调'},
            {value:134, name:'照明插座'}
            ],
      "day":[
            {value:305, name:'动力'},
            {value:210, name:'特殊'},
            {value:434, name:'暖通空调'},
            {value:284, name:'照明插座'}
      ],
    },
  };
  //近30天趋势
  var data04={
    "electric": [270, 300, 550, 500, 400, 500, 600, 800, 700, 600, 400],
    "water": [600,380, 580, 300, 500, 790, 580, 290, 500, 600, 200]
  };
  //总能耗同比环比
  var datath={
      "power":{
        "yearBefore":[340,360,350,320,370,420,300,364,368,378,360,430],
        "yearAfter":[300,320,360,340,350,300,355,364,408,350,360,330],
        },
      "special":{
        "yearBefore":[300,344,400,320,420,380,405,364,408,418,360,330],
        "yearAfter":[359,300,360,420,380,320,305,364,368,378,330,430],
      },
      "konEnergy":{
        "yearBefore":[390,400,430,420,450,420,505,464,368,478,360,430],
        "yearAfter":[405,464,468,390,350,360,420,380,320,378,460,430],
      },
      "light":{
        "yearBefore":[380,350,280,290,280,320,285,364,348,378,360,330],
        "yearAfter":[420,300,260,400,330,300,360,420,280,320,305,364],
      },
  };
  export default{
    data() {
      return {
        chart0:{
          chart:null,
          options:[1,2,3,4,5,6,7,8,9,10,11,12],
          mutilBuildings:[],
          data:{
            electric:this.geneDoubleArray(12,23,400,800),
            water:this.geneDoubleArray(12,23,400,800)
          }
        },
        options: [1,2,3,4,5,6,7,8,9,10,11,12],
        mutilBuildings: [],
        value1: '',
        value6:'',
        select:[],
        myChartS:null,
        dateType:'year',
        xType:'loudong',
        dateOptions:{}
      };
    },
    mounted (){
      var d=new Date();
      this.dateOptions={
        year:this.geneArray(-1,d.getFullYear()-5,d.getFullYear()),
        month:this.geneArray(-1,1,d.getMonth()+1),
        day:this.geneArray(-1,1,d.getDate()),
      };
      this.myChartS = echarts.init(document.getElementById('chart0'));
      this.chart0.mutilBuildings.push(1);
      this.initAllChartData();
    },
    methods: {
      initAllChartData(){
        this.changeChart0();
        this.change02();
        this.change03();
        this.change04();
        this.change001()

      },
      geneDoubleArray(l1,l2,min,max){
        var a=[];
        for(var i=0;i<l1;i++){
          a.push(this.geneArray(l2,min,max));
        }
        return a;
      },
      changeDateOption(){
        if(this.xType=='loudong'){
          data001['loudong'][this.dateType]=[
              {value:J.random(100,400), name:'1#楼'},
              {value:J.random(100,400), name:'2#楼'},
              {value:J.random(100,400), name:'3#楼'},
              {value:J.random(100,400), name:'4#楼'},
              {value:J.random(100,400), name:'5#楼'},
              {value:J.random(100,400), name:'6#楼'},
              {value:J.random(100,400), name:'7#楼'},
              {value:J.random(100,400), name:'8#楼'},
              {value:J.random(100,400), name:'9#楼'},
              {value:J.random(100,400), name:'10#楼'},
              {value:J.random(100,400), name:'11#楼'},
              {value:J.random(100,400), name:'12#楼'}
            ];
        }else{
          data001['zhuanye'][this.dateType]=[
            {value:J.random(100,400), name:'动力'},
            {value:J.random(100,400), name:'特殊'},
            {value:J.random(100,400), name:'暖通空调'},
            {value:J.random(100,400), name:'照明插座'}
          ];
        }
        this.change001();
      },
      //
      geneArray(length,min,max){
        var arr=[];
        if(length==-1){
          for(var i=min;i<=max;i++){
            arr.push(i);
          }
        }else{
          for(var i=0;i<length;i++){
            arr.push(J.random(min,max));
          }
        }
        return arr;
      },
      //1`12栋楼今日逐时
      geneChart0Data(d){
          var name=d.name;
          var series=[];
          var self=this;
          d.data.forEach(function (item,i) {
            if(self.chart0.mutilBuildings.indexOf(i+1)!=-1) {
              series.push({
                name: (i + 1) + '#楼' + name,
                type: 'line',
                smooth: false,
                data: item
              });
            }
          });
          return series;
      },
      changeChart0(){
        var self=this;
        var val01='';
        var unit ='';
        var selectValue = $("#select01").val();
        var arr;
        if(selectValue=='electric'){
          val01 = {data:self.chart0.data.electric,name:'用电量'};
          unit='kWh/m²/a';
        }else {
          val01 = {data:self.chart0.data.water,name:'用水量'};
          unit='m³/m²/a';
        }
        this.myChartS.clear();
          this.myChartS.setOption({
            title: {
              text: '1~12号楼今日逐时',
              left:'30px',
              top:'15px',
              textStyle: {
                color: '#fff',
                fontWeight:'normal',
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            grid: {
              left: '3%',
              right: '6%',
              bottom: '2%',
              top:'35%',
              containLabel: true
            },
            xAxis: {
              name:'h',
              nameTextStyle:{
                color:'#fff',
              },
              type: 'category',
              boundaryGap: false,
              data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19','20','21','22','23'],
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            yAxis: {
              name:unit,
              nameTextStyle:{
                color:'#fff',
              },
              type: 'value',
              axisLabel: {
                formatter: '{value}',
                show: true,
                textStyle: {
                  color: '#fff'
                }
              },
              axisPointer: {
                snap: true
              }
            },
            series: self.geneChart0Data(val01)
          });
      },
      //1`12栋楼单位面积能耗
      change02(){
        var self=this;
        var val02='';
        var val03='';
        var unit =''
        var selectValue = $("#select02").val();
        if(selectValue=='electric'){
          val02 = {data:data02.electric.shiji,name:'实际量'}
          val03 = {data:data02.electric.canzhao,name:'参照量'}
          unit ='kWh/m²/a'
        }else {
          val02 = {data:data02.water.shiji,name:'实际量'}
          val03 = {data:data02.water.canzhao,name:'参照量'}
          unit='m³/m²/a'
        }
        var myChartS01 = echarts.init(document.getElementById('chart1'));
        myChartS01.setOption({
          title : {
            text: '1~12号楼单位面积能耗',
            left:'30px',
            top:'15px',
            textStyle: {
              color: '#fff',
              fontWeight:'normal'
            }
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['实际量','参照量'],
            top:'24%',
            textStyle: {
              color: '#fff',

            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '2%',
            top:'35%',
            containLabel: true
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              data : ['1#楼','2#楼','3#楼','4#楼','5#楼','6#楼','7#楼','8#楼','9#楼','10#楼','11#楼','12#楼'],
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            },
          ],
          yAxis : {
            name:unit,
            nameTextStyle:{
              color:'#fff',
            },
              type : 'value',
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            }
          ,
          series : [
            {
              name:'实际量',
              type:'bar',
              data:val02.data,
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name: '平均值'}
                ]
              }
            },
            {
              name:'参照量',
              type:'bar',
              data:val03.data,
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            }
          ]
        });
      },
      //总能耗同比环比
      change03(){
          var self=this;
          var colors = ['#5793f3', '#d14a61', '#675bba'];
          var valBefore = '';
          var valAfter = '';
          var selectValue=$("#select03").val();
          if (selectValue=='power'){
            valBefore = { data:datath.power.yearBefore};
            valAfter = { data:datath.power.yearAfter};
          }else if(selectValue == 'special'){
            valBefore = { data:datath.special.yearBefore};
            valAfter = { data:datath.special.yearAfter};
          }else if (selectValue == 'konEnergy'){
            valBefore = { data:datath.konEnergy.yearBefore};
            valAfter = { data:datath.konEnergy.yearAfter};
          }else{
            valBefore = { data:datath.light.yearBefore};
            valAfter = { data:datath.light.yearAfter};
          }
        var myChartFourth = echarts.init(document.getElementById('chart3'));
        myChartFourth.setOption({
          color: colors,
          title : {
            text: '总能耗同比环比',//同比今年的某天与去年的某天 环比今天与昨天
            left:'30px',
            top:'15px',
            textStyle: {
              color: '#fff',
              fontWeight:'normal'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          /*legend: {
           data:['直接访问','搜索引擎']
           },*/
          legend: {
            data:['2015', '2016'],
            top:'27%',
            textStyle: {
              color: '#fff',
            }
          },
          grid: {
            top: '35%',
            bottom:'4%'
          },
         /* toolbox: {
            feature: {
              saveAsImage: {}
            }
          },*///保存为图片
          xAxis: {
            name:'月',
            nameTextStyle:{
              color:'#fff',
            },
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1]
              }
            },
            boundaryGap: false,
            data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
          },
          yAxis: {
            name:'kWh/m²/a',
            nameTextStyle:{
              color:'#fff',
            },
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          series: [

            {
              name:'2015',
              type:'line',
              data: valBefore.data
            },
            {
              name:'2016',
              type:'line',
              data: valAfter.data
            }
          ]
        });

      },
      //总能耗近30天趋势
      //近30天日期
      getPastNDays(n){
        var now = new Date();
        now.setDate(now.getDate() - n);
        var arr=[];
        for(var i=0;i<n;i+=3){
          now.setDate(now.getDate()+3);
          var m=now.getMonth()+1;
          var d=now.getDate();
          arr.push(((m<10)?'0'+m:m)+'-'+((d<10)?'0'+d:d));
        }
        return arr;
      },
      change04(){
          var self = this;
          var valV04 = '';
          var unit = '';
          var selectVal = $("#select04").val();
          if(selectVal == 'electric'){
              valV04 = {data:data04.electric,name:'用电量'};
              unit = 'kWh/m²/a'
          }else{
              valV04 = {data:data04.water,name:'用水量'};
              unit= 'm³/m²/a'
          }
        var myChartFourth01 = echarts.init(document.getElementById('chart4'));
        myChartFourth01.setOption({
          title: {
            text: '总能耗近30天趋势',
            left:'30px',
            top:'15px',
            textStyle: {
              color: '#fff',
              fontWeight:'normal'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
//          data:['动力','特殊','空调','照明插座'],
            top:'24%',
            textStyle: {
              color: '#fff',

            }
          },
          grid: {
            left: '3%',
            right: '6%',
            bottom: '3%',
            top:'35%',
            containLabel: true
          },
          xAxis: {
            name:'日',
            nameTextStyle:{
              color:'#fff',
            },
            type: 'category',
            boundaryGap: false,
//            data: ['11-28','12-1','12-4','12-7','12-10','12-13','12-15','12-18','12-21','12-24','12-27'],
            data: this.getPastNDays(30),
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          yAxis: {
            type: 'value',
            name:unit,
            nameTextStyle:{
                color:'#fff',
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          series:{
            type:"line",
            data:valV04.data,
          }

        })
      },
      //总能耗占比
      change001(){
        var self=this;
        var valV={};
        var selectVal01 = $("#select001").val();//楼栋专业
        var selectVal = $("#select").val();//年月日
        if(selectVal01 == 'loudong'){
          valV.legend=null;
          if(selectVal == 'year'){
            valV.data=data001.loudong.year
          }else if(selectVal == 'month'){
            valV.data=data001.loudong.month
          }else{
            valV.data=data001.loudong.day
          }
        }else {
          valV.legend={
            data: ['动力','特殊','暖通空调','照明插座'],
            top:'24%',
            textStyle: {
              color: '#fff'
            },
          };
          if(selectVal == 'year'){
            valV.data=data001.zhuanye.year
          }else if(selectVal == 'month'){
            valV.data=data001.zhuanye.month
          }else{
            valV.data=data001.zhuanye.day
          }
        };
        this.setChart001(valV);
      },
      //总能耗构成占比
      setChart001(opt){
        var myChartT = echarts.init(document.getElementById('chart2'));
        myChartT.setOption({
          title : {
            text: '总能耗构成占比',
            left:'30px',
            top:'15px',
            textStyle: {
              color: '#fff',
              fontWeight:'normal'
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: opt.legend,
          series : [
            {
              name: '来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:opt.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });

      }
    },
  }

</script>
<style>
  .el-select{
    float:left;top: 20px;
  }
  .el-tag{float:left;}
  #charts01{ background: #000;}
  #charts01 .bottom{margin-top: 28px; position: relative;}
  #charts01 .top{ position: relative; }
  /*#charts01 .bottom #chart2{position: relative;}*/
  #charts01 .bottom .chose{
    border-top: 1px solid #666;
    position: absolute;
    top: 50px;
    left: 1%;
    width: 30%;
    height: 100px;
    /*text-align: right;*/
    margin-right: 10px;
  }
  #charts01 .bottom .chose03{
     border-top: 1px solid #666;
     position: absolute;
     top: 50px;
     left: 34.3%;
     width: 30%;
     height: 100px;
     /*text-align: right;*/
     margin-right: 10px;
   }
  #charts01 .bottom .chose04{
    border-top: 1px solid #666;
    position: absolute;
    top: 50px;
    left: 67.5%;
    width: 30%;
    height: 100px;
    text-align: right;
    margin-right: 10px;
  }
  #charts01 .bottom .chose select,#charts01 .bottom .chose03 select,#charts01 .bottom .chose04 select{
    width: 100px;
    background: none;
    height: 40px;
    padding-left: 8px;
    border: 1px solid #666;
    margin-top: 20px;}
  #charts01 .bottom .chose select:nth-child(1){ }
  #charts01 .bottom .chose select:nth-child(2){ float: right;}
  #charts01 .bottom .chose03 select:nth-child(2){}
  #charts01 .bottom .chose04 select:nth-child(1){}
  #charts01 .top .chose01{ left: 34.2%;}
  #charts01 .top .chose02{ left: 67.5%;}
  #charts01 .top .chose01,#charts01 .top .chose02, #charts01 .bottom .chose03{
    border-top: 1px solid #666;
    position: absolute;
    top: 50px;
    /*left: 34.2%;*/
    width: 30%;
    height: 100px;
    text-align: right;
    margin-right: 10px;
  }
  #charts01 .top .chose01 select,#charts01 .top .chose02 select{
    width: 100px;
    background: none;
    height: 40px;
    padding-left: 8px;
    border: 1px solid #666;
    margin-top: 20px;
  }
  #charts01 .top .chose01 select option,#charts01 .top .chose02 select option{
    color: #000;
  }
  #charts01 .bottom .chose select option,#charts01 .bottom .chose03 select option,#charts01 .bottom .chose04 select option{  color: #000;  }
  #charts01 #mainFirst,#charts01 #chart0,#charts01 #chart1,#charts01 #chart2,#charts01 #chart3,#charts01 #chart4{ display: inline-block; border-radius: 10px; vertical-align: top; background: #1b1c21!important;}
  #charts01 #mainFirst .mainFirstCon{ width: 95%;  margin: 0 auto;}
  #charts01 #mainFirst .title{
   padding: 16px;
   color: #fff;
   font-size: 16px;
   border-bottom: 1px solid #666;
 }
  #charts01 #mainFirst .louName,#charts01 #mainFirst .block{ display: inline-block;}
  #charts01 #mainFirst .mainFirstCon .block{ margin-left: 140px;}
  #charts01 #mainFirst .louName{ margin-top: 30px; font-size: 18px; color: #3ece4b;}
  #charts01 #mainFirst .el-input__inner{ background: none; border-radius: 0; border: 1px solid #666; height: 34px; color: #fff;}
  #charts01 #mainFirst .el-input--prefix .el-input__inner{padding-left: 8px;}
  #charts01 #mainFirst .el-input__prefix{ right: 0; overflow: hidden; left: inherit}
  #charts01 #mainFirst .el-input__icon{ width: 35px; background: #666}
  #charts01 #mainFirst .address, #charts01 #mainFirst .size{ font-size: 14px; color: #fff;}
  #charts01 #mainFirst .address{  margin: 20px 0;}
  #charts01 #mainFirst .address i{ background: url("../../../images/size.png") no-repeat center; width: 14px; height: 18px; display: inline-block; margin-right: 6px;}
  #charts01 #mainFirst .size i{ background: url("../../../images/address.png") no-repeat center; width: 14px; height: 17px; display: inline-block; margin-right: 6px;}
  #charts01 #mainFirst .c-bottom{ margin-top: 40px;}
  #charts01 #mainFirst .c-bottom ul{ width: 100%;}
  #charts01 #mainFirst .c-bottom ul li{ float: left; margin-left: 50px;}
  #charts01 #mainFirst .c-bottom ul li p{width: 100%; text-align: center;}
  #charts01 #mainFirst .c-bottom ul li p:nth-child(2){font-size: 13px; margin: 16px 0;}
  #charts01 #mainFirst .c-bottom ul li p:nth-child(3){font-size: 18px;}
    /*下拉框样式修改*/
  .el-scrollbar__wrap{ background-color:#1b1c21 }
  .el-input--suffix .el-input__inner{ background: none; border-radius: 0; border: 1px solid #666;}
  .el-select-dropdown__item{ color: #fff;}
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{ color: #333;}
</style>

