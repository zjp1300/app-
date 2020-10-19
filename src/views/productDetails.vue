<template>
    <div>
        <!-- 导航栏 -->
        <van-nav-bar
        :title="curPro.name"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    
        />
        <van-card
            :price="curPro.price"
            :desc="curPro.description"
            :title="curPro.name"
            >
            <template #thumb>
                <van-image
                width="100%"
                height="100%"
                fit="contain"
                :src="curPro.photo"
                />
            </template>
            <template #footer>
                <van-button size="mini" @click="toAdd"><van-icon name="arrow-up"/></van-button>
                <van-tag plain type="primary" >{{curPro.num}}</van-tag>
                <van-button size="mini" @click="toReduce"><van-icon name="arrow-down" /></van-button>
            </template>
     
        </van-card>
          
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="shop-o" text="店铺" />
            <van-goods-action-button
            @click="toAddShopCar"
             color="#be99ff" type="warning" text="加入购物车" />
        </van-goods-action>

        
        
    </div>
</template>>

<script>
    import {mapState,mapActions} from "vuex"
    export default{
        data(){
            return {
               curPro:{} ,
               show:false,
               chosenAddressId:2228
                
            }
        },
        created(){
            
            this.curPro=this.$route.query.curPro;
            this.$set(this.curPro,"num",1)
            console.log(this)
            
        },
        computed:{
            ...mapState("category",["category","products"]),
     
            },
        methods:{
            
            ...mapActions("order",["orderSave"]),
            onClickLeft(){
                this.$router.push({ name: 'category', params: { id:this.curPro.categoryId}});
                // this.$router.go(-1)
            },
            toAdd(){
                ++this.curPro.num
            },
            toReduce(){
                if(this.curPro.num>0) this.curPro.num--
            },
        // 添加购物车
            toAddShopCar(){
                let orderLine={
                    "orderLines[0].price":this.curPro.price,
                    "orderLines[0].number":this.curPro.num,
                    "orderLines[0].productId":this.curPro.id,
                    addressId:2228,
                    customerId:26
                    

                }
                // console.log(orderLine)
                this.orderSave(orderLine)
                .then(()=>{
                    this.$toast({
                        type: 'primary',
                        message: '加入购物车成功',
                        duration: 1000,
                    });
                })
               
            },
        

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
  .van-tag{
      margin-left: 5px;
  }
</style>