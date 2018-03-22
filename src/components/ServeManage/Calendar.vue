<template>
    <div class="calendar">
        <div class="calendarHeader">日历表</div>
      <div id="calendar">
        <!-- 年份 月份 -->
        <div class="month">
          <ul>
            <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
            <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
            <li class="year-month" @click="pickYear(currentYear,currentMonth)">
              <span class="choose-year">{{ currentYear }}</span>
              <span class="choose-month">{{ currentMonth }}月</span>
            </li>
            <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
          </ul>
        </div>
        <!-- 星期 -->
        <ul class="weekdays">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li style="color:red">六</li>
          <li style="color:red">日</li>
        </ul>
        <!-- 日期 -->
        <ul class="days">
          <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
          <li  v-for="dayobject in days">
            <!--本月-->
            <!--如果不是本月  改变类名加灰色-->
            <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
            <!--如果是本月  还需要判断是不是这一天-->
            <span v-else>
          <!--今天  同年同月同日-->
                <div v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">
                  <div>{{ dayobject.day.getDate() }}</div>
                   <div>设备保养</div>
                   <div>日常巡更</div>
                </div>
                <div v-else>{{ dayobject.day.getDate() }}

                </div>

            </span>

          </li>
        </ul>
      </div>
      <!--<full-calendar :events="fcEvents" locale="en"></full-calendar>-->
    </div>
</template>
<script>
  export default{
      data(){
          return{
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            days: [],
          }
      },
    created: function() {  //在vue初始化时调用
      this.initData(null);
    },
    methods: {
      initData: function(cur) {
        var leftcount=0; //存放剩余数量
        var date = 0;
        if (cur) {
          date = new Date(cur);

        } else {
        date = new Date()
          //var now=new Date();
          //var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
          //alert(d)
         // d.setDate(35);
         // alert(d.setDate(1))
          // date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        }
        this.currentDay = date.getDate();
        //alert(this.currentDay)1
        this.currentYear = date.getFullYear();
        //alert(this.currentYear)2001
        this.currentMonth = date.getMonth() + 1;
        this.currentWeek = date.getDay(); // 1...6,0
        if (this.currentWeek == 0) {
          this.currentWeek = 7;
        }
        var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
        this.days.length = 0;
        // 今天是周日，放在第一行第7个位置，前面6个
        //初始化本周
        for (var i = this.currentWeek - 1; i >= 0; i--) {
          var d = new Date(str);
          d.setDate(d.getDate() - i);
          var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
          dayobject.day=d;
          this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用


        }
        //其他周
        for (var i = 1; i <= 35 - this.currentWeek; i++) {
          var d = new Date(str);
          d.setDate(d.getDate() + i);
          var dayobject={};
          dayobject.day=d;
          this.days.push(dayobject);
        }

      },
      pickPre: function(year, month) {

        // setDate(0); 上月最后一天
        // setDate(-1); 上月倒数第二天
        // setDate(dx) 参数dx为 上月最后一天的前后dx天
        var d = new Date(this.formatDate(year , month , 1));
        d.setDate(0);
        this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
      },
      pickNext: function(year, month) {
        var d = new Date(this.formatDate(year , month , 1));
        d.setDate(35);
        this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
      },
      pickYear: function(year, month) {
        alert(year + "," + month);
      },

      // 返回 类似 2016-01-02 格式的字符串
      formatDate: function(year,month,day){
        var y = year;
        var m = month;
        if(m<10) m = "0" + m;
        var d = day;
        if(d<10) d = "0" + d;
        return y+"-"+m+"-"+d
      },


    },
  }


</script>
<style>
  * {
    box-sizing: border-box;
  }
  ul {
    list-style-type: none;
  }
  body {
    font-family: Verdana, sans-serif;
    background: #E8F0F3;
  }
  #calendar{
    width:80%;
    margin: 30px auto;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);
  }
  .month {
    width: 100%;
    background: #4d5158;
  }
  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
  }
  .choose-year {
    padding-left: 20px;
    padding-right: 20px;
  }
  .choose-month {
    text-align: center;
    font-size: 1.5rem;
  }
  .arrow {
    padding: 30px;
  }
  .arrow:hover {
    background: rgba(100, 2, 12, 0.1);
  }
  .month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  .weekdays {
    margin: 0;
    /*padding: 10px 0;*/
    line-height: 40px;
    background-color: #35383d;
    display: flex;
    flex-wrap: wrap;
    color: #FFFFFF;
    border-bottom: 1px solid #555;
    justify-content: space-around;
  }
  .weekdays li {
    display: inline-block;
    width: 14.2%;
    text-align: center;
    border-right: 1px solid #555;
  }
  /*.weekdays li:last-child{ border-right: none}*/
  .days {
    padding: 0;
    background: #35383d;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    /*padding-bottom: 15px;*/
    /*padding-top: 15px;*/
    border-right: 1px solid #555;
    border-bottom: 1px solid #555;
    font-size: 1rem;
    color: #fff;
    height: 100px;
  }
  .days li span{
    display: inline-block;
    width: 100%;
    /*padding: 5px 0;*/
    border-bottom: 1px solid #555;
    height: 30px;
  }
  .days li:last-child{ border-right: none;}
  .days li .active {
    /*padding: 6px 10px;*/
    background: #272a3d;
    color: #fff;
    height: 100px;

    background: #272a3d;
  }
  .days li .other-month {
    /*padding: 5px;*/
    color: gainsboro;
  }
  .days li:hover {
    background: #272a3d;
  }
