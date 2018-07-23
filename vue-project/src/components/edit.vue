<template>
  <div class="hello">
   <!-- <router-link :to="$router.back(-1)">点击跳转</router-link>-->
    <div @click="click1()">点击跳转</div>
  </div>
</template>
<script>
export  default{
  data(){
    return{
    }
  },
  methods:{
       click1(){
      console.log(this.$router.back(-1))
    }
  }
}
</script>
<style>

</style>
