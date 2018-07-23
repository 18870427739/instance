<template>
  <div class="hello">
    <div>
      <!--使用vuex管理工具对数据进行管理-->
      <h1>{{msg}}</h1>
      {{mapMutations}}
      <input type="text" v-model="mapMutations">
      <br>
      李文林{{mappings}}<!--函数也可以数据绑定-->
      <div @click="mappings()">map Mutations</div>
      <router-link to="./hellovue">跳转到helloVue</router-link>
    </div>
    <!--表单事件-->
    <form>
      <input type="text" v-model="time">
      <button @click.prevent="SubmitForm()">提交</button>
      <!--@click.prevent防止表单刷新-->
      </form>
      <!--插槽slot-->
  <navigation-link :url="url">
    Your Profile
  </navigation-link>
    <button @click="pathHelloVue()">pathHelloVue</button>
  </div>
</template>
<script>
 import navigation from './navigation.vue'
 import {mapMutations,mapState}from 'vuex'
export default{
 name: 'HelloWorld',
 data () {
   return {
     url:'/home',
      msg: 'Welcome to  Your Vue.js App',
      mapMutations:'111111',
      time:'have a good time'
    }
  },
  components:{navigationLink:navigation},
/*computed:mapState({
    count:state=>state.count
  }),//一种用法State*/
/*computed: {//计算属性，相当于watch
  reverseMsg: function () {
    return this.msg.split("").reverse().join('')
  },
},*/
  computed:mapState(['count']), //另一种用法传值
  mounted(){
   console.log("mounted");
  },
  updated(){ //当数据更改时触发
     console.log("updated");
   //this.mapMutations='fun'
  this.mapMutations=this.$store.state.shopDetail
  },
  activated(){//和keep-alive 相绑定，页面跳转时触发
    console.log("activated");
    this.mapMutations=this.$store.state.shopDetail
  },
  methods:{
     ...mapMutations([
      'ADD_CART',
    ]),//传参数
     ...mapState([
      'latitude','longitude'
    ]),
    mappings(){
      console.log("mappings");
      this.ADD_CART('welcome to study vuex mapMutations');
      this.mapMutations=this.$store.state.shopDetail
     },
    SubmitForm(){
      console.log('have a good time');
    },
    pathHelloVue(){
      this.$router.push({name:'hellovue',params:{title:'轮播图',time:new Date()}})
    }
  }
}
</script>
<style>
.hello {
  font-size: 14px;
}
h1, h2{
  font-weight: normal;
}
ul{
  list-style-type: none;
  padding: 0;
}
li{
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
