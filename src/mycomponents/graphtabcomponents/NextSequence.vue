<template>
  <div>
    <b-button variant="outline-primary" size="sm" @click="clicked">Next
      <i class="fas fa-step-forward"></i>
    </b-button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    clicked() {
      this.$emit("clickedNext");
    }
  }
};
</script>

<style scoped>
</style>


