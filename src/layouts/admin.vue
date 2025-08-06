<template>
    <el-container>
        <el-header>
            <FHeader></FHeader>
        </el-header>
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <FMenu></FMenu>
            </el-aside>
            <el-main>
                <FTagList></FTagList>
                <router-view v-slot="{Component}">
                    <transition name="fade">
                        <keep-alive :max="10">
                            <component :is="Component"></component>
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import FMenu from './components/FMenu.vue';
import FTagList from './components/FTagList.vue';
import FHeader from './components/FHeader.vue';

</script>


<style>
.el-aside{
    transition: all 0.2s;
}
.fade-enter-from{
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
}
.fade-enter-to{
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
.fade-leave-from{
    opacity: 1;
}
.fade-leave-to{
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
}
.fade-enter-active,
.fade-leave-active{
    transition: all 0.3s;
}
.fade-enter-active{
    transition-delay: 0.3s ;
}
</style>