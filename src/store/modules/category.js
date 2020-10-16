
import {get} from "../../http"


export default{
  namespaced:true,
  state: {
      category:[],
      products:[],
      
      
  },
  mutations: {
    //   重置栏目信息
      setCategory(state,data){
        state.category=data;
      },
      setProByCategory(state,data){
        state.products=data;
      }

  },
  actions: {
      findAll({commit}){
       return  get("/category/findAll")
        .then((res)=>{
            // 将后台返回数据通过提交突变给了category
            commit("setCategory",res.data);
            return res.data
        })
      },
      findProByCategoryId({commit},id){
        return  get("/product/findByCategoryId",{id})
        .then((res)=>{
            // 将后台返回数据通过提交突变给了category
            commit("setProByCategory",res.data);
            return res.data
        })
      }
  }
}
