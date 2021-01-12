<template>
  <div>
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <!-- <img v-lazy="image" /> -->
          
            <van-image
              width="100%"
              height="100%"
              lazy-load
              :src="image"
            />
          
        </van-swipe-item>
      </van-swipe>

      <van-grid  :column-num="2">
        <van-grid-item 
          v-for="item in category"
          :key="item.id"
          :to="'/category/'+item.id">
        <van-image :src="item.icon" />
      </van-grid-item>
      </van-grid>
      
  </div>
</template>

<script>
  import {mapState,mapActions} from "vuex"
import categoryVue from './category.vue';
    export default{
      data(){
        return {
          active:0,
          images:["http://39.106.42.14/gesheimg/lunbo01.jpg",
                  "http://39.106.42.14/gesheimg/lunbo02.jpg"  
          ]
          
        }
      },
      methods:{
        ...mapActions("category",{
                categoryFindAll:"findAll"
            }),
        
      },
      created(){
        this.categoryFindAll();
        
      },
      computed:{
        ...mapState("category",['category'])
      }
    }
  </script>

<style scoped>
  .van-swipe{
    margin: 10px;
  }
  
</style>