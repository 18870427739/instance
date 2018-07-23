<template>
<div class="app" >
<transition name="router-fade" mode="out-in">
  <keep-alive>
 <!-- 使用keep-Alive 可以缓存数据 用 activated 触发 deactivated 结束
      但使用keep-Alive 的同时也屏蔽了mounted 和 created 缓存，所以辨别使用-->
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
</transition>

  <transition name="router-fade" mode="out-in">
 <router-view v-if="!$route.meta.keepAlive"></router-view>
  </transition>
</div>
</template>
<script>
export default {
  name: 'App',
  updated(){
  }
}
</script>
<style>

</style>
