<template>
<div>
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">Gravity++</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

  </b-collapse>
</b-navbar>

<b-card no-body>
  <b-tabs card>
    <b-tab title="DATA" active>
      <b-row>
        <b-col col lg="2" class="tabsections" id="datasection1">1 of 4</b-col>
        <b-col col lg="1" class="tabsections" id="datasection2">2 of 4</b-col>
        <b-col col lg="6" class="tabsections" id="datasection3">3 of 4</b-col>
        <b-col col lg="2" class="tabsections" id="datasection4">4 of 4</b-col>
    </b-row>
    </b-tab>
    <b-tab title="STORY">
      Tab Contents 2
    </b-tab>
  </b-tabs>
</b-card>

</div>

</template>

<script>

export default {
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
}

#datasection1 {
  background-color: #42b983;
}

#datasection2 {
  background-color: blue;
}

#datasection3 {
  background-color: #c4c7c5;
}

#datasection4 {
  background-color: #b9428b;
}

</style>
