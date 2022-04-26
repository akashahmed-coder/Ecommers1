
import  React,{ createContext , useState,useEffect } from 'react';
import ProductsApi from './api/ProductsApi';
import UserApi from './api/UserApi';
import axios from 'axios'
import CategoryApi from './api/CategoryApi';

export const GlobleState = createContext()

export const DataProvider = ({children})=>{
   const [token,setToken] = useState(false)
   
   const refreshToken = async () => {
     const token = await axios.get('/user/refresh_token')
     localStorage.setItem("token",JSON.stringify(token.data.accessToken))
    setToken(JSON.parse(localStorage.getItem("token")))
   }
   useEffect(()=>{
     const firstLogin = localStorage.getItem('firstLogin')
     if(firstLogin)refreshToken()
   },[])
   const state = {
     token:[token,setToken],
     productsAPI:ProductsApi(),
     userApi:UserApi(token),
     categoryApi:CategoryApi(token)
   }
return(
  <GlobleState.Provider value={state}>
      {children}
  </GlobleState.Provider>
)
}
