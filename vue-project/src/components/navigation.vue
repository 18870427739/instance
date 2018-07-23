<template>
  <a :href="url" class="nav-link">
  <slot>具名插槽</slot>
  </a>
</template>
<script>
export default{
  props:{
    url:{
      type:String,
      default:null
    }
  }
}
</script>
<style>

</style>
