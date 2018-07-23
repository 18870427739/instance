(function(doc,win){
  const resize="orientationchange" in window ?"orientationchange":"resize";
  const obj=function(){
    const innerWidth=window.innerWidth;
    if(!innerWidth) return;
    doc.documentElement.style.fontSize=innerWidth/10+"px"
  };
  win.addEventListener(resize,obj,false);
  win.addEventListener("DOMContentLoaded",obj,false)
})(document,window);
