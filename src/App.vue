<template>
  <the-navbar />
  <div class="container">
    <router-view v-show="showPage" @ready="onPageReady" :key="`${$route.path}${JSON.stringify($route.query)}`" />
    <AppSpinner v-show="!showPage" />
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import { mapActions } from "vuex";
import NProgress from "nprogress";
export default {
  name: "App",
  components: { TheNavbar },
  data() {
    return {
      showPage: false,
    };
  },
  methods: {
    ...mapActions("auth", ["fetchAuthUser"]),
    onPageReady() {
      this.showPage = true;
      NProgress.done();
    },
  },
  created() {
    this.fetchAuthUser();
    NProgress.configure({
      // speed: 200,
      showSpinner: false,
    });
    this.$router.beforeEach(() => {
      this.showPage = false;
      NProgress.start();
    });
  },
};
</script>

<style>
@import "assets/style.css";
@import "~nprogress/nprogress.css";
#nprogress .bar {
  background: #57ad8d !important;
}
</style>
