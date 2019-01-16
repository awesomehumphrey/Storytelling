<template>
  <div>
    <b-button variant="outline-primary" size="sm" @click="clicked">
      <i class="fas fa-step-backward"></i>Prev
    </b-button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    clicked() {
      this.$emit("clickedPrevious");
    }
  }
};
</script>

<style scoped>
</style>


