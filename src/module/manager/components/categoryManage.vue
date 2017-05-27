<template>

	<div>
        <header>菜单管理</header>
        <el-button type="primary" @click="addCategory">新增</el-button>
        <el-button type="success" @click="saveCategory">保存</el-button>
        <div  v-loading="loadList">
        <el-form ref="categoryForm" :model="formData">
            <el-form-item v-for="(category,index) in formData.categoryList" class="rowItem" 
            :key="index"
            :prop="'categoryList.' + index + '.text'"
            :rules="{
                required: true, message: '菜单名不能为空', trigger: 'blur'
                }"

            >
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input v-model="category.text" ></el-input> 
                    </el-col>
                    <el-col :span="12">
                        
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
            loadList:true
        }
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
            this.formData.categoryList.push({
                id:0,
                text:""
            })
        },
        saveCategory(){
            this.$refs.categoryForm.validate((valid) => {
              if (valid) {
                this.loadList=true
                categoryService.setCategory({
                    categoryList:this.formData.categoryList
                }).then(res=>{
                    if(res.status===0){
                        this.$message({
                            type: 'success',
                            message: '保存成功!'
                        });
                        this.formData.categoryList=res.data
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
              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },
        delCategory(index){
            var temp=this.formData.categoryList[index];
            if(temp.id==0){
                this.formData.categoryList.splice(index,1)
            }else{
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
            }
            
        }
    }
}

</script>