<template>
  <!--<div>视频</div>-->
  <div class="palyers">
    <video id="player-1" poster="" controls playsInline webkit-playsinline autoplay>
      <source src="rtmp://rtmp.open.ys7.com/openlive/235507500b364540bd70cb1a63eca02a" type="rtmp/flv" />
      <source src="http://hls.open.ys7.com/openlive/235507500b364540bd70cb1a63eca02a.m3u8" type="application/x-mpegURL" />
    </video>
    <video id="player-2" poster="" controls playsInline webkit-playsinline autoplay>
      <source src="rtmp://rtmp.open.ys7.com/openlive/c128867869b841d48116f1a30e301640" type="rtmp/flv" />
      <source src="http://hls.open.ys7.com/openlive/c128867869b841d48116f1a30e301640.m3u8" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script>
  import ezuikit from './a/ezuikit';
  export default{
      data(){
          return{
            player:null
          }
      },
    mounted(){
      this.player1 = new EZUIPlayer('player-1');
      this.player2 = new EZUIPlayer('player-2');
      // this.player.on('error', function(){
      //   console.log('error');
      // });
      // this.player.on('play', function(){
      //   console.log('play');
      // });
      // this.player.on('pause', function(){
      //   console.log('pause');
      // });
      // this.player.on('waiting', function(){
      //   console.log('waiting');
      // });
    },
    methods:{
     log(str){
    var div = document.createElement('DIV');
    div.innerHTML = (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') + JSON.stringify(str);
    document.body.appendChild(div);
  }
    }
  }
</script>
<style>
  body{margin:0;}
  .palyers {
    display: flex;
    align-items: center;
  }
  #player-1, #player-2 {
    margin-right: 24px;
    max-width: 800px;
    width: 100%;
  }
</style>
