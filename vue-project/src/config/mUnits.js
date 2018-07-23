export const setStore=function(name,content){
  if(!name) return;
  if(typeof content!=='string'){
    content=JSON.stringify(content)
  }
  window.localStorage.setItem(name,content)
};
export const getStore=function(name){
  if(!name) return;
return window.localStorage.getItem(name)
};
export const removeStore=function(name){
  if(!name) return;
  return window.localStorage.removeItem(name)
};
export const getStyle=function(element,attr,NumberMode='int'){
let target;
if(attr==='scrollTop'){
  target=element.scrollTop;
}else if(element.currentStyle){
 target=element.currentStyle[attr]
}else{
  target = document.defaultView.getComputedStyle(element,null)[attr];
}
  return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
};
export const loadMore=(element, callback)=>{
  let windowHeight=window.screen.height;
  let height;
  let setTop;
  let paddingBottom;
  let marginBottom;
  let requestFram;
  let oldScrollTop;
  document.body.addEventListener('scroll',()=>{
    loadMore()
  },false);
  element.addEventListener('touchstart',()=>{
    height=element.offsetHeight;
    setTop=element.offsetTop;
    paddingBottom=getStyle(element,'paddingBottom');
    marginBottom=getStyle(element,'marginBottom')
  },{passive:true});
  element.addEventListener('touchMove',()=>{
    oldScrollTop=document.body.scrollTop;
   loadMore()
  },{passive:true});
  element.addEventListener('touchend',()=>{
    oldScrollTop=document.body.scrollTop;
    moveEnd()
  },{passive:true});
  const moveEnd=()=>{
    requestFram=requestAnimationFrame(()=>{
      if(document.body.scrollTop!=oldScrollTop){
        oldScrollTop=document.body.scrollTop;
        loadMore();
        moveEnd();
      }
      else{
        cancelAnimationFrame(requestFram);
        height=element.offsetHeight;
        loadMore()
      }
    })
  };
  const showBackFun=()=>{
    if(document.body.scrollTop>500){
      callback(true)
    }else{
      callback(false)
    }
  }
};




