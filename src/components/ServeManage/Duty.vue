<template>
    <div class="duty">
        <div class="dutyHeader">任务分配</div>
        <div class="dutyMain">
          <label>
            <span>项目名：</span>
            <select name="" id="eleName" style="width: 150px;">
              <option value="">南京研发楼</option>
              <option value="">南京研发楼</option>
            </select>
          </label>
          <label>
            <span>巡视组名</span>
            <select name="" id="lookName">
              <option value="">全部</option>
              <option value="">巡视一组</option>
              <option value="">巡视二组</option>
              <option value="">巡视三组</option>
            </select>
          </label>
          <label>
            <span>巡视类别</span>
            <select name="" id="lookKind">
              <option value="">全部</option>
              <option value="">维护</option>
              <option value="">检查</option>
              <option value="">巡视</option>
            </select>
          </label>
          <label>
            <span>巡视性质</span>
            <select name="" id="lookQuality">
              <option value="">全部</option>
              <option value="">周巡检</option>
              <option value="">月巡检</option>
            </select>
          </label>
          <div class="block">
            <span class="demonstration">时间</span>
            <el-date-picker
              v-model="valueDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
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
       name:'duty',
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
   .duty{ font-family: Regular; background: #1b1c21; border-radius: 10px; height: 850px;}
   .duty .dutyHeader{ width: 97%; margin: 0 auto; line-height: 50px; font-size: 16px; border-bottom: 1px solid #666;}
   .duty .dutyMain{width: 97%; margin: 30px auto;}
   .duty .dutyMain label{ margin-right: 30px;}
   .duty .dutyMain label:last-child{ margin-right: 0;}
   .duty .dutyMain label span{ font-weight: normal}
   .duty .dutyMain label .el-input{ width: inherit;}
   .duty .dutyMain label .el-input .el-input__inner{background: none; border-radius: 0; height: 34px;}
   .duty .dutyMain label select{
     width: 100px;
     background: none;
     margin-left: 30px;
     height: 34px;
     padding-left: 8px;
     border: 1px solid #fff;
     margin-top: 18px;
   }
   .duty .dutyMain label select option{  background-color: transparent;  color: #000;  }
   .duty .dutyMain .block {display: inline-block; }
   .duty .dutyMain .block span {margin-right: 30px;}
   .duty .dutyMain .el-table--fit {margin-top: 30px;}
   .duty .dutyMain thead.has-gutter tr th{ background: #409eff; color: #fff; border-right: 1px solid #fff; text-align: center;}
   .duty .dutyMain tr.el-table__row td{ border-right: 1px solid #ebeef5;}
   .duty .dutyMain .el-date-editor .el-range-input{ width: 34%;}
   /*.duty .dutyMain label .block .el-input__inner{  background-color: transparent;  color: #000;  }*/
 </style>
