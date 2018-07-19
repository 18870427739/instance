  const baseUrl='';
  function fetch(url,type='get',data,method){

    url= baseUrl+url;
    type= type.toLowerCase();
    if(type==='get'){
        let dataStr='';
        Object.keys(data).forEach(function(item){
            dataStr+=item+"="+data[item]+"&"
        });
        if(!dataStr){
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url=url+ '?' +dataStr
        }
    }
    if(window.fetch&&method==='fetch'){
        let requestConfig={
            credentials:'include',
            method:type,
            headers:{
                "Accept":"application/json",
                "Content-Type":'application/json'
            },
            mode:'cors',
            cache:"force-cache"
        };
        if(type==='post') {
            Object.defineProperty(requestConfig,"body",{value:JSON.stringify(data)})
        }
        // resolved:解決 await：等待
        try{
            const response= fetch(url,requestConfig)
            const responseJson=response.json()
            return responseJson
        }catch(error){
            throw new Error(error)
        }
    }
    else{
        return new Promise(function(resolve,reject){
            let requestObj;
            if(window.XMLHttpRequest){
                requestObj=new XMLHttpRequest()
            }else{
                requestObj=new ActiveXObject()
            }
            let sendData='';
            if(type==='post'){
                sendData=JSON.stringify(data)
            }
            requestObj.open(type,url,true)
            requestObj.setRequestHeader("Content-type","application/x-www-form-urlencoded")
            requestObj.send(sendData)
            requestObj.onreadystatechange(function(){
                if(requestObj.readyState==4){
                    if(requestObj.status==200){
                        let obj=requestObj.response;
                        if(typeof obj!=='object'){
                            obj=JSON.parse(obj)
                        }
                        resolve(obj)
                    }
                    else{
                        reject(requestObj)
                    }
                }
            })
        })
    }
}
fetch();
