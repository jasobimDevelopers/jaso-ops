<template>
     <div class="authorManage">
        <div id="authorManageL">
            <el-collapse v-model="activeNames">
                    <div class="authorTitle">角色管理</div>
                <el-collapse-item name="1">
                        <template slot="title"><i class="header-icon"></i>总经理</template>
                        <el-checkbox-group v-model="checkList01">
                                <el-checkbox label="最高权限"></el-checkbox>
                                <el-checkbox label="查看工单"></el-checkbox>
                                <el-checkbox label="修改人员信息"></el-checkbox>
                                <el-checkbox label="创建任务"></el-checkbox>
                        </el-checkbox-group>
                </el-collapse-item>
                <el-collapse-item title="ff" name="2">
                        <template slot="title"><i class="header-icon"></i>部门经理</template>
                        <el-checkbox-group v-model="checkList02">
                                <el-checkbox label="最高权限"></el-checkbox>
                                <el-checkbox label="查看工单"></el-checkbox>
                                <el-checkbox label="修改人员信息"></el-checkbox>
                                <el-checkbox label="创建任务"></el-checkbox>
                        </el-checkbox-group>
                </el-collapse-item>
                <el-collapse-item title="dfb" name="3">
                        <template slot="title"><i class="header-icon"></i>保安</template>
                        <el-checkbox-group v-model="checkList03">
                                <el-checkbox label="最高权限"></el-checkbox>
                                <el-checkbox label="查看工单"></el-checkbox>
                                <el-checkbox label="修改人员信息"></el-checkbox>
                                <el-checkbox label="创建任务"></el-checkbox>
                        </el-checkbox-group>
                </el-collapse-item>
                <el-collapse-item title="dfv" name="4">
                        <template slot="title"><i class="header-icon"></i>保安</template>
                        <el-checkbox-group v-model="checkList04">
                                <el-checkbox label="最高权限"></el-checkbox>
                                <el-checkbox label="查看工单"></el-checkbox>
                                <el-checkbox label="修改人员信息"></el-checkbox>
                                <el-checkbox label="创建任务"></el-checkbox>
                        </el-checkbox-group>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div id="authorManageR">
                <el-collapse v-model="activeName">
                        <div class="authorTitle">人员管理</div>
                        <el-collapse-item title="一致性 Consistency" name="1">
                                <template slot="title"><i class="header-icon"></i>张</template>
                                <el-checkbox-group v-model="checkList05">
                                        <el-checkbox label="最高权限"></el-checkbox>
                                        <el-checkbox label="查看工单"></el-checkbox>
                                        <el-checkbox label="修改人员信息"></el-checkbox>
                                        <el-checkbox label="创建任务"></el-checkbox>
                                </el-checkbox-group>
                        </el-collapse-item>
                        <el-collapse-item title="反馈 Feedback" name="2">
                                <template slot="title"><i class="header-icon"></i>李</template>
                                <el-checkbox-group v-model="checkList06">
                                        <el-checkbox label="最高权限"></el-checkbox>
                                        <el-checkbox label="查看工单"></el-checkbox>
                                        <el-checkbox label="修改人员信息"></el-checkbox>
                                        <el-checkbox label="创建任务"></el-checkbox>
                                </el-checkbox-group>
                        </el-collapse-item>
                        <el-collapse-item title="效率 Efficiency" name="3">
                                <template slot="title"><i class="header-icon"></i>王</template>
                                <el-checkbox-group v-model="checkList07">
                                        <el-checkbox label="最高权限"></el-checkbox>
                                        <el-checkbox label="查看工单"></el-checkbox>
                                        <el-checkbox label="修改人员信息"></el-checkbox>
                                        <el-checkbox label="创建任务"></el-checkbox>
                                </el-checkbox-group>
                        </el-collapse-item>
                        <el-collapse-item title="可控 Controllability" name="4">
                                <template slot="title"><i class="header-icon"></i>周</template>
                                <el-checkbox-group v-model="checkList08">
                                        <el-checkbox label="最高权限"></el-checkbox>
                                        <el-checkbox label="查看工单"></el-checkbox>
                                        <el-checkbox label="修改人员信息"></el-checkbox>
                                        <el-checkbox label="创建任务"></el-checkbox>
                                </el-checkbox-group>
                        </el-collapse-item>
                </el-collapse>
        </div>
        <!--left-->
     </div>
</template>
<script>
 export default{
     data() {
         return {
             activeNames: ['1'],
             activeName: '1',
             checkList01: [],
             checkList02: [],
             checkList03: [],
             checkList04: [],
             checkList05: [],
             checkList06: [],
             checkList07: [],
             checkList08: [],
         };
     }
 }
</script>
<style>
        .authorManage{ width: 100%; font-family: Regular;}
        .el-collapse{ border: none; width: 92%; margin: 0 auto;}
        .header-icon{ background: url("../../../images/userpic.png") no-repeat; width: 20px; height: 20px; display: inline-block;vertical-align: middle;  margin: 0 8px;}
        #authorManageL,#authorManageR{ width: 49%; display: inline-block; vertical-align: top; background: #1b1c21; height: 850px; border-radius: 10px;}
        #authorManageL el-collapse,#authorManageR el-collapse{ margin: 0 auto;}
        #authorManageL .el-collapse .authorTitle,#authorManageR .el-collapse .authorTitle{ line-height: 50px; border-bottom: 1px solid #333; margin-bottom: 20px; font-size: 16px;}
        #authorManageR{ margin-left: 1.5%;}
        .el-collapse-item__header{ background-color: #4d5158; color: #fff; border-bottom: 1px solid #41444a;}
        .el-checkbox-group{ margin-left: 25px;}
        .el-checkbox-group .el-checkbox{ margin-right: 25px; color: #fff;}
        .el-checkbox-group .el-checkbox .el-checkbox__input{ margin-right: 8px;}
        .authorManage .el-collapse-item__content{ padding-bottom: 0!important;}
        .authorManage .el-collapse-item__wrap{ background-color: #35383d;}
</style>
