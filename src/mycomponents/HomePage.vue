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

.tabsections {
  margin: 5px;
  min-height: 500px;
  border: 1px solid grey;
  border-radius: 2px;
}

.canvas {
  margin: 1px;
  min-height: 500px;
  border: 1px solid grey;
  border-radius: 2px;
}

#datasection1 {
  background-color: #f1f1f1; 
}

#datasection2 {
  background-color: blue;
}

#datasection3 {
  background-color: #f0f0f0;
}

#datasection4 {
  background-color: #b9428b;
}

#dataupload {
  min-height: 100px;
}

#measures {
  min-height: 200px;  
}

#dimensions {
  min-height: 200px;  
}

p {
  
}

</style>
