<template>       
    <div class="app-layout">          
        <header class="header">            
        <div>
            <img class="img"  src="../assets/logo.svg"/>
        </div>            
        <div>My shirt shop</div>          
        </header>      
        <NavMenu />
        <router-view></router-view>        
    </div>        
</template>

<script>
import NavMenu from './NavMenu'
export default {
    components: {
        NavMenu
    }
}
</script>

<style lang="stylus">
@import "../style/main"

.header {
    .img {
        width: 64px;
        height: 64px;
    }
}
</style>