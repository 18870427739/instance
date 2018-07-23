<template>
  <div class="hello">
  <slot name="logo">{{flag}}</slot>
 {{value}}
    <p slot="footer" @click="$router.go(-1)">{{time}}</p>
  </div>
</template>
<script>
  import {getStore} from '../config/mUnits'
  export default {
       data(){
         return {
            value:getStore(),
             flag:'lagetvd',
             time:new Date()
         }
       }
  }
</script>
<style>

</style>
