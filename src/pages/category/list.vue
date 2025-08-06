<template>
    <el-card shadow="never" class="border-0">
        <ListHeader @create="handleCreate" @refresh="getData" />
        <el-tree :data="tableData" :props="{label:'name',children:'child'}" v-loading="loading"
            node-key="id">
            <template #default="{ data }">
                <div class="custom-tree-node">
                    <span>{{ data.name }}</span>
                    <div class="ml-auto content">
                        <el-button type="primary" size="small" @click="openGoodsGrawer(data)"
                        :loading="data.goodsDrawerLoading" text>推荐商品</el-button>
                        <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"
                            @change="handleStatusChange($event, data) " >
                        </el-switch>
                        <el-button type="primary" size="small" @click.stop="handleEdit(data)" text>修改</el-button>
                        <el-popconfirm title="是否要删除该记录?" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="handleDelete(data.id)">
                            <template #reference>
                                <el-button type="primary" size="small" text>删除</el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </div>
            </template>
        </el-tree>

        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="form.name" placeholder="分类名称"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
        <GoodsDrawer ref="GoodsDrawerRef"></GoodsDrawer>
    </el-card>
</template>

<script setup>
import { ref } from 'vue'
import ListHeader from '~/components/ListHeader.vue'
import IconSelect from '~/components/iconSelect.vue'
import { getCategoryList, createCategory, updateCategory, 
    updateCategoryStatus, deleteCategory } from "~/api/category.js"
import FormDrawer from '~/components/FormDrawer.vue'
import { useInitTable, useInitForm } from '~/composables/useCommon.js'
import GoodsDrawer from './components/GoodsDrawer.vue'

const {
   loading,
   tableData,
   getData,
    handleStatusChange,
    handleDelete
}=useInitTable({
    getList: getCategoryList,
    onGetListSuccess:(res)=>{
        tableData.value = res.map(o=>{
            o.goodsDrawerLoading=false
            return o
        })
    },
    delete: deleteCategory,
    updateStatus: updateCategoryStatus
})


const {
    formDrawerRef,
    formRef,
    form,
    rules,
    editId,
    drawerTitle,
    handleSubmit,
    resetForm,
    handleCreate,
    handleEdit,
} = useInitForm({
    form: {
        name:'',
    },
    rules: {
    },
    getData,
    update: updateCategory,
    create: createCategory
})

const GoodsDrawerRef=ref(null)
const openGoodsGrawer=(data)=>GoodsDrawerRef.value.open(data)

</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
}
.el-tree-node__content{
    padding: 20px 0;
}
</style>