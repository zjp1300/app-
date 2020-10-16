<template>
    <div id="app">
        <van-nav-bar
        title="个人中心"
        />
        
        <van-cell title="个人信息" is-link  />
        <van-cell title="修改密码" is-link />
        <van-cell title="地址管理" is-link   to="/address"/>          
    </div>
</template>
<script>
    export default{
        data(){
            return {
               
            }
        },

        methods:{
            
        }

    }
</script>
