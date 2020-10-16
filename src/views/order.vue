<template>
    <div id="app">
        <van-nav-bar
            title="订单"
        />
        
        <van-tabs>
            <van-tab v-for="(tag,index) in tabs" :title="tag" :key="index"> 
                <van-cell-group v-for="item in order"  v-if="item.status === tag || tag === '全部订单'" :key="item.id" >
                    <van-cell v-for="ordL in item.orderLines" 
                        :title="ordL.product.name" 
                        :value="item.status" 
                        :key="ordL.product.id"
                        @click="toOpenPayDialog(ordL,ordL.product)"
                        is-link/>
                    
                </van-cell-group>
            </van-tab>
        </van-tabs>
        <!-- 模态框 -->
        <van-dialog v-model="show" title="支付订单" 
            confirmButtonText="支付"
            cancelButtonText="取消支付"
            @confirm="toPay(orderData,product)"
            show-cancel-button>
            <!-- 所支付的订单信息 -->
            <van-card
            :price="orderData.price"
            :desc="product.description"
            :title="product.name"
            :num="orderData.number"
            >
            <template #thumb>
                <van-image
                width="100%"
                height="100%"
                fit="contain"
                :src="product.photo"
                />
            </template>
            <template #footer>
                <span>共:{{orderData.price*orderData.number}}</span>
            </template>
            </van-card>
            <van-field v-model="orderbeizhu" label="订单备注"  placeholder="请输入订单备注"/>
        </van-dialog>
    </div>
</template>
<script>
    import {mapState,mapActions} from 'vuex'
    export default{
        data(){
            return {
               tabs:["全部订单","待支付","待评价","已完成"],
               show:false,
               orderData:{},
               product:{},
               orderbeizhu:""
            }
        },

        methods:{
            ...mapActions("order",{
                findOrderByCusId:"findAll",
                toPayMoney:"payMoney"
            }),
            //打开模态框
            toOpenPayDialog(ordL,product){
                console.log(ordL,product)
                this.product=product
                this.orderData=ordL;
                this.show=true;
            },
            toPay(ordL,product){
                var payOrder={
                    orderid:ordL.orderId,
                    customer_id:26,
                    order_name: product.name,
                    order_money:this.orderData.price*this.orderData.number,
                    description:this.orderbeizhu
                }
                console.log(payOrder)
                //支付订单
                this.toPayMoney(payOrder)
            }
            
        },
        created(){
            this.findOrderByCusId();
            
        },
        computed:{
            ...mapState("order",["order"]),
        }

    }
</script>
<style scoped>
</style>