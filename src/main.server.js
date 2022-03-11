import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { store } from './store/store';
import { routes } from './routes';
import axios from 'axios';
import Meta from 'vue-meta';
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueSweetalert2);
//axios.defaults.baseURL = "http://localhost/elmtehsil2022";
axios.defaults.baseURL = "https://elmtehsil.com";
Vue.use(Meta);
Vue.use(VueRouter);

export const router = new VueRouter({
  base: '/',
  routes,
  mode: 'history'
})

export default context => {
    return Promise.resolve(
        new Vue({
            router,
            store,
            render: h => h(App)
        })
    );
}
