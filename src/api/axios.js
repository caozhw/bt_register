import axios from 'axios';

let base = '/api'; 
//let base = 'list/api';  
//let base = process.env.NODE_ENV==='development'?'list/api':'marketing/list/api'; 
// let base = 'http://118.190.132.240/api'

/*let send_code = `${base}send_code`;
let reg = `${base}reg`;
let country = `${base}country`;*/


//获取cookie
function getCookie(cname) {
 let name = cname + "=";
 let ca = document.cookie.split(';');
 for(let i=0; i<ca.length; i++) {
  let c = ca[i];
  while (c.charAt(0)==' ') c = c.substring(1);
  if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
 }
 return "";
}


let cQsxv0_act = getCookie("cQsxv0_act");


const requestApi = (url,params) => {
  let baseUrl = `${base}/${url}`;  
  return axios({
        method:'post',
        url:baseUrl,
        data:params,
        headers:{'token':cQsxv0_act}
    })
  //return axios.post(baseUrl,params)
  .then(res => res.data); 
};

//wap/sign_package

const requestWxApi = (url,params) => {
  //let baseUrl = `list/${url}`; 
  let baseUrl = `/${url}`;   
  return axios({
        method:'post',
        url:baseUrl,
        data:params,
        headers:{'token':cQsxv0_act}
    })
  //return axios.post(baseUrl,params)
  .then(res => res.data); 
};

export {requestApi,requestWxApi}
