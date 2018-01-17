<template>

	<div>
        <header>桌号设置</header>
        <el-button type="primary" @click="addDesk" size="small">新增</el-button>
        <div  v-loading="loadList">
            <p v-if="formData.deskList.length==0" class="deskTip">暂无数据</p>
            <el-form ref="deskForm" :model="formData">
                <el-form-item v-for="(desk,index) in formData.deskList" class="rowItem" 
                :key="index"
                :prop="'deskList.' + index + '.name'"
                :rules="{
                    required: true, message: '桌名不能为空', trigger: 'blur'
                    }"

                >
                    <el-row :gutter="20">
                        <el-col :span="1">
                            {{desk.id}}
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="desk.name" ></el-input> 
                        </el-col>
                        <el-col :span="12" v-if="desk.id==0">
                            <el-button  type="success" @click="saveDesk(index)" size="small">添加</el-button>
                            <el-button type="default" @click="cancelDesk(index)" size="small">取消</el-button>
                        </el-col>
                        <el-col :span="12" v-else>
                            <el-button type="success" @click="saveDesk(index)" size="small">修改</el-button>
                            <!-- <el-button type="danger" @click="delDesk(index)" size="small">删除</el-button> -->
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </div>
		
    
	</div>
</template>
<script>
import deskService from '../service/deskService'
export default {
    mixins: [],
    name: 'deskManage',
    components: {},
    data(){
        return {
            formData: {
                deskList:[
                ]
            },
            loadList:false,
            adding:false
        }
    },
    activated(){
        var that=this
        this.$nextTick(()=>{
            this.loadList=false;
        })
    },
    mounted(){
        
        deskService.getDesks().then(res=>{
            if(res.status==0){
                this.formData.deskList=res.data;
                this.loadList=false
            }else{
                this.$message.error(res.msg);
            }
            return {
                key:"value"
            }
        }).then(res=>{
            console.log(res)
        })
    },
    methods:{
        addDesk(){
            if(!this.adding){
                this.formData.deskList.unshift({
                    id:0,
                    name:""
                })
                this.adding=true
            }
            
        },
        saveDesk(index){
            this.$refs.deskForm.validate((valid) => {
              if (valid) {
                this.loadList=true
                if(this.formData.deskList[index].id==0){
                    //新增菜单
                    deskService.setDesk({
                        name:this.formData.deskList[index].name
                    }).then(res=>{
                        if(res.status===0){
                            this.$message({
                                type: 'success',
                                message: '保存成功!'
                            });
                            this.formData.deskList.splice(index,1)
                            this.formData.deskList.push(res.data)
                            this.adding=false
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                        this.loadList=false
                    })
                    .catch(res=>{
                        this.loadList=false
                    })
                }else{
                    //修改菜单
                    deskService.modifyDesk({
                        id:this.formData.deskList[index].id,
                        name:this.formData.deskList[index].name
                    }).then(res=>{
                        if(res.status===0){
                            this.$message({
                                type: 'success',
                                message: '保存成功!'
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                        this.loadList=false
                    })
                    .catch(res=>{
                        this.loadList=false
                    })
                }
                
              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },
        cancelDesk(index){
            this.formData.deskList.splice(index,1)
            this.adding=false
        }
    }
}

</script>
<style type="text/css">
    .deskTip{
        margin: 25px;
        color: #666
    }
</style>