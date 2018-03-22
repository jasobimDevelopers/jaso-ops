<template>
    <div class="yunweiDate">
      <div class="yunweiHeader">运维资料</div>
      <div class="yunweimain">
        <router-link to="SpareParts" class="fileIn"><input class="fileInput" type="file" name=""><p>备品备件</p></router-link>
        <router-link to="UserGuide" class="fileIn"><input class="fileInput" type="file" name=""><p>使用说明书</p></router-link>
        <router-link to="ContactInformation" class="fileIn"><input class="fileInput" type="file" name=""><p>联系方式</p></router-link>
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
    .yunweiDate{  background: #1b1c21; height: 850px; border-radius: 10px;}
    .yunweiDate .yunweiHeader{ line-height: 50px; border-bottom: 1px solid #666; width: 98%; margin: 0 auto; font-size: 16px;}
    .yunweiDate .yunweimain{ width: 95%; padding: 30px;}
    .yunweiDate .yunweimain .fileIn{ display: inline-block; margin-right: 100px;}
    .yunweiDate .yunweimain .fileIn p{ text-align: center; line-height: 50px; color: #fff;}
</style>
<script>
    export default {

    }

</script>
