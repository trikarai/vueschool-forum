<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea name="" id="" cols="30" v-model="text" rows="10"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit Post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PostEditor",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    save() {
      const post = {
        text: this.text,
      };

      this.$emit("save", { post });

      this.text = "";
    },
  },
};
</script>

<style>
</style>