<template>
  <div v-if="asyncDataStatus_ready" class="container">
    <h1 class="push-top">Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import CategoryList from "@/components/CategoryList";
import { mapActions } from "vuex";
import asynDataStatus from "@/mixins/asyncDataStatus";
export default {
  name: "PageHome",
  mixins: [asynDataStatus],
  components: {
    CategoryList,
  },
  data() {
    return {
      ready: false,
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.items;
    },
  },
  methods: {
    ...mapActions("categories", ["fetchAllCategories"]),
    ...mapActions("forums", ["fetchForums"]),
  },
  async created() {
    const categories = await this.fetchAllCategories();
    const forumIds = categories.map((category) => category.forums).flat();
    await this.fetchForums({ ids: forumIds });
    this.asyncDataStatus_fetched();
  },
};
</script>