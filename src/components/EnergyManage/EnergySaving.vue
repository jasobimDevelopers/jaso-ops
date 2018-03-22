<template>
  <div id="energyDetail">
    <div class="en_top">
      <select name="" id="floor" v-model="buildId" @change="changeBuilding">
        <option value="0">1#楼</option>
        <option value="1">2#楼</option>
        <option value="2">3#楼</option>
        <option value="3">4#楼</option>
        <option value="4">5#楼</option>
        <option value="5">6#楼</option>
        <option value="6">7#楼</option>
        <option value="7">8#楼</option>
        <option value="8">9#楼</option>
        <option value="9">10#楼</option>
        <option value="10">11#楼</option>
        <option value="11">12#楼</option>
      </select>
      <div class="en_top_right">
        <ul>
          <li>今日耗能：{{mainInfo.energy}}kWh</li>
          <li>实时功率：{{mainInfo.power}}kWh</li>
          <li>室内PM2.5：{{mainInfo.pm}}</li>
          <li>室内湿度：{{mainInfo.humality}}</li>
        </ul>
      </div>
    </div>
    <div class="en_bottom">
      <div class="en_bottom_top">
        <!--总用量-->
        <div class="chart_item">
          <div id="allUse" :style="{width:'390px', height:'416px',marginRight:'5px'}"></div>
          <div class="choseAllUse selected">
            <select id="select1" @change="changeChart0()" v-model="select.chart0.date">
              <option value="year">年</option>
              <option value="month">月</option>
              <option value="day">日</option>
            </select>
            <select id="select2" @change="changeChart0()" v-model="select.chart0.w_e">
              <option value="elec">用电量</option>
              <option value="water">用水量</option>
            </select>
          </div>
        </div>
        <!--今日逐时-->
        <div class="chart_item">
          <div id="hourly" :style="{width:'390px', height:'416px',marginRight:'5px'}"></div>
          <div class="choseHourly selected">
            <select id="select3" @change="changeChart1()" v-model="select.chart1.type">
              <option value="power">动力</option>
              <option value="special">特殊</option>
              <option value="air">暖通空调</option>
              <option value="light">照明插座</option>
            </select>
          </div>
        </div>
        <!--总能耗同比环比-->
        <div class="chart_item">
          <div id="totalEnergy" :style="{width:'390px', height:'416px',marginRight:'5px'}"></div>
          <div class="choseTotalEnergy selected">
            <select id="select5" @change="changeChart2()" v-model="select.chart2.type">
              <option value="power">动力</option>
              <option value="special">特殊</option>
              <option value="air">暖通空调</option>
              <option value="light">照明插座</option>
            </select>
          </div>
        </div>
        <!--近31天用能趋势-->
        <div class="chart_item">
          <div id="trend" :style="{width:'390px', height:'416px'}"></div>
          <div class="choseTrend selected">
            <select id="select6" @change="changeChart3()" v-model="select.chart3.floor">
              <option value="0">一层</option>
              <option value="1">二层</option>
              <option value="2">三层</option>
            </select>
            <select id="select7" @change="changeChart3()" v-model="select.chart3.w_e">
              <option value="elec">用电量</option>
              <option value="water">用水量</option>
            </select>
          </div>
        </div>
      </div>
      <!-------------------------------底部------------------------------->
      <div class="en_bottom_foot">
        <!--单位面积能耗-->
        <div class="chart_item">
          <div id="areaEnergy" :style="{width:'390px', height:'416px',marginRight:'0.5%'}"></div>
          <div class="choseAllUse selected">
            <select id="select01" @change="changeChart4()" v-model="select.chart4.date">
              <option value="year">年</option>
              <option value="month">月</option>
              <option value="day">日</option>
            </select>
            <select id="select02" @change="changeChart4()" v-model="select.chart4.w_e">
              <option value="elec">用电量</option>
              <option value="water">用水量</option>
            </select>
          </div>
        </div>
        <!--能耗构成占比-->
        <div class="chart_item">
          <div id="constituteRatio" :style="{width:'390px', height:'416px',marginRight:'0.5%'}"></div>
          <div class="choseHourly selected">
            <select id="select03"  @change="changeChart5(true)" v-model="select.chart5.date">
              <option value="year">年</option>
              <option value="month">月</option>
              <option value="day">日</option>
            </select>
            <select id="" @change="changeChart5()" v-model="select.chart5.d_value">
              <option v-for="item in dateOptions[select.chart5.date]" v-bind:value="item" >{{item}}</option>
            </select>
          </div>
        </div>
        <!--楼栋能耗近31天趋势-->
        <div class="chart_item">
          <div id="energyTrend" :style="{width:'390px', height:'416px',marginRight:'0.5%'}"></div>
          <div class="choseTotalEnergy selected">
            <select id="select05" @change="changeChart6()" v-model="select.chart6.w_e">
              <option value="elec">用电量</option>
              <option value="water">用水量</option>
            </select>
          </div>
        </div>
        <!--近31天区域用能占比-->
        <div class="chart_item">
          <div id="energyRatio" :style="{width:'390px', height:'416px'}"></div>
          <div class="choseTrend selected">
            <select id="select06" @change="changeChart7()" v-model="select.chart7.floor">
              <option value="0">一层</option>
              <option value="1">二层</option>
              <option value="2">三层</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
    export default {
      data(){
          return {
            buildId:0,
            allData:[],
            mainInfo:{},
            charts:{},
            select:{
              chart0:{date:'year',w_e:'elec'},//
              chart1:{type:'power'},
              chart2:{type:'power'},
              chart3:{w_e:'elec',floor:'0'},
              chart4:{date:'year',w_e:'elec'},//
              chart5:{date:'year',d_value:'2013'},//
              chart6:{w_e:'elec'},
              chart7:{floor:'0'}
            },
            typeName:{
              power:'动力',
              special:'特殊',
              air:'暖通空调',
              light:'照明插座'
            },
            dateOptions:{}
          }
      },
      mounted(){
        this.initAllData();
        this.initAllCharts();
        this.changeBuilding();
        this.resetAllCharts();
        this.initDateOptions();
        this.select.chart5.d_value=this.dateOptions.year[this.dateOptions.year.length-1];
        window.vue=this;
      },
      methods:{
        initDateOptions(){
          var d=new Date();
          this.dateOptions.year=this.geneArray(-1,d.getFullYear()-5,d.getFullYear());
          this.dateOptions.month=this.geneArray(-1,1,d.getMonth()+1);
          this.dateOptions.day=this.geneArray(-1,1,d.getDate());
        },
        changeBuilding(){
          this.mainInfo=this.allData[this.buildId].mainInfo;
          this.resetAllCharts();
        },
        initAllCharts(){
          var self=this;
          ['allUse','hourly','totalEnergy','trend','areaEnergy','constituteRatio','energyTrend','energyRatio'].forEach(function(item,i){
            self.charts['chart'+i]=self.$echarts.init(J.id(item));
          });
        },
        //当前日期往前推n天
        getPastNDays(n){
            var now = new Date();
          //alert(now.getDate())当天时间
          now.setDate(now.getDate() - n);
         // alert(now.setDate(now.getDate() - n)) ;
            var arr=[];
            for(var i=0;i<n;i+=1){
              now.setDate(now.getDate()+3);
              var m=now.getMonth()+1;
              var d=now.getDate();
              arr.push(((m<10)?'0'+m:m)+'-'+((d<10)?'0'+d:d));
            }
            return arr;
    },
        resetAllCharts(){
          for(var i=0;i<8;i++){
            eval('this.changeChart'+i+'()');
          }
        },
        //总能耗近30天趋势
        //近30天日期
        getPastNDays(n){
          var now = new Date();
          now.setDate(now.getDate() - n);
          var arr=[];
          for(var i=0;i<n;i++){
            now.setDate(now.getDate()+1);
            var m=now.getMonth()+1;
            var d=now.getDate();
            arr.push(((m<10)?'0'+m:m)+'-'+((d<10)?'0'+d:d));
          }
          return arr;
        },
        changeChart0() {//第一张图
          var name='chart0';
          var data=this.allData[this.buildId][name];
          var opt={
            xAxis:data[this.select[name].date].xAxis,
            data:data[this.select[name].date][this.select[name].w_e],
            unit:(this.select[name].w_e=='water')?'m³/m²/a':'kWh/m²/a',
            //Xunit:(this.select[name])
          };
          this.charts[name].setOption({
            title : {
              text: '总用量',
              left:'30px',
              top:'15px',
              textStyle: {
                color: '#fff',
                fontWeight:'normal'
              }
            },
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '8%',
              right: '8%',
              top: '35%',
              bottom: '2%',
              containLabel: true
            },
            xAxis : [
              {
                name:this.getXUnit(this.select[name].date),
                type : 'category',
                nameLocation:'end',
                nameTextStyle:{
                  color:'#fff',
                },
                data : opt.xAxis,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                },
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis :
              {
                name:opt.unit,
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
              },
            series : [
              {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:opt.data,
              }
            ]
          });
        },
        changeChart1() {
          var name='chart1';
          var data = this.allData[this.buildId][name];
          var opt={
            name:parseInt(this.buildId)+1,
            data:data[this.select[name].type],
          };
          this.charts[name].setOption({
            title: {
              text: opt.name+'号楼今日逐时',
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
              left: '8%',
              right: '8%',
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
              data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            yAxis: {
              name:'kWh/m²/a',
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
            series: [
              {
                name:'用电量',
                type:'line',
                smooth: false,
                data: opt.data,
              },
            ]
          });
        },
        changeChart2() {
          var colors = ['#5793f3', '#d14a61', '#675bba'];
          var name='chart2';
          var data = this.allData[this.buildId][name];
          var opt = {
            data: data[this.select[name].type],
            unit:(this.select[name].w_e=='water')?'m³/m²/a':'kWh/m²/a'
          }
          this.charts[name].setOption({
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
            legend: {
              data:['2015', '2016'],
              top:'28%',
              textStyle: {
                color: '#fff',

              }
            },
            /*legend: {
              data:['直接访问','搜索引擎']
            },*/
            grid: {
              left:'10%',
              right:'8%',
              bottom:'6%',
              top: '40%',
            },
            xAxis: {
              name:'月',
              nameTextStyle:{
                color:'#fff',
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              },
              type: 'category',
              boundaryGap: false,
              data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
            },
            yAxis: {
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              },
              name:opt.unit,
              nameTextStyle:{
                color:'#fff',
              },
              type: 'value'
            },
            series: [

              {
                name:'2015',
                type:'line',
                data: opt.data[0]
              },
              {
                name:'2016',
                type:'line',
                data: opt.data[1]
              }
            ]
          });
        },
        changeChart3() {
          var name='chart3';
          var data = this.allData[this.buildId][name];
          var opt={
            xAxis: this.geneArray(-1,1,31),
            data:data[this.select[name].floor][this.select[name].w_e],
            unit:(this.select[name].w_e=='water')?'m³/m²/a':'kWh/m²/a'
          };
          this.charts[name].setOption({
            visualMap: [{
              show: false,
              type: 'continuous',
              seriesIndex: 0,
              min: 0,
              max: 400
            }],
            title: [{
              left: '30px',
              top:'15px',
              text: '近31天区域用能趋势',
              textStyle: {
                color: '#fff',
                fontWeight:'normal'
              }
            }],
            tooltip: {
              trigger: 'axis'
            },
            xAxis: [{
              name:'日',
              nameTextStyle:{
                color:'#fff',
              },
              data: this.getPastNDays(31),
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }}
            }],
            yAxis: [{
              name:opt.unit,
              nameTextStyle:{
                color:'#fff',
              },
              splitLine: {show: false},
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }}
            }],
            grid: [{
              left: '8%',
              right: '8%',
              bottom: '6%',
              top:'35%',
            }],
            series: [{
              type: 'line',
              showSymbol: false,
              data: opt.data
            }]
          });
        },
        changeChart4(){
          var name='chart4';
          var data = this.allData[this.buildId][name];
          var opt={
            xAxis: data[this.select[name].date].xAxis,//X轴数据
            dataReal:data[this.select[name].date][this.select[name].w_e].real,//实际量
            dataAvg:data[this.select[name].date][this.select[name].w_e].avg,//参照量
            unit:(this.select[name].w_e=='water')?'m³/m²/a':'kWh/m²/a'//单位
          };
          this.charts[name].setOption({
            title : {
              text: '单位面积能耗',
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
              top:'28%',
              textStyle: {
                color: '#fff',

              }
            },
            grid: {
              left: '3%',
              right: '10%',
              bottom: '2%',
              top:'40%',
              containLabel: true
            },
            calculable : true,
            xAxis : [
              {
                name:this.getXUnit(this.select[name].date),
                type : 'category',
                nameLocation:'end',
                nameTextStyle:{
                  color:'#fff',
                },
                data : opt.xAxis,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
            ],
            yAxis :
              {
                name:opt.unit,
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
              },
            series : [
              {
                name:'实际量',
                type:'bar',
                data:opt.dataReal,
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
                data:opt.dataAvg,
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
        changeChart5(isChangeType){
          var name='chart5';
          if(isChangeType){
            var v=this.select[name].date;
            this.select[name].d_value=this.dateOptions[v][this.dateOptions[v].length-1];
          }
          var data = this.allData[this.buildId][name][this.select[name].date][this.select[name].d_value];
          var arr=[];
          for(var key in data){
            arr.push({
              value:data[key],
              name:this.typeName[key]
            });
          }
          var opt={
            data: arr
          };
          this.charts[name].setOption({
            title : {
              text: '能耗构成占比',
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

            legend: {
              data: ['动力','特殊','暖通空调','照明插座'],
              top:'28%',
              textStyle: {
                color: '#fff'
              },
            },

            series : [
              {
                name: '来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '70%'],
                data: opt.data,
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
        },
        changeChart6() {
          var name = 'chart6';
          var data = this.allData[this.buildId][name];
          var opt = {
            xAxis: this.geneArray(-1,1,31),
            data:data[this.select[name].w_e],
            unit:(this.select[name].w_e=='water')?'m³/m²/a':'kWh/m²/a'
          };
          this.charts[name].setOption({
            visualMap: [{
              show: false,
              type: 'continuous',
              seriesIndex: 0,
              min: 0,
              max: 400
            }],
            title: [{
              left: '30px',
              top:'15px',
              text: '近31天楼栋能耗趋势',
              textStyle: {
                color: '#fff',
                fontWeight:'normal'
              }
            }],
            tooltip: {
              trigger: 'axis'
            },
            xAxis: [{
              name:'日',
              nameTextStyle:{
                color:'#fff',
              },
              data: this.getPastNDays(31),
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }}
            }],
            yAxis: [{
              name:opt.unit,
              nameTextStyle:{
                color:'#fff',

              },
              splitLine: {show: false},
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }}
            }],
            grid: [{
              left: '8%',
              right: '8%',
              bottom: '6%',
              top:'35%',
            }],
            series: [{
              type: 'line',
              showSymbol: false,
              data: opt.data
            }]
          });
        },
        changeChart7() {
          var name='chart7';
          var data = this.allData[this.buildId][name][this.select[name].floor];
          var arr=[];
          for(var key in data){
            arr.push({
              value:data[key],
              name:this.typeName[key]
            });
          }
          var opt={
            data: arr
          };
          this.charts[name].setOption({
            title: {
              text: '近31天区域用能占比',
              left: '30px',
              top: '15px',
              textStyle: {
                color: '#fff',
                fontWeight: 'normal'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            legend: {
              data: ['动力', '特殊', '暖通空调', '照明插座'],
              top: '28%',
              textStyle: {
                color: '#fff'
              },
            },

            series: [
              {
                name: '来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '70%'],
                data: opt.data,
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
        },
        //每张表的数据信息
        initAllData(){
          for(var i=0;i<12;i++){
            var floorNum=J.random(3,6);
            this.allData.push({
              mainInfo:{//每栋楼的总信息
                id:i+1,
                energy:J.random(100,1000),//100-1000之间取随机数
                power:J.random(100,1000),//100-1000之间取随机数
                pm:J.random(10,60),//10-60之间取随机数
                humality:J.random(10,30),//10-30之间取随机数
                floorNum:floorNum
              },
              chart0:{//第一张表
                year:{
                  xAxis:this.geneArray(-1,2013,2017),//2007-2017
                  elec:this.geneArray(5,1000,5000),
                  water:this.geneArray(5,1000,5000)
                },
                month:{
                  xAxis:this.geneArray(-1,1,12),
                  elec:this.geneArray(12,100,500),
                  water:this.geneArray(12,100,500)
                },
                day:{
                  xAxis:this.geneArray(-1,1,30),
                  elec:this.geneArray(30,10,50),
                  water:this.geneArray(30,10,50)
                }
              },
              chart1: {//第2张表
                power:this.geneArray(24,10,50),//动力
                special:this.geneArray(24,10,50),//特殊
                air:this.geneArray(24,10,50),//空调
                light:this.geneArray(24,10,50)//照明
              },
              chart2:{
                power:[this.geneArray(12,30,50),this.geneArray(12,30,50)],//动力
                special:[this.geneArray(12,30,50),this.geneArray(12,30,50)],//特殊
                air:[this.geneArray(12,30,50),this.geneArray(12,30,50)],//空调
                light:[this.geneArray(12,30,50),this.geneArray(12,30,50)]//照明
              },
              chart3:this.geneChart3(floorNum),
              chart4:{
                year:{
                  xAxis:this.geneArray(-1,2008,2017),
                  elec:{
                    real:this.geneArray(10,1000,5000),
                    avg:this.geneArray(10,1000,5000)
                  },
                  water:{
                    real:this.geneArray(10,1000,5000),
                    avg:this.geneArray(10,1000,5000)
                  }
                },
                month:{
                  xAxis:this.geneArray(-1,1,12),
                  elec:{
                    real:this.geneArray(12,100,500),
                    avg:this.geneArray(12,100,500)
                  },
                  water:{
                    real:this.geneArray(12,100,500),
                    avg:this.geneArray(12,100,500)
                  }
                },
                day:{
                  xAxis:this.geneArray(-1,1,30),
                  elec:{
                    real:this.geneArray(30,10,50),
                    avg:this.geneArray(30,10,50)
                  },
                  water:{
                    real:this.geneArray(30,10,50),
                    avg:this.geneArray(30,10,50)
                  }
                }
              },
              chart5: {
                year: this.geneChart5DateArray('year'),
                month: this.geneChart5DateArray('month'),
                day: this.geneChart5DateArray('day'),
              },
              chart6:{
                elec:this.geneArray(31,10,50),
                water:this.geneArray(31,10,50)
              },
              chart7:this.geneChart7(floorNum)
            });
          }
        },
        //年月日选择
        geneChart5DateArray(type){
            var o={};
            var s,e,v;
            var d=new Date();
            if(type=='year'){
              s=d.getFullYear();
              e=s-5;
              v=100;
            }else if(type=='month'){
              s=d.getMonth()+1;
              e=1;
              v=10;
            }else if(type=='day'){
              s=d.getDate();
              e=1;
              v=1;
            }
            for(var i=s;i>=e;i--){
              o[i]={
                power:J.random(v,v*10),//动力
                  special:J.random(v,v*10),//特殊
                air:J.random(v,v*10),//空调
                light:J.random(v,v*10)//照明
              };
            }
            return o;
         },
        //年月日单位
        getXUnit(a){
            switch(a){
              case "year":return '年';break;
              case "month":return '月';break;
              case "day":return '日';break;
              case "hour":return '时';break;
              default:return "";break;
            }
        },
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
        geneChart3(num){
          var arr=[];
          for(var i=0;i<num;i++){
            arr.push({
              elec:this.geneArray(31,10,50),
              water:this.geneArray(31,10,50)
            });
          }
          return arr;
        },
        geneChart7(num){
          var arr=[];
          for(var i=0;i<num;i++){
            arr.push({
              power:J.random(100,1000),//动力
              special:J.random(100,1000),//特殊
              air:J.random(100,1000),//空调
              light:J.random(100,1000)//照明
            });
          }
          return arr;
        }
      }

    }
</script>
<style>
  #energyDetail{}
  #energyDetail .en_top{  height: 70px;  background: #1b1c21;  width: 100%;  }
  #energyDetail .en_top select{ width: 100px;
    background: none;
    margin-left: 30px;
    height: 40px;
    padding-left: 8px;
    border: 1px solid #666;
    margin-top: 18px;}
  #energyDetail .en_bottom select{ width: 100px;
    background: none;
    height: 40px;
    padding-left: 8px;
    border: 1px solid #666;
    margin-top: 20px;}
  #energyDetail .en_top select option,#energyDetail .en_bottom select option{  background-color: transparent;  color: #000;  }
  #energyDetail .en_top .en_top_right{ display: inline-block; vertical-align: middle}
  #energyDetail .en_top .en_top_right ul{}
  #energyDetail .en_top .en_top_right ul li{ width: 200px; float: left; font-size: 18px; color: #3ece2b; margin-left: 150px;}

.chart_item{
  position: relative;
  width:25%;
  float:left;
}
.selected{
  position: absolute;
  top: 50px;
  border-top: 1px solid #666;
  width:390px;
}
.selected select:last-child{float: right}
</style>
