/*let routerMode="history";*/
let routerMode = 'hash';
let baseUrl='';
let imgBaseUrl='';
if(process.env.NODE_PATH==='development'){
  imgBaseUrl='/img/'
}
else if(process.env.NODE_PATH==='production'){
  baseUrl='//elm.cangdu.org';
  imgBaseUrl='//elm.cangdu.org/img'
}
//mode=history||hash
export {
  routerMode,
  baseUrl,
  imgBaseUrl
}
