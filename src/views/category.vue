<template>
    <div>
        <!-- 导航栏 -->
        <van-nav-bar
        title=""
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    
        />
        <!-- 全部服务 -->
        <van-row>
            <van-col span="8">
                <van-sidebar v-model="activeKey" >
                    <!-- 一级栏目 -->
                    <van-sidebar-item
                        
                        v-for="(item,index) in category" 
                        :title="item.name" 
                        :key="index"
                        @click="onChange(index)"
                        :id="index"
                        v-trigger="activeKey"   
                    >  
                    </van-sidebar-item>  
                </van-sidebar> 
            </van-col>
            <van-col span="16">
                <!-- 一级栏目下产品 -->
                <van-grid  :column-num="1" :border="false" icon-size="120px">
                    <van-grid-item v-for="item in products"
                    :key="item.id" :icon="item.photo" :text="item.name" 
                    :to="{path:'/productDetails',query:{curPro:item}}"
                    />    
                </van-grid>
            </van-col>
        </van-row> 
        

        
    </div>
</template>>

<script>
    import {mapState,mapActions} from "vuex"
    export default{
        data(){
            return {
                activeKey:0,
                
                
            }
        },
        created(){
            
            this.activeKey=this.$route.params.id-1
        },
        computed:{
            ...mapState("category",["category","products"])
        },
        methods:{
            ...mapActions("category",{
                categoryFindAll:"findAll"
            }),
            ...mapActions("category",["findProByCategoryId"]),
            onChange(data){
                
                this.findProByCategoryId(data+1)
                
                
            },
            onClickLeft(){
                this.$router.go(-1);
            }
        },
        directives: {
            
            trigger: {
                // 指令的自定义
                // 对dom元素的绑定事件进行自动执行操作
                inserted: function (el,binding) {
                    // console.log(binding.value)
                     el.id==binding.value?el.click():null
                    
                }
             }
        }
    }
</script>

<style scoped>
  
</style>