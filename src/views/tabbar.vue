<template>
    <div id="app">
        <van-tabbar v-model="active" route>
            <van-tabbar-item icon="home-o" replace to="/">主页</van-tabbar-item>
            <van-tabbar-item icon="orders-o" replace to="/order">订单</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o" replace to="/shopcar">购物车</van-tabbar-item>
            <van-tabbar-item icon="manager-o" replace to="/mycenter">我的</van-tabbar-item>
          </van-tabbar>
          
          <router-view></router-view>
    </div>
</template>

<script>
    export default{
      data(){
        return {
          active:0
        }
      },
      
    }
  </script>