<template>
  <router-view/>
</template>

<script>
export default {
name: 'App',
  setup() {
    document.getElementById('loadingPage').remove()
  }
}
</script>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
</style>
