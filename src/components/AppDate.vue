<template>
  <span :title="humanDate">
    {{ diffForHuman }}
  </span>
</template>

<script>
import dayjs from "dayjs";
import revativeTime from "dayjs/plugin/relativeTime";
import localizedDate from "dayjs/plugin/localizedFormat";
dayjs.extend(revativeTime);
dayjs.extend(localizedDate);

export default {
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
  },
  computed: {
    diffForHuman() {
      return dayjs.unix(this.timestamp).fromNow();
    },
    humanDate() {
      return dayjs.unix(this.timestamp).format("LLL");
    },
  },
  methods: {},
};
</script>

<style>
</style>