<template>
    <div>
        <header>商品管理</header>
        <el-button type="success" class="newBtn" @click="showEdit(null)">新增商品</el-button>
        <el-table :data="goods" v-loading="loadGoods" border>
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="category" label="所属分类"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="description" label="商品描述"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column  label="标签">
                <template scope="scope">
                    <el-tag
                    v-for="tag in scope.row.tags"
                  :color="tag.color"
                  close-transition>
                  {{tag.text}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column  label="是否上架">
                <template scope="scope">
                    {{scope.row.online?'上架':'下架'}}
                </template>
            </el-table-column>
            <el-table-column  label="操作">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="showEdit(scope.row,scope.$index)">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total">
        </el-pagination>
        <el-dialog
          title="编辑商品"
          :visible.sync="editVisible"
          size="small">
            <el-form :model="currentGood" label-width="100px" :rules="rules"
                ref="currentGoodForm"
            >
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="currentGood.name"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="categoryId">
                    <el-select v-model="currentGood.categoryId" placeholder="请选择商品分类"
                    >
                    <el-option v-for="ca in categories" :label="ca.text" :value="ca.id"></el-option> 
                </el-select>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input v-model="currentGood.description"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                    <el-input v-model.number="currentGood.price"></el-input>
                </el-form-item>
                <el-form-item label="剩余数量" prop="account">
                    <el-input v-model.number="currentGood.account"></el-input>
                </el-form-item>
                <el-form-item label="是否上线">
                    <el-radio-group v-model="currentGood.online">
                        <el-radio :label="1">上线</el-radio>
                        <el-radio :label="0">下线</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="标签">
                    <el-button size="small" type="primary" @click="addTag">+</el-button>
                </el-form-item>
                <el-form-item
                class="tagItem"
                v-for="(tag , index) in currentGood.tags"
                :prop="'tags.' + index + '.text'"
                :key="tag.key"
                :rules="{
                  required: true, message: '标签名不能为空', trigger: 'blur'
                }">
                    
                    <el-row  :gutter="20">
                        <el-col :span="12">
                            <el-input v-model="tag.text"
                            ></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-color-picker v-model="tag.color"></el-color-picker>
                            <el-button class="deleteTag" type="danger" size="small" icon="delete" @click="deleteTag(tag,index)"></el-button>
                        </el-col>
                    </el-row>
                    
                </el-form-item>
            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveGood">确 定</el-button>
          </span>
        </el-dialog>
    </div>
    
</template>
<script>
import goodsService from '../service/goodsService.js'
import categoryService from '../service/categoryService.js'
    export default {
        mixins: [],
        name: 'goods',
        components: {},
        data() {
            return {
                loadGoods:true,
                goods:[],
                total:0,
                page:1,
                pageSize:10,
                currentGood:{},
                categories:[],
                editVisible:false,
                rules:{
                    name:[
                        { required: true, message: '商品名称不能为空' ,trigger: 'blur'}
                    ],
                    categoryId:[
                        { required: true, message: '请选择商品分类'}
                    ],
                    price:[
                        { required: true, message: '价格不能为空' },
                        { type: 'number', message: '价格必须为数字值' , trigger: 'blur'}
                    ],
                    account:[
                        { required: true, message: '数量不能为空' },
                        { type: 'number', message: '数量必须为数字值' , trigger: 'blur'}
                    ]
                }
            }
            
        },
        mounted (){
            this.getGoodsLits();
            categoryService.getCategories().then(res=>{
                if(res.status===0){
                    this.categories=res.data
                }
            })
        },
        methods: {
            getGoodsLits(){
                goodsService.getGoods(this.page,this.pageSize).then(res=>{
                    if(res.status==0){
                        this.goods=res.data;
                        this.loadGoods=false;
                        this.total=res.total
                    }else{
                        this.$message.error(res.msg);
                        this.loadGoods=false;
                    }
                })
            },
            handleSizeChange(pageSize){
                this.pageSize=pageSize;
                this.getGoodsLits();
            },
            handleCurrentChange(page){
                this.page=page;
                this.getGoodsLits();
            },
            showEdit(goodObj,index){
                if(goodObj){
                    this.currentGood=goodObj
                }
                else{
                    this.currentGood={
                        id:0,
                        categoryId:"",
                        name:"",
                        description:"",
                        price:null,
                        tags:[{
                            id:0,
                            text:'',
                            color:"#000"
                        }],
                        account:0,
                        online:0
                    }
                }
                this.editVisible=true;
            },
            addTag(){
                this.currentGood.tags.push({
                    id:0,
                    text:'',
                    color:"#000"
                })
            },
            deleteTag(tag,index){
                this.$confirm('是否确定删除该菜单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(tag.id===0){
                        this.currentGood.tags.splice(index,1)
                    }else{
                        goodsService.deleteTag(tag.id).then(res=>{
                            if(res.status===0){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.currentGood.tags.splice(index,1)
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                            }
                        })
                    }
                })
                .catch(() => {         
                });
            },
            saveGood(){
                this.$refs.currentGoodForm.validate((valid) => {
                    if (valid) {
                        if(this.currentGood.id===0){
                            goodsService.addGoods(this.currentGood).then(res=>{

                            })
                        }else{
                            goodsService.setGoods(this.currentGood).then(res=>{

                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }

</script>
<style lang="scss">
    .el-tag{
        margin-right:5px;
    }
    .el-pagination{
        margin-top:20px;
        text-align:right;
    }
    .newBtn{
        margin:10px 0;
    }
    .deleteTag{
        vertical-align:super;
    }
    .tagItem{
        margin-bottom:6px;
    }
</style>