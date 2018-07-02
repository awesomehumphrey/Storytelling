<template>
<div>
<app-navbar></app-navbar>
<app-tabs></app-tabs>

 
</div>

</template>

<script>
/* eslint-disable */

import NavBar from '@/mycomponents/NavBar';
import Tabs from '@/mycomponents/Tabs';

export default {
      components: {
        'app-navbar':NavBar,
        'app-tabs': Tabs
      },
  data() {
    return {

    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
