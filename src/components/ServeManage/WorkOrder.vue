<template>
    <div class="workOrder">
        <div class="workHeader">工单编制</div>
      <div class="workMain">
        <label>
          <!--<span>变电站：</span><input type="text" >-->
          <span>项目名：</span><span>南京研发楼</span>
        </label>
        <label>
          <span>报修人姓名：</span><input type="text" >
        </label>
        <label>
          <span>报修单元：</span><input type="text" >
        </label>
        <label>
          <span>报修内容： </span><input type="text" >
        </label>
        <div class="block">
          <span class="demonstration">时间</span>
          <el-date-picker
            v-model="valueDate"
            type="daterange"
            range-separator="至"
            start-placeholder="报修日期"
            end-placeholder="完工日期">
          </el-date-picker>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="项目名" width="180"></el-table-column>
          <el-table-column prop="eleName" label="项目地址" width="180"></el-table-column>
          <el-table-column prop="mainCon" label="巡视内容"></el-table-column>
          <el-table-column prop="lookQuality" label="巡视性质"></el-table-column>
          <el-table-column prop="lookKind" label="巡视类别"></el-table-column>
          <el-table-column prop="lookName" label="巡视组名"></el-table-column>
          <el-table-column prop="planDate" label="计划完成日期"></el-table-column>
          <el-table-column prop="makePerson" label="编制人"></el-table-column>
          <el-table-column prop="makeDate" label="编制日期"></el-table-column>
          <el-table-column prop="checkPerson" label="审核人"></el-table-column>
          <el-table-column prop="checkTime" label="审核时间"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="dutyTo" label="任务分配"></el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script>

  export default{
    name:'workOrder',
    data(){
      return{
        inputName:'',
        valueDate:'',
        tableData: [
          /* {
           date:'',
           eleName: '',
           mainCon: '',
           lookQuality: '',
           lookKind: '',
           lookName:'',
           palnDate:'',
           makePerson:'',
           makeDate:'',
           checkPerson:'',
           checkTime:'',
           status:'',
           dutyTo:'',
           }*/
        ]
      }
    }
  }
</script>
<style>
  .workOrder{ font-family: Regular; background: #1b1c21; border-radius: 10px; height: 850px;}
  .workOrder .workHeader{ width: 97%; margin: 0 auto; line-height: 50px; font-size: 16px; border-bottom: 1px solid #666;}
  .workOrder .workMain{width: 97%; margin: 30px auto;}
  .workOrder .workMain label{ margin-right: 30px;}
  .workOrder .workMain label:last-child{ margin-right: 0;}
  .workOrder .workMain label span{ font-weight: normal}
  .workOrder .workMain label input{ font-weight: normal; color: #fff; height: 34px; background: none; border: none; border: 1px solid #fff;  padding-left: 6px;}
  .workOrder .workMain label .el-input{ width: inherit;}
  .workOrder .workMain label .el-input .el-input__inner{background: none; border-radius: 0; height: 34px;}
  .workOrder .workMain label select{
    width: 100px;
    background: none;
    margin-left: 30px;
    height: 34px;
    padding-left: 8px;
    border: 1px solid #fff;
    margin-top: 18px;
  }
  .workOrder .workMain label select option{  background-color: transparent;  color: #000; font-weight: normal }
  .workOrder .workMain .block {display: inline-block; }
  .workOrder .workMain .block span {margin-right: 30px;}
  .workOrder .workMain .el-table--fit {margin-top: 30px;}
  .workOrder .workMain thead.has-gutter tr th{ background: #409eff; color: #fff; border-right: 1px solid #fff; text-align: center;}
  .workOrder .workMain tr.el-table__row td{ border-right: 1px solid #ebeef5;}
  .workOrder .workMain .el-date-editor .el-range-input{ width: 34%;}
  /*.duty .dutyMain label .block .el-input__inner{  background-color: transparent;  color: #000;  }*/
</style>
