<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <tabbar></tabbar> -->
    <router-view/>
  </div>
</template>

<script>
import tabbar from './common/tabbar'
export default {
  name: 'App',
  components: {
	"tabbar":tabbar
  },
  
}
</script>

<style>
/* html,body,#app{
  width: 100%;
  height: 100%;
  
} */

</style>
