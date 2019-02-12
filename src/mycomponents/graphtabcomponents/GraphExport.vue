<template>
  <div>
    <br>
    <b-button variant="primary" class="btn-block" size="md" @click="clicked">
      <i class="fa fa-download"></i> Download graph
    </b-button>
   <!--  <hr> -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    clicked() {
      this.$emit("clickedExport");
    }
  }
};
</script>

<style scoped>
</style>


