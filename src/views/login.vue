<template>
    <div class="main">
        
        <div class="login">
            <van-cell-group>
                <van-field v-model="user.username" label="账号" placeholder="请输入用户名" />
                <van-field v-model="user.password"  style="password" label="密码" placeholder="请输入密码" />
            </van-cell-group>
            <van-button type="primary" size="large" @click="login">登录</van-button>
        </div>
    </div>
</template>

<script>
    import {post_json} from  '../http'
    import {setToken,getToken} from '../auth'
    export default{
        data(){
            return {
                user:{
                    type:"customer"
                }
            }
        },

        methods:{
            login(){
                post_json("/user/login",this.user)
                .then((res)=>{
                    // console.log(res)
                    setToken(res.data.token);
                    
                })
                .then(()=>{
                    // 判断token的值是否为空
                    //也就是判断是否有账号和所对应的密码是否正确
                    if(getToken()!=null){
                        this.$router.push("/")
                    }else{
                        alert("账号或密码不正确")
                    }
                })
            }
        }

    }
</script>

<style  scoped>
    .main{
        width: 100%;
        height: 100%;
        margin-top: 30px;
        
    }
    .van-button{
        margin-top: 20px;
    }
    
</style>