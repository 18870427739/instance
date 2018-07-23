<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h2>Ecosystem</h2>
    <edit></edit>
  </div>
</template>
<script>
  import edit from './edit.vue'
  export default {
    name: 'Hellovue',
    components:{edit:edit},
    data () {
      return {
        msg: 'hello vue'
      }
    },
    mounted(){
      console.log("mounted");
      console.log(this.$route.params)
    },
    updated(){
      console.log("updated")
    },
    activated(){//keep-alive
      console.log("activated")
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .hello{
    font-size: 14px;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
