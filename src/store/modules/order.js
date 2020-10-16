
import {get,post} from "../../http"


export default{
  namespaced:true,
  state: {
      order:[],
      
  },
  mutations: {
    //   重置order信息
      setOrder(state,data){
        state.order=data;
      }

  },
  actions: {
      findAll({commit}){
       return  get("/order/query",{customerId:26})
        .then((res)=>{
            
            var data=res.data.filter((item)=>{
              if(item.status!='待派单'&&item.status!='已接单')
                return item;     
            })
            commit("setOrder",data);
            
        })
      },
      orderSave({dispatch},orderLine){
        return  post("/order/save",orderLine)
        .then(()=>{
            dispatch("findAll")  
        })
      },
      payMoney({dispatch},payOrder){
        return  get("/order/paymoney",payOrder)
        .then(()=>{
            dispatch("findAll")  
        })
      }
      }
  }

