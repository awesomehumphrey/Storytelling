<template>
  <div>
    <b-button variant="outline-warning" class="btn-block" size="md" @click="clicked">
      <i class="fa fa-remove"></i> Clear nodes
    </b-button>
    <br>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    clicked() {
      this.$emit("clickedRestoreDefaultNodes");
    }
  }
};
</script>

<style scoped>
</style>


