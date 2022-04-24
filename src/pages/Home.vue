<template>
  <h1 class="push-top">Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>

<script>
import CategoryList from "@/components/CategoryList";

export default {
  components: { CategoryList },
  name: "PageHome",
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>