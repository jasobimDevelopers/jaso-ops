<template>
    <div id="main_con">
            <div class="weihuCon">
                <div class="search">
                    <span style="font-size: 16px;">{{messagetit}}</span>
                    <input class="Search-input pull-right" id="autocomplete" type="text" placeholder="搜索" autocomplete="off">
                    <i class="searchIcon"><img src="../../../images/searicon.png" alt=""/></i>
                </div>
                <div class="weihu_bottom clearfix">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    <div class="weihuRight">

                    </div>
                   <!-- <ul class="tab">
                      <li v-for="(item,index) in tabs" :class="{active:index == num}" @click="tab(index)">{{item}}</li>
                    </ul>
                    <div class="tabCon">
                      <div v-for='(itemCon,index) in tabContents' v-show=" index == num">{{itemCon}}</div>
                    </div>-->
                </div>
            </div>
    </div>

</template>
<script>
import Vue from 'vue'
export default{
  /*data(){
      return{
        tabs: ["标题一", "标题二","标题三"],
        tabContents: ["内容一", "内容二","内容三"],
        num: 1
      }

  },
  methods: {
    tab(index) {
      this.num = index;
    }
  }*/
        data() {
            return {
                messagetit:'维护管理',
                data: [{
                    label: '1#楼',
                    children: [{
                        label: 'B1',
                        children: [
                            {label: '冷水机'},
                            {label: '锅炉'},
                            {label: '冰水机'},
                            {label: '消防栓'}
                        ]
                    },{
                        label: 'B2',
                        children: [
                            {label: '冷水机'},
                            {label: '锅炉'},
                            {label: '冰水机'},
                            {label: '消防栓'}
                        ]
             }]
                }, {
                    label: '2#楼',
                    children: [{
                        label: 'B1',
                        children: [
                            {label: '冷水机'},
                            {label: '锅炉'},
                            {label: '冰水机'},
                            {label: '消防栓'}
                        ]
                    },{
                        label: 'B2',
                        children: [
                            {label: '冷水机'},
                            {label: '锅炉'},
                            {label: '冰水机'},
                            {label: '消防栓'}
                        ]
                    }]
                }, {
                    label: '3#楼',
                    children: [{
                        label: 'B1',
                        children: [
                            {label: '冷水机'},
                            {label: '锅炉'},
                            {label: '冰水机'},
                            {label: '消防栓'}
                        ]
                    },{
                        label: 'B2',
                        children: [
                            {label: '冷水机'},
                            {label: '锅炉'},
                            {label: '冰水机'},
                            {label: '消防栓'}
                        ]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },

            };
        },

    mounted: function (){

    },
    methods: {
        /*handleNodeClick(data) {
            console.log(data);
        },*/
       /* filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        nodeClicked (p1, p2, p3) {
            console.log(p1, p2, p3)
            alert(p1.label)
        },*/
        handleNodeClick (p1, p2, p3) {
//            console.log(p1, p2, p3)
            alert(p1.label)
//            alert("weihuRight")
        }

    }
    };



</script>
<style>
    /*#main_con .weihuCon .weihu_bottom .tab,#main_con .weihuCon .weihu_bottom .tabCon{ display: inline-block}*/
    #menuConMain{ display: inline-block; float: left;}
    #main_con .weihuCon .search{
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #666;
      position: relative;
      overflow: hidden;
    }
    #main_con .weihuCon .search span{ color: #fff;}
    #main_con .weihuCon .search input{
      height: 30px;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid #e3e3e3;
      border-radius: 4px;
      color: #ccc;
      font-size: 16px;
      width: 200px;
      margin-top: 10px;
      padding-left: 8px;
      outline: none;
    }
    #main_con .weihuCon .search .searchIcon {
      position: absolute;
      right:4%;
      top: 93px;
    }
    #main_con{ background: #1b1c21; border-radius: 10px;}
    /*.main_con .page-title{ background: #1b1c21; height: 950px;}*/
    #main_con .weihuCon{ width: 97%; margin: 0 auto;}
    #main_con .weihuCon .weihu_bottom{ margin-top: 30px; width: 100%;}
    .el-tree{ display: inline-block; float: left; margin-top: 0;}
    /*.weihuRight{ display: inline-block; float: left; margin-left: 50px; background: #ffffff; width:60%; height: 700px; }*/
</style>