</style>

<style>
    .calendar{ background: #1b1c21; border-radius: 10px; height: 850px;}
    .calendar .calendarHeader{ width: 97%; margin: 0 auto; line-height: 50px; font-size: 16px; border-bottom: 1px solid #666;}
</style>
<!--<template>
  <div class="date">
    &lt;!&ndash; 年份 月份 &ndash;&gt;
    <div class="month">
      <p>{{ currentYear }}年{{ currentMonth }}月</p>
    </div>
    &lt;!&ndash; 星期 &ndash;&gt;
    <ul class="weekdays">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
      <li>日</li>
    </ul>
    &lt;!&ndash; 日期 &ndash;&gt;
    <ul class="days">
      <li @click="pick(day)" v-for="(day, index) in days" :key="index">
        &lt;!&ndash;本月&ndash;&gt;
        <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
        <span v-else>
          &lt;!&ndash;今天&ndash;&gt;
          <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}</span>
          <span v-else>{{ day.getDate() }}</span>
          </span>
      </li>
    </ul>
  </div>
</template>
<script>


  export default {
    name: 'date',

    data () {
      return {
        currentYear: 1970,   // 年份
        currentMonth: 1,  // 月份
        currentDay: 1,    // 日期
        currentWeek: 1,    // 星期
        days: [],
      }
    },

    mounted () {

    },

    created () {
      this.initData(null)
    },

    methods: {
      formatDate (year, month, day) {
        const y = year
        let m = month
        if (m < 10) m = `0${m}`
        let d = day
        if (d < 10) d = `0${d}`
        return `${y}-${m}-${d}`
      },

      initData (cur) {
        let date = ''
        if (cur) {
          date = new Date(cur)
        } else {
          date = new Date()
        }
        this.currentDay = date.getDate()          // 今日日期 几号
        this.currentYear = date.getFullYear()       // 当前年份
        this.currentMonth = date.getMonth() + 1    // 当前月份
        this.currentWeek = date.getDay() // 1...6,0   // 星期几
        if (this.currentWeek === 0) {
          this.currentWeek = 7
        }
        const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)// 今日日期 年-月-日
        this.days.length = 0
        // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
        /* eslint-disabled */
        for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
          const d = new Date(str)
          d.setDate(d.getDate() - i)
          // console.log(y:" + d.getDate())
          this.days.push(d)
        }
        for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
          const d = new Date(str)
          d.setDate(d.getDate() + i)
          this.days.push(d)
        }
      },

      //  上个星期
      weekPre () {
        const d = this.days[0]    // 如果当期日期是7号或者小于7号
        d.setDate(d.getDate() - 7)
        this.initData(d)
      },

      //  下个星期
      weekNext () {
        const d = this.days[6]    // 如果当期日期是7号或者小于7号
        d.setDate(d.getDate() + 7)
        this.initData(d)
      },

      // 上一個月   传入当前年份和月份
      pickPre (year, month) {
        const d = new Date(this.formatDate(year, month, 1))
        d.setDate(0)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },


      // 下一個月   传入当前年份和月份
      pickNext (year, month) {
        const d = new Date(this.formatDate(year, month, 1))
        d.setDate(35)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },

      // 当前选择日期
      pick (date) {
        alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
      },
    },
  }
</script>
<style>

  .date {
    height: 90px;
    color: #333;}

  .date .month {
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
  }

  .date .weekdays {
    display: flex;
    font-size: 14px;
    margin-top: 14px;}

  .date .weekdays li {
    flex: 1;
    text-align: center;
  }


  .days {
    display: flex;}

  .days li {
    flex: 1;
    font-size: 15px;
    text-align: center;
    margin-top: 5px;
    line-height:  30px;
    color: #fff;
  }

  .days li .active {
    display: inline-block;
    width: 30px;
    height: 30px;
    color: #fff;
    border-radius: 50%;
    background-color: #fa6854;
  }

  .other-month {
    color: #e4393c;
  }

</style>-->
