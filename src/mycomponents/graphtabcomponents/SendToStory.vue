<template>
    <div>
        <br>
        <b-button class="btn-block" size="md" @click="clicked">Done</b-button>   
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


