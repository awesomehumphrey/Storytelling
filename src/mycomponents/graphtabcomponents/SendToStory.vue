<template>
  <div>
    <br>
    <b-button variant="primary" class="btn-block" size="md" @click="clicked">
      <i class="fas fa-check"></i> Generate Slides
    </b-button>
    <!-- <hr> -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    clicked() {
      this.$emit("clickedDone");
    }
  }
};
</script>

<style scoped>
</style>


