<template>
  <div id="head_top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <section class="head_goBack" v-if="goBack" @click="$router.go(-1)"></section>

  </div>
</template>
<script>

</script>
<style>

</style>
