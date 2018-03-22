<template>
<div id="formExport">
  <div class="formExportTop">
    <select name="" id="build">
      <option value="">1#楼</option>
      <option value="">2#楼</option>
      <option value="">3#楼</option>
      <option value="">4#楼</option>
    </select>
    <select name="" id="floor" @change="initData()">
      <option value="">一层</option>
      <option value="">二层</option>
      <option value="">三层</option>
      <option value="">四层</option>
    </select>
    <select name="" v-model="dateType"
            @change="changeDateType">
      <option value="day">日</option>
      <option value="month">月</option>
      <option value="year">年</option>
    </select>
    <div class="block">
      <el-date-picker
        v-model="singleDate"
        v-if="dateType=='day'"
        @change="changeSingleDate"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      <el-date-picker
        v-model="singleDate"
        v-if="dateType=='month'"
        type="month"
        placeholder="选择月">
      </el-date-picker>
      <el-date-picker
        v-model="singleDate"
        v-if="dateType=='year'"
        align="right"
        type="year"
        placeholder="选择年">
      </el-date-picker>
    </div>
    <select name="" id="classification" v-model="powerType">
      <option value="all">全部</option>
      <option value="power">动力</option>
      <option value="special">特殊</option>
      <option value="air">空调用电</option>
      <option value="light">照明插座</option>
    </select>
          <div class="block">
            <!--<span class="demonstration">默认</span>-->
            <el-date-picker
              v-model="date"
              @change="changeRangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
    <el-button class="btn" type="success">确定</el-button>
    <el-button class="btn" type="danger" @click="exportDefault()">导出excel</el-button>
  </div>
  <div class="formContainer">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column v-for="col in cols" :prop="col.prop" :label="col.label" ></el-table-column>
      </el-table>
  </div>
  <el-pagination
    background
    @current-change="handleCurrentChange"
    layout="prev, pager, next"
    :total="54">
  </el-pagination>
</div>
</template>
<script>
//    import exportexcel from'../../../static/JsonExportExcel.min'
  export default {
    mounted(){
      this.initColsAndRooms();
      this.initData();
    },
      data(){
          return{
            dateType:'day',
            singleDate:new Date(),
            powerType:'all',
            date:[],
            dateArr:[],
            tableData: [],
            cols:[],
            rooms:[],
            dateTypeCols: {
            day: [],
            month: [],
            year: []
            },

          }
      },
    methods:{
      handleCurrentChange(){
        this.initData();
      },
      changeDateType(){
        this.cols=this.dateTypeCols[this.dateType];
        this.date=[];
        this.dateArr=[];
        this.initData();
      },
      changeSingleDate(){
        this.date=[];
        this.dateArr=[];
        this.initData();
      },
      changeRangeDate(){
        //需要补充
        this.dateType='month';
        this.singleDate=null;
      },
      formatDate(date){
        var year = date.getFullYear();
        var month = date.getMonth().toString().length==1?"0"+(date.getMonth()+1).toString():(date.getMonth()+1);
        var day = date.getDate().toString().length==1?"0"+date.getDate():date.getDate();
        return year+"-"+month+"-"+day;
      },
      initData(){
        this.tableData=[];
        for(var i=0;i<this.rooms.length;i++){
          var obj={};
          this.cols.forEach(function (item) {
            obj[item.prop]=J.random(50,100);
          });
          obj.room=this.rooms[i];
          this.tableData.push(obj);
        }
      },
      initColsAndRooms(){
        this.dateTypeCols.day.push({prop: 'room', label: '房间号'});
        for(var i=0;i<24;i++){
          this.dateTypeCols.day.push({prop: 'h'+i, label: ((i<10)?('0'+i):i)+':00'});
        }
        this.dateTypeCols.month.push({prop: 'room', label: '房间号'});
        for(var i=1;i<=30;i++){
          this.dateTypeCols.month.push({prop: 'd'+i, label: (i)+'日'});
        }
        this.dateTypeCols.year.push({prop: 'room', label: '房间号'});
        for(var i=1;i<=12;i++){
          this.dateTypeCols.year.push({prop: 'm'+i, label: (i)+'月'});
        }
        this.cols=this.dateTypeCols[this.dateType];
        for(var i=0;i<=10;i++){
          this.rooms.push('房间'+i);
        }

      },
      exportDefault(){
            var option={};
            option.fileName = 'excel';
            option.datas=[
              {
                sheetData:[{one:'1#楼',two:'一层',three:'988kWh'},{one:'2#楼',two:'一层',three:'1608kWh'},{one:'3#楼',two:'一层',three:'868kWh'}],
                sheetName:'sheet1',
                sheetHeader:['楼','层','用能']
              },{
                sheetData:[{one:'1#楼',two:'一层',three:'868kWh'},{one:'2#楼',two:'一层',three:'1268kWh'},{one:'3#楼',two:'一层',three:'1068kWh'}],
                sheetName:'sheet2',
                sheetHeader:['楼','层','用能']
              },{
                sheetData:[{one:'1#楼',two:'一层',three:'788kWh'},{one:'2#楼',two:'一层',three:'1008kWh'},{one:'3#楼',two:'一层',three:'1468kWh'}],
                sheetName:'sheet3',
                sheetHeader:['楼','层','用能']
              }
            ];
            var toExcel=new ExportJsonExcel(option);
            toExcel.saveExcel();
          }
    }
  }
</script>
<style>
  @import url("//unpkg.com/element-ui@2.0.8/lib/theme-chalk/index.css");
  .cell{text-align: center}
  .el-pagination{
    height: 50px;
    text-align: center;
    margin-top: 10px;
  }
#formExport{ background: #1b1c21;width: 100%; height: 850px; border-radius: 8px;}
#formExport .formExportTop{ height: 80px; width: 100%;}
#formExport .formExportTop select{
  width: 120px;
  background: none;
  float: left;
  margin-right: 40px;
  margin-left: 30px;
  height: 34px;
  padding-left: 8px;
  border: 1px solid #666;
  margin-top: 18px;}
#formExport .formExportTop select option{  background-color: transparent;  color: #000;  }
#formExport .formExportTop .block{ display: inline-block; margin-right: 40px; float: left; margin-top: 18px;}
#formExport .formExportTop .block .el-date-editor .el-range-separator{ width: initial;}
#formExport .formExportTop .block .el-date-editor--daterange.el-input__inner{ width: 260px;}
#formExport .formExportTop .block .el-input__inner{ background-color: transparent; height: 34px; border-radius: 0;}
#formExport .formExportTop .block .el-date-editor .el-range-input,#charts01 .bottom .block .el-date-editor .el-range-separator{ vertical-align: top;}
#formExport .formExportTop .block .el-date-editor .el-range-input{ width: 34%;}
#formExport .formExportTop .block .el-date-editor .el-range-input{ background-color: transparent; color: #fff;}
#formExport .formExportTop .block .el-date-editor .el-range-separator{ color: #fff;}
#formExport .formExportTop .btn{ color: #fff; width: 100px; height: 34px; float: left; margin-top: 18px;}
#formExport .formContainer{ width: 100%; height: 600px; margin-top: 30px;}
#formExport .formContainer thead.has-gutter tr th{ background: #409eff; color: #fff; border-right: 1px solid #fff;}
#formExport .formContainer tr.el-table__row td{ border-right: 1px solid #ebeef5;}
/*#formExport .formContainer .el-table tr {  background-color: #18191d; color: #fff;}
#formExport .formContainer .el-table__body-wrapper {  background-color: #18191d; color: #fff;}
.el-table--enable-row-hover .el-table__body tr:hover>td {  background-color: #f5f7fa; color: #333;}*/
</style>
