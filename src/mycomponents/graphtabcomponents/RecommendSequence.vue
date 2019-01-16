<template>
  <div>
    <hr>
    <b-button class="btn-block" variant="outline-primary" size="md" @click="clicked">
      <i class="fas fa-play"></i> Recommend sequence
    </b-button>
    <br>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    clicked() {
      this.$emit("clickedRecommendSequence");
    }
  }
};
</script>

<style scoped>
</style>


