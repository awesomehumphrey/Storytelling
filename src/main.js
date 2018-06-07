/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueVega from 'vue-vega';
import Multiselect from 'vue-multiselect'

import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'

export const DataBus = new Vue(); //Event bus for passing data amongst components

Vue.component('multiselect', Multiselect)
Vue.use(BootstrapVue);
Vue.use(VueVega);
Vue.config.productionTip = false;

///* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});