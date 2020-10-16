import Vue from 'vue'
import Vuex from 'vuex'
import category from './modules/category'
import order from './modules/order'
import address from './modules/address'

Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    category,
    order,
    address
  }
})
