<template>
   <div class="designDate">
      <div class="designHeader">竣工资料</div>
      <div class="designMain">
        <router-link to="designDrawing" class="fileIn"><input class="fileInput" type="file" name=""><p>竣工图</p></router-link>
        <router-link to="designBook" class="fileIn"><input class="fileInput" type="file" name=""><p>设计计算书</p></router-link>
        <router-view></router-view>
      </div>
   </div>
</template>
<script>
  export default {
    data(){
      return{
       value:'',
      }
    },
    computed:{

    },
    methods:{
      designPic(){
         if(this.willShow == true){
             this.willShow = false
         } else {
             this.willShow = true
         }
      },
      black(){

      }
    }
  }

</script>

<style>
  .fileIn{
    height:140px;
    background:url(../../../images/file.png) no-repeat;
    width: 100px;
    /*padding-top: 150px;*/
    text-align: center;
  }
  .fileInput{
    height:140px;
    opacity: 0;
    filter:alpha(opacity=0);
    cursor:pointer;
  }
   .designDate{  background: #1b1c21; height: 850px; border-radius: 10px;}
   .designDate .designHeader{ line-height: 50px; border-bottom: 1px solid #666; width: 98%; margin: 0 auto; font-size: 16px;}
   .designDate .designMain{ width: 95%; padding: 30px;}
   .designDate .designMain .fileIn{ display: inline-block; margin-right: 100px;}
   .designDate .designMain .fileIn p{ text-align: center; line-height: 50px; color: #fff;}
   /*.designDate .designmain  .designFileList{ background: #f00;}*/
</style>

