<template>       
    <div class="app-layout">          
        <header class="header">            
        <div>
            <img class="img"  src="../assets/logo.svg"/>
        </div>            
        <div>My shirt shop</div>          
        </header>
            
        <!-- Menu will be here -->          
        <router-view />        
    </div>        
</template>

<style lang="stylus" scoped>
@import '../style/main';
.header {
    .img {
        width: 64px;
        height: 64px;
    }
}
</style>