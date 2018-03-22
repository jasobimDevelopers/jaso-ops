<template>
        <div id="service">
            <div class="line_left">
                <div class="line_left_top">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="设备名称" class="formSize"><el-input></el-input></el-form-item>
                        <el-form-item label="维修人员" class="formSize"><el-input></el-input></el-form-item>
                        <!--<el-form-item label="时间" class="formSize"><el-input></el-input></el-form-item>-->
                        <div class="block formSize">
                            <span class="demonstration">时间</span>
                            <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
                        </div>
                        <el-form-item class="formChoose"><el-button type="primary" class="choose">筛选</el-button></el-form-item>
                        <el-form-item class="formAdd"><el-button type="warning" @click="dialogVisible01 = true" class="add additem">新增</el-button></el-form-item>
                        <!--<button class="btn" @click="openNewItemDialog('Create New Item')">Create</button>-->
                    </el-form>
                    <!--新增弹框-->
                    <el-dialog title="新增维修记录" :visible.sync="dialogVisible01" style="top: 0;">
                        <el-form :model="form" >
                            <el-form-item label="维修设备名称"><el-input v-model="form.Title" class="inline-input"></el-input></el-form-item>
                            <el-form-item label="设备所在位置"><el-input v-model="form.Place" class="inline-input"></el-input></el-form-item>
                            <el-form-item label="维修人员"><el-input v-model="form.Person" class="inline-input" value=""></el-input></el-form-item>
                            <el-form-item label="维修时间"><el-input v-model="form.Time" class="inline-input" value=""></el-input>
                        </el-form-item>
                            <el-form-item label="详细情况"><el-input v-model="form.Detail" class="areatext" type="textarea"></el-input></el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button class="sendTo" type="success" @click="confirmEdit01">提交记录</el-button>
                        </div>
                    </el-dialog>
                </div>
                <div class="line_left_bottom">
                    <table class="tableCon">
                        <tr>
                            <th>设备名称</th>
                            <th>位置</th>
                            <th>维修人员</th>
                            <th>时间</th>
                            <th>维修表单</th>
                        </tr>
                        <tr v-for="(item,index) of table">
                            <td>{{item.title}}</td>
                            <td>{{item.place}}</td>
                            <td>{{item.person}}</td>
                            <td>{{item.time}}</td>
                            <td><button @click="updateusers(index)" class="change" style="border: none; background: none; color: #00aeef;">详情</button></td>
                        </tr>
                    </table>
                </div>
              <!--详情弹框-->
              <el-dialog title="详情" :visible.sync="dialogVisibleDetail" style="top: 0;">
                <el-form :model="detail" >
                  <el-form-item label="设备名称"><el-input v-model="detail.title" :value="detail.title"  class="inline-input" ></el-input></el-form-item>
                  <el-form-item label="位置"><el-input v-model="detail.place" :value="detail.place" class="inline-input"></el-input></el-form-item>
                  <el-form-item label="维修人员"><el-input v-model="detail.person" :value="detail.person" class="inline-input"></el-input></el-form-item>
                  <el-form-item label="时间"><el-input v-model="detail.time" :value="detail.time" class="inline-input"></el-input></el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                  <el-button class="sendTo " type="success" @click="detailSuccess">确定</el-button>
                </div>
              </el-dialog>
            </div>
            <div class="middleLine" style="width: 1px; background: rgb(121, 121, 123); height: 850px; display: inline-block; margin: 0 1.8%;"></div>
          <div class="line_right">
                <div class="line_right_top">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="设备名称">
                            <el-input placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="choose">筛选</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="warning" @click="dialogVisible = true" class="add additem">新增</el-button>
                        </el-form-item>
                    </el-form>
                    <el-dialog title="新增设备" :visible.sync="dialogVisible" style="top: 0;">
                        <el-form>
                            <el-form-item label="备品名称"><el-input v-model="inform.Namename" class="inline-input"></el-input></el-form-item>
                            <el-form-item label="备品型号"><el-input v-model="inform.Size" class="inline-input"></el-input></el-form-item>
                            <el-form-item label="库存数量"><el-input v-model="inform.AllNum" class="inline-input"></el-input></el-form-item>
                            <el-form-item label="使用数量"><el-input v-model="inform.UseNum" class="inline-input"></el-input></el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button class="" type="success" @click="confirmEdit()">提交记录</el-button>
                        </div>

                    </el-dialog>
                </div>
                <div class="line_right_bottom">
                    <table class="tableCon">
                        <tr>
                            <th>备品名称</th>
                            <th>型号</th>
                            <th>库存数量</th>
                            <th>占比例</th>
                        </tr>
                        <tr v-for="product in products">
                            <td>{{product.name}}</td>
                            <td>{{product.size}}</td>
                            <td>{{product.allNum}}</td>
                            <td>{{product.useNum}}</td>
                        </tr>
                    </table>

                </div>
            </div>
            <div class="clearfix"></div>
        </div>
</template>
<script>
    export default {
        data() {
            return {
                //时间选择器
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                value1: '',
                dialogVisible: false,
                dialogVisible01: false,
              dialogVisibleDetail:false,
              //左边
                table:[
                  {title:'C21型冷水机', place:'3#楼3层走廊01点', person:'张三', time:'2017.02.01 14:00'},
                ],
                detail:{title:'', place:'', person:'', time:''},
              //右边
                products:[
                    { name:'喷淋头',size:'3*10cm',allNum:'168',useNum:'12%'},
                    { name:'喷淋头',size:'3*10cm',allNum:'168',useNum:'12%'},
                ],
                //这里是不是初始化的意思
                form:{Title:'', Place:'', Person:'', Time:'', Detail:''},
                inform:{Namename:'', Size:'', AllNum:'', UseNum:''}
            }
        },
      mounted(){

      },
        methods: {
            //新增维修记录 提交记录
            confirmEdit01(){
//                var vm = this;
                var form={
                    title:this.form.Title,
                    place:this.form.Place,
                    person:this.form.Person,
                    time:this.form.Time,
//                    detail:this.form.Detail
                };
                this.table.push(form);
              this.dialogVisible01 = false;
            },
            //新增设备 提交记录
            confirmEdit(){
                var inform={
                    name:this.inform.Namename,
                    size:this.inform.Size,
                    allNum:this.inform.AllNum,
                    useNum:this.inform.UseNum
                };
                this.products.push(inform);
                this.dialogVisible = false;
            },
          //查看详情
          updateusers(index){
            this.detail=this.table[index];
//            this.detail=this.form.Detail[index];
            this.dialogVisibleDetail = true
          },
          detailSuccess(){
            this.dialogVisibleDetail = false
          }
        },
        props:{},
    }
