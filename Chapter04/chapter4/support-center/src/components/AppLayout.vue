<template>
  <div class="app-layout">
    <header class="header">
      <div>
        <img class="img" src="../assets/logo.svg" />
      </div>
      <div>My shirt shop</div>
    </header>
    <NavMenu />
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import NavMenu from "./NavMenu";
export default {
  components: {
    NavMenu
  }
};
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
