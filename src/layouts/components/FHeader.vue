<template>
    <div class="f-header">
        <span class="logo">
            <el-icon class="mr-1">
                <IceTea />
            </el-icon>
            朱朱电商平台
        </span>
        <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
            <Fold  v-if="$store.state.asideWidth=='250px'"/>
            <Expand v-else/>
        </el-icon>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon-btn" @click="handleRefresh">
                <Refresh />
            </el-icon>
        </el-tooltip>
        <div class="ml-auto flex items-center">
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="icon-btn" @click="toggle">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else />
                </el-icon>
            </el-tooltip>
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="repassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <FormDrawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input v-model="form.password" placeholder="请输入新密码" show-password></el-input>
            </el-form-item> <el-form-item prop="repassword" label="确认密码">
                <el-input v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>
            </el-form-item>
        </el-form>
    </FormDrawer>

</template>



<script setup>
import { useFullscreen } from '@vueuse/core'
import FormDrawer from '~/components/FormDrawer.vue'
import { useRepassword, useLogout } from '~/composables/useManager'

const { 
    isFullscreen,//是否全屏状态
    toggle //切换全屏
} = useFullscreen()


const {
    formDrawerRef,
    form,
    rules,
    formRef,
    onSubmit,
    openRepasswordForm
}=useRepassword()

const {
    handleLogout
}=useLogout()


const handleCommand=(c)=>{
    switch(c){
        case 'logout':
            handleLogout()
            break;
        case 'repassword':
            openRepasswordForm()
            break;

    }
}
//处理按钮刷新事件
const handleRefresh=()=>location.reload()
//处理全屏点击事件



</script>

<style>
.f-header{
    @apply flex items-center bg-indigo-700  text-light-50 fixed top-0 left-0 right-0;
    height: 64px;
    z-index: 1000;

}
.logo{
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
}
.icon-btn{
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}
.icon-btn:hover{
    @apply bg-indigo-600
}
.f-header .dropdown{
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5
}
</style>