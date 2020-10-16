<template>
    <div id="app">
        <van-nav-bar title="地址管理"  left-arrow 
            @click-left="onClickLeft" @click-right="onClickRight">
            <!-- 地址添加按钮 -->
            <template #right>
                <van-icon name="plus" size="18"/>
            </template>
        </van-nav-bar>
            <!-- 地址列表 -->
        <van-cell v-for="item in address"  :key="item.id" >
        
            <template #title>
                <span>地址：{{item.province+item.city+item.area+item.address}}</span>
            </template>
            <template #right-icon>
                <van-icon name="edit"  size="18" color="#1989fa" @click="toUpdate(item)"/>
                <van-icon name="delete" size="18" color="red" @click="deleteAddress(item.id)"/>
            </template>

        </van-cell>

        <!-- 添加地址模态框 -->
        <van-dialog v-model="show" :title="title" 
            confirmButtonText="添加"
            cancelButtonText="取消"
            @cancel="setEmpty"
            @confirm="toAddOrUpdateAddress"
            show-cancel-button>
            <van-field v-model="newAddress.province" label="所在省"  placeholder="请输入"/>
            <van-field v-model="newAddress.city" label="所在市"  placeholder="请输入"/>
            <van-field v-model="newAddress.area" label="所在地区"  placeholder="请输入"/>
            <van-field v-model="newAddress.address" label="详细地址"  placeholder="请输入街道门牌等信息"/>
            <van-field v-model="newAddress.telephone"  label="手机号" placeholder="请输入"/>
        </van-dialog>
    
    </div>
</template>
<script>
    import {mapState,mapActions} from "vuex"
    export default{
        data(){
            return {
               show:false,
                newAddress:{
                    province:'',
                    city:'',
                    area:'',
                    address:'',
                    telephone:'',
                    customerId:'26'
                },
                title:''

            }
        },
        created(){
            // console.log(this.address)
            this.findByCustomerId()
        },

        methods:{
            ...mapActions("address",["findByCustomerId","saveNewAddress","deleteAddressById"]),

            onClickLeft(){
                this.$router.push("/mycenter")
            },
            onClickRight(){
                //打开模态框
                this.show=true;
                this.title="添加地址"
                
            },
            toUpdate(item){
                this.title="更新地址"
                this.show=true;
                this.newAddress={...item};
                
            },
            // 置模态框为空
            setEmpty(){
                var newAddress={
                        province:'',
                        city:'',
                        area:'',
                        address:'',
                        telephone:'',
                        customerId:'26'
                    };
                    this.newAddress=newAddress
            },
            // 添加或修改地址
            toAddOrUpdateAddress(){
                this.saveNewAddress(this.newAddress)
                .then(()=>{
                    //置模态框为空
                    this.setEmpty();
                    this.$toast({
                        type: 'primary',
                        message: '成功',
                        duration: 1000,
                    });
                })
            },
            // 删除地址
            deleteAddress(id){
                this.deleteAddressById(id)
                .then(()=>{
                     this.$toast({
                        type: 'primary',
                        message: '删除成功',
                        duration: 1000,
                    });
                })
            }
            
        },
        computed:{
            ...mapState("address",["address"])
        }

    }
</script>

<style  scoped>
    .van-icon{
        margin-left: 6px;
    }
</style>
