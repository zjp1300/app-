
import {get, post} from "../../http"


export default{
  namespaced:true,
  state: {
      address:[],
      
  },
  mutations: {
    //   重置order信息
      setAddress(state,data){
        state.address=data;
      }

  },
  actions: {
    findByCustomerId({commit}){
       return  get("/address/findByCustomerId",{id:26})
        .then((res)=>{
            
            commit("setAddress",res.data);
            
        })
      },
      //添加或更新地址
     saveNewAddress({dispatch},newAddress){
        post("/address/saveOrUpdate",newAddress)
        .then(()=>{
           dispatch("findByCustomerId")
        })
      },
      //删除地址
      deleteAddressById({dispatch},id){
        get("/address/deleteById",{id})
        .then(()=>{
          dispatch("findByCustomerId")
        })
      }
  }
}