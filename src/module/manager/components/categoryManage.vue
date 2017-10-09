<template>

	<div>
        <header>菜单管理</header>
        <el-button type="primary" @click="addCategory">新增</el-button>
        <!-- <el-button type="success" @click="saveCategory">保存</el-button> -->
        <div  v-loading="loadList">
            <p v-if="formData.categoryList.length==0" class="categoryTip">暂无数据</p>
            <el-form ref="categoryForm" :model="formData">
                <el-form-item v-for="(category,index) in formData.categoryList" class="rowItem" 
                :key="index"
                :prop="'categoryList.' + index + '.text'"
                :rules="{
                    required: true, message: '菜单名不能为空', trigger: 'blur'
                    }"

                >
                    <el-row :gutter="20">
                        <el-col :span="1">
                            {{category.id}}
                        </el-col>
                        <el-col :span="6">
                            <el-input v-model="category.text" ></el-input> 
                        </el-col>
                        <el-col :span="12" v-if="category.id==0">
                            <el-button  type="success" @click="saveCategory(index)">添加</el-button>
                            <el-button type="default" @click="cancelCategory(index)">取消</el-button>
                        </el-col>
                        <el-col :span="12" v-else>
                            <el-button type="success" @click="saveCategory(index)">修改</el-button>
                            <el-button type="danger" @click="delCategory(index)">删除</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </div>
		
    
	</div>
</template>
<script>
import categoryService from '../service/categoryService'
export default {
    mixins: [],
    name: 'categoryManage',
    components: {},
    data(){
        return {
            formData: {
                categoryList:[
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
        
        categoryService.getCategories().then(res=>{
            if(res.status==0){
                this.formData.categoryList=res.data;
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
        addCategory(){
            if(!this.adding){
                this.formData.categoryList.unshift({
                    id:0,
                    text:""
                })
                this.adding=true
            }
            
        },
        saveCategory(index){
            this.$refs.categoryForm.validate((valid) => {
              if (valid) {
                this.loadList=true
                if(this.formData.categoryList[index].id==0){
                    //新增菜单
                    categoryService.setCategory({
                        text:this.formData.categoryList[index].text
                    }).then(res=>{
                        if(res.status===0){
                            this.$message({
                                type: 'success',
                                message: '保存成功!'
                            });
                            this.formData.categoryList.splice(index,1)
                            this.formData.categoryList.push(res.data)
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
                    categoryService.modifyCategory({
                        id:this.formData.categoryList[index].id,
                        text:this.formData.categoryList[index].text
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
        delCategory(index){
            var temp=this.formData.categoryList[index];
            
            this.$confirm('是否确定删除该菜单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
                this.loadList=true
                categoryService.deleteCategory(temp.id).then(res=>{
                    if(res.status==0){
                        this.formData.categoryList.splice(index,1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                    this.loadList=false
                })
                
                
                
            }).catch(() => {         
            });
        },
        cancelCategory(index){
            this.formData.categoryList.splice(index,1)
            this.adding=false
        }
    }
}

</script>
<style type="text/css">
    .categoryTip{
        margin: 25px;
        color: #666
    }
</style>