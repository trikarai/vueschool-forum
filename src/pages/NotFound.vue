<template>
  <div class="col-full text-center">
    <h1>404 not found</h1>
    <router-link :to="{ name: 'Home' }">Home </router-link>
  </div>
</template>

<script>
export default {
  created() {
    this.$emit("ready");
  },
};
</script>

<style>
</style>