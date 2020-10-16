<template>
    <div id="app">
        <van-nav-bar
            title="购物车"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-checkbox-group v-model="result" icon-size="16px">
            <div v-for="item in order" v-if=" item.status === '待支付' " :key="item.id">
                <div v-for="ord in item.orderLines" :key="ord.id">
                <van-checkbox :name="item.id" @click="selectOrd(item.total,item.id)">
                    <van-card
                    :num="ord.number"
                    :price="ord.price"
                    :title="ord.product.name"
                    :desc="ord.product.description"
                    
                    >
                    <template #thumb>
                        <van-image
                        width="100%"
                        height="100%"
                        fit="contain"
                        :src="ord.product.photo"
                        />
                    </template>
                    <template #footer> 
                        共： {{item.total}} ￥
                    </template>
            
                </van-card>
                <hr/> 
                </van-checkbox>
                </div>
            </div>
            
        </van-checkbox-group>
        
        <!-- 购物车结算 -->
        <van-submit-bar :price="allTotal*100" button-text="提交订单" @submit="onSubmit" />

    </div>
</template>
<script>
    import {mapState,mapActions} from 'vuex'
    export default{
        data(){
            return {
               result:[],
               show:false,
               ordId:[],
               allTotal:0,
               orderbeizhu:"",
              
               
            }
        },

        methods:{
            ...mapActions("order",{
                findOrderByCusId:"findAll",
                toPayMoney:"payMoney"
            }),
            toPay(ord,product){
                var payOrder={
                    orderid:ord.orderLines[0].orderId,
                    customer_id:26,
                    order_name: product.name,
                    order_money:ord.total,
                    description:this.orderbeizhu
                }
                //支付订单
                this.toPayMoney(payOrder)
            },
            //返回到首页
            onClickLeft(){
                this.$router.push("/")
            },
            selectOrd(total,id){
                if(!this.ordId.includes(id)){
                    this.ordId.push(id);
                    this.allTotal+=total;
                }else{
                    var index=this.ordId.indexOf(id)
                    this.ordId.splice(index,1)
                    this.allTotal-=total;

                }

                // console.log(this.ordId,this.allTotal)
                
            },
            onSubmit(){
                var payOrderArr=this.order.filter((item)=>{
                    if(this.ordId.includes(item.id)) return 1;
                })
                for(var ele of payOrderArr){
                    this.toPay(ele,ele.orderLines[0].product)
                    console.log(this.result,this.ordId)
                    this.allTotal=0;
                }
                this.$toast({
                    message:"订单支付成功",
                    type:"success"
                })
            }
            
        },
        created(){
            this.findOrderByCusId();
            // console.log(this.result);
            
        },
        computed:{
            ...mapState("order",["order"]),
        }

    }
</script>
<style scoped>
    .van-checkbox-group{
        margin-left: 6px;
        margin-right: 6px;
    }
    hr{
        color: aliceblue;
        width: 320px;
    }
    
</style>