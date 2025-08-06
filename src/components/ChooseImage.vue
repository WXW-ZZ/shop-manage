<template>
    <div v-if="modelValue">
        <el-image v-if="typeof modelValue=='string'" fit="cover"
            class="w-[100px] h-[100px] rounded border mr-2"></el-image>
        <div v-else class="flex flex-wrap">
            <div class="relative mx-1 mb-2 w-[100px] h-[100px]" v-for="(url,index) in modelValue" :key="index">
                <el-icon class="absolute right-[5px] top-[5px] cursor-pointer bg-white rounded-full"
                 style="z-index: 10" @click="removeImage(url)">
                    <CircleClose />
                </el-icon>
                <el-image :src="url" fit="cover"
                    class="w-[100px] h-[100px] rounded border mr-2"></el-image>
            </div>
        </div>
    </div>
    <div class="choose-image-btn" @click="open">
        <el-icon :size="25" class="text-gray-500">
            <Plus />
        </el-icon>
    </div>
    <el-dialog title="选择图片" v-model="dialogVisable" width="80%" top="5vh">
        <el-container class="bg-white rounded" style="height:70vh;">
            <el-header class="image-header">
                <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
                <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
            </el-header>
            <el-container>
                <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
                <ImageMain :limit="limit" openChoose ref="ImageMainRef" @choose="handleChoose" />
            </el-container>
        </el-container>
        <template #footer>
            <span>
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script setup>
import { ref} from 'vue';
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import {toast} from '~/composables/util'
const ImageAsideRef = ref(null)
const ImageMainRef = ref(null)
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()

const handleAsideChange = (image_class_id) => ImageMainRef.value.loadData(image_class_id)

const handleOpenUpload = () => ImageMainRef.value.openUploadFile()

const props=defineProps({
    modelValue:[String,Array],
    limit:{
        type:Number,
        default:1
    }
})
const emit=defineEmits(["update:modelValue"])
let urls=[]
const handleChoose=(e)=>{
    urls=e.map(o=>o.url)    
}

const dialogVisable=ref(false)
const submit=()=>{
    let value=[]
    if(props.limit==1){
        value=urls[0]
    }
    else{
        value=[...props.modelValue,...urls]
        if(value.length>props.limit){
            return toast('最多还能选择'+(props.limit-props.modelValue.length)+'张')
        }
    }
    if (value){
        emit("update:modelValue",value)
    }
    close()
}
const open=()=>{
    dialogVisable.value=true
}
const close=()=>dialogVisable.value=false

const removeImage=(url)=>{
    emit("update:modelValue", props.modelValue.filter(u => u != url))
}

</script>



<style>
.choose-image-btn{
    @apply w-[100px] h-[100px] rounded border flex justify-center items-center
    cursor: pointer hover:(bg-gray-100); 
}
.image-header {
    border-bottom: 1px solid #eee;
    @apply flex items-center
}
</style>