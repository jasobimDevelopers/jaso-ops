<template>
  <div class="satisfy">
    <div class="satisfyHeader">满意度调查</div>
    <div class="satistyInvestigate">

      <div class="block">
        <div class="satisfyYes satisfyCheck">
          <p class="tit">一：平台总体满意度</p>
          <p>1.总体而言你对平台的满意度</p>
          <span class="demonstrationN satisfyDemo">不满意</span> <span class="demonstrationY satisfyDemo">满意</span>
          <el-rate v-model="value1"></el-rate>
        </div>
        <div class="satisfyNo satisfyCheck">
          <p>2.对自己接收到的信息内容满意度</p>
          <span class="demonstrationN satisfyDemo">不满意</span> <span class="demonstrationY satisfyDemo">满意</span>
          <el-rate v-model="value2"></el-rate>
        </div>
        <div class="satisfyNo satisfyCheck">
          <p>3.你可以从本平台中学习到什么</p>
          <div class="checkBox">
            <p><input type="checkbox">专业案例</p>
            <p><input type="checkbox">行业经验</p>
            <p><input type="checkbox">了解工作流程</p>
            <p><input type="checkbox">实用性知识</p>
            <p><input type="checkbox">认识工作新技能</p>
            <p><input type="checkbox">没有</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-button class="satisfactionSend" type="success" @click="satisfactionSend">提交反馈</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1: null,
        value2: null
      }
    },
    methods:{
      satisfactionSend(){
        this.$message({
          message: '提交反馈成功',
          type: 'success'
        });
      }
    }
  }
</script>
<style>
  .satisfy{ background: #1b1c21; border-radius: 10px; height: 850px;}
  .satisfy .satisfyHeader{ width: 97%; margin: 0 auto; line-height: 50px; font-size: 16px; border-bottom: 1px solid #666;}
  .satisfy .satistyInvestigate{ width: 97%; margin: 0 auto; }
  /*.satisfy .satistyInvestigate>p{margin: 30px 0; }*/
  .satisfy .satistyInvestigate .block .satisfyCheck .tit{margin: 20px 0; }
  .satisfy .satistyInvestigate .block .satisfyCheck .demonstrationY{margin-left: 190px; }
  .satisfy .satistyInvestigate .block .satisfyCheck .el-rate__icon{font-size: 30px; margin-right: 30px;}
  .satisfy .satistyInvestigate .block .satisfyCheck .satisfyDemo{ margin-top: 8px; display: inline-block;}
  .satisfy .satistyInvestigate .block .satisfyNo{margin-top: 30px;}
  .satisfy .satistyInvestigate .block .checkBox p input{width: 18px; height: 18px; vertical-align: bottom;  margin-right: 6px; /* margin: 6px; */  margin-top: 8px;}
  .satisfy .satisfactionSend{ width: 200px; padding: 10px 60px; margin: 60px 100px;}
</style>
