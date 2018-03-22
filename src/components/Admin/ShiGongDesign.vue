<template>
    <div class="buildDate">
        <div class="buildHeader">施工资料</div>
        <div class="buildmain">
          <router-link to="ConstructionList" class="fileIn"><input class="fileInput" type="file" name=""><p>施工子单</p></router-link>
          <router-link to="ConcealedAcceptance" class="fileIn"><input class="fileInput" type="file" name=""><p>隐蔽验收</p></router-link>
          <router-link to="ConstructionDrawings" class="fileIn"><input class="fileInput" type="file" name=""><p>施工检测报告</p></router-link>
          <router-view></router-view>
        </div>
    </div>
</template>
<style>
  .fileIn{
    height:140px;
    background:url(../../../images/file.png) no-repeat;
    width: 100px;
    text-align: center;
  }
  .fileInput{
    height:140px;
    opacity: 0;
    filter:alpha(opacity=0);
    cursor:pointer;
  }
    .buildDate{  background: #1b1c21; height: 850px; border-radius: 10px;}
    .buildDate .buildHeader{ line-height: 50px; border-bottom: 1px solid #666; width: 98%; margin: 0 auto; font-size: 16px;}
    .buildDate .buildmain{ width: 95%; padding: 30px;}
    .buildDate .buildmain .fileIn{ display: inline-block; margin-right: 100px;}
    .buildDate .buildmain .fileIn p{ text-align: center; line-height: 50px; color: #fff;}

</style>

<script>
export default{

}
</script>
