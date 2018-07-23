const cmp= function (path) {
  return function(resolve){
    require(['@/components/'+path],resolve)
  }
};
export default [
  {
    path:'',
    redirect:'helloWorld'//默认地址跳转
  },
    {
      path: '/helloWorld',
      name: 'HelloWorld',//其一：name用于redirect查找path;其二：name 必须和path的名称相同
      component: cmp("HelloWorld")
    },
    { path:'/hellovue',
      name:'hellovue',
      component:cmp('hellovue')
    },
   {
    path:'/home',
    name:'home',
    component:cmp('home')
   }
  ]
