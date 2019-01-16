<template>
  <div>
    <hr>
    <b-button variant="outline-warning" class="btn-block" size="md" @click="clicked">
      <i class="fa fa-remove"></i> Reset
    </b-button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    clicked() {
      this.$emit("clickedRestoreDefault");
    }
  }
};
</script>

<style scoped>
</style>


