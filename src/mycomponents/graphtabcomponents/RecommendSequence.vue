<template>
    <div>
        <hr>
        <b-button class="btn-block" size="md" @click="clicked">Recommend sequence</b-button>
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


