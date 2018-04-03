<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  .form-container {
    padding: 20px 20px 0 0;
  }
  .table-img {
    display: block;
    width: 100px;
    height: 100px;
  }
  .table-container {
    padding: 20px;
  }
  .top-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
</style>