</script>
<style>
    /*公共部分*/
    .row{ margin: 0;}
    #service .el-form--inline .el-form-item{ margin-right: 0;}
    #service .line_left .el-input__icon{ line-height: normal;}
    #service .line_left .el-button--success{ border-radius: 0; padding: 10px 20px;}
    #service .line_left .el-input,.line-right .el-input{ height: inherit}
    /*#service .line_left .el-dialog__wrapper{ overflow: inherit;}*/
    #service .line_left .el-button--warning,#service .line_left .el-button--primary{ border-radius: 0; height: 32px; width: 70px; border: none;}
    #service .line_left .choose{ margin-left: 30px; background: #0090ff; vertical-align: inherit;}
    #service .line_left .additem{ margin-left: 30px; background: #FFA800;}
    /*.additem:hover{ background:#FFA800; }*/
    /*left*/
    #service label{ font-weight: inherit;}
    #service .line_left{  width: 64%;  height: 100%;  font-family: Regular; float: left;}
    #service .line_left .line_left_top{ font-size: 12px; background: #1b1c21; border-radius: 10px;  padding: 27px 0; display: flex;}
    #service .line_left .line_left_top .el-form--inline .el-form-item__content{ vertical-align: baseline;}
    #service .line_left .line_left_top .el-form--inline .el-form-item__content .el-button,.line_right .line_right_top .el-form--inline .el-form-item__content .el-button{ line-height: 0.5;}
    /*#service .line_left .line_left_top .el-form-item__content{ line-height: 32px;}*/
    #service .line_left .line_left_top .demo-form-inline{ display: flex; width: 100%;}
    #service .line_left .line_left_top .demo-form-inline .formSize{ padding:0 30px;  color: #fff;  vertical-align: middle; flex: 1;display: inline-table;}
    #service .line_left .line_left_top .demo-form-inline .block{ padding: 6px 0}
    /*.line_left .line_left_top .demo-form-inline .block el-date-picker .el-input__inner{ width:130px; }*/
    #service .line_left .line_left_top .demo-form-inline .block .demonstration{ display: inline-block; padding: 5px 20px; font-size: 14px; flex: 1;}
    #service .line_left .line_left_bottom{ background: #1b1c21; border-radius: 10px; margin-top: 20px; height: 730px;}
    #service .line_left .el-form-item__label{  color: #fff;}
    #service .line_left .el-form-item{ margin-bottom: 0; border: 0; background: none;}
    #service .line_left .el-dialog.el-dialog--small{  top:10%!important;}
    #service .line_left .el-input__inner{ width: 140px; height: 30px;  background: #000;  border: none; border-radius: 0;color: #fff;}
    #service .line_left .el-dialog__headerbtn{ top: 0!important;}
    /*right*/
    #service .line_right{ float: right; width: 32%;}
    #service .line_right .line_right_top{ font-size: 12px; background: #1b1c21; border-radius: 10px;  padding: 27px 0;}
    #service .line_right .line_right_bottom{ background: #1b1c21; border-radius: 10px; margin-top: 20px; height: 730px;}
    #service .line_right .el-form-item__label{ padding:0 40px; color: #fff;}
    #service .line_right .el-form-item{ margin-bottom: 7px; margin-top: 7px; float: left;}
    /*table*/
    #service .line_left_bottom table{ color: #fff; font-size: 12px ;font-family: Regular; width: 95%; margin: 0 auto;}
    #service .line_left_bottom table.tableCon tr th{ width: 20%; line-height: 65px; text-align: center; border-bottom: 1px solid #636363; }
    #service .line_left_bottom table.tableCon tr td{ width: 20%; line-height: 40px; text-align: center; border-bottom: 1px solid #636363;}
    #service .line_right_bottom table{ color: #fff; font-size: 12px ;font-family: Regular; width: 95%; margin: 0 auto;}
    #service .line_right_bottom table.tableCon tr th{ width: 20%; line-height: 65px; text-align: center; border-bottom: 1px solid #636363; }
    #service .line_right_bottom table.tableCon tr td{ width: 20%; line-height: 40px; text-align: center; border-bottom: 1px solid #636363;}
    /*弹框左边*/
    #service .line_left .el-dialog{ background: #212226; border-radius: 10px; left: 0; width: 650px;}
    #service .line_left .el-dialog.el-dialog--small{ width: 37%; padding: 20px; top:0;}
    #service .line_left .el-dialog .el-dialog__header{ padding: 0; border-bottom: 1px solid rgb(121, 121, 123); line-height: 40px;}
    #service .line_left .el-dialog .el-dialog__title{ color: #fff; font-family: Regular; font-size: 14px; padding: 0 20px;}
    #service .line_left .el-dialog .el-form-item__label{ padding: 0; line-height: 40px; margin-right: 20px; width: 100px;}
    #service .line_left .el-dialog .el-input__inner{width: 200px; height: 30px;  background: #000;  border: none; border-radius: 0;color: #fff;}
    #service .line_left .el-input{width: inherit;}
    #service .line_left .el-textarea{width: 80%;}
    #service .line_left .sendTo{ margin: 20px 0 50px 0;}
    /*.line_left .el-form-item__content{ line-height: 40px;}*/
    #service .line_left .el-dialog .el-form .el-form-item{ margin-bottom: 10px;}
    #service .line_left .el-dialog .el-form .areatext .el-textarea__inner{ width: 100%; height: 200px; background: #000; border: none;outline: none; color: #fff;}
    #service .line_left .el-dialog .dialog-footer{ text-align: center;}
    /*.line_left .el-dialog .dialog-footer .el-button--success{ width: 200px; height: 30px; border-radius: 0;}*/
    /*弹框右边*/
    #service .line_right .el-dialog{ background: #212226; left: 35%; width: 400px; border-radius: 10px;}
    #service .line_right .el-dialog.el-dialog--small{ width: 26.5%; padding: 20px;}
    #service .line_right .el-dialog .el-dialog__header{ padding: 0; border-bottom: 1px solid rgb(121, 121, 123); line-height: 40px;}
    #service .line_right .el-dialog .el-dialog__title{ color: #fff; font-family: Regular; font-size: 14px; padding: 0 20px;}
    #service .line_right .el-dialog .el-form-item__label{ padding: 0; line-height: 40px; margin-right: 20px;}
    #service .line_right .el-input__inner{width: 120px; height: 30px;  background: #000;  border: none; border-radius: 0;color: #fff;}
    #service .line_right .el-form-item__content{ line-height: 32px; display: inline-block;}
    #service .line_right .inline-input .el-input__inner{width: 200px;}
    #service .line_right .el-input{ width: inherit;}
    #service .line_right .el-dialog .el-form .el-form-item{ margin-bottom: 10px;}
    #service .line_right .el-dialog .dialog-footer{ text-align: center;}
    #service .line_right .el-dialog .dialog-footer .el-button--success{ width: 200px; line-height: 0.5; border-radius: 0;}
    #service .line_left .el-form--inline .el-form-item{ height: 32px;/* margin: 7px 0;*/}
    #service .line_right .el-form-item{ margin-bottom: 0; border: 0; background: none; margin-left: 30px;}
    #service .line_right .el-button--warning,.line_right .el-button--primary{ border-radius: 0; height: 32px; width: 70px; border: none;}
    #service .line_right .el-dialog__headerbtn{ top: 0!important;}
</style>
