<template>
  <div>
    <b-button variant="outline-warning" class="btn-block" size="md" @click="clicked">
      <i class="fa fa-remove"></i> Clear edges
    </b-button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    clicked() {
      this.$emit("clickedRestoreDefaultEdges");
    }
  }
};
</script>

<style scoped>
</style>


