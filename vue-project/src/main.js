// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from "vue-router"
import store from "./store"
import  "./resize"
import App from './App.vue'
import routes from './router'
import {routerMode} from './config/env'
import FastClick from"fastclick"
Vue.config.productionTip = false;
//初始化FastClick实例建议在页面的DOM文档加载完成后。
if("addEventListener" in document){
  document.addEventListener("DOMContentLoaded",function(){
    FastClick.attach(document.body)//attach:连接
  })
}
Vue.use(VueRouter);
const router=new VueRouter({
  routes,
  mode:routerMode,
  strict:process.env.NODE_ENV!=='production',
  scrollBehavior(to,from,savePosition){
    if(savePosition){
      return savePosition;
    } else{
      if(from.meta.keepAlive){
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {x:0,y:to.meta.savedPosition||0}
     }

  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
//$mount("#app")相当于el:"#app",挂载
/**
 *  在文档页面(http://localhost:8080/document)拉动滚动条，然后刷新浏览器会发现滚动条依然在原来的位置
 *  这是浏览器的默认行为，会记录浏览器滚动条默认位置。
 *  但是点击浏览器“前进/后退”按钮，会发现当初那个页面的滚动条从0开始了，没有记录上一次滚动条的位置。
 *   现在要求点击浏览器“前进/后退”按钮，页面滚动条要记录上一次的位置，这时需要设置它的的滚动行为。
 *
 *  scrollBehavior(to,from,savePosition){ // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
    console.log(to) // to：要进入的目标路由对象，到哪里去
  *  console.log(from) // from：离开的路由对象，哪里来
 *  console.log(savePosition) // savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
  }
 */
