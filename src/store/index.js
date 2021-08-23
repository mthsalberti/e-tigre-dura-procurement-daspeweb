import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);

/*
*  Import store modules from child directory
* */

import purchaseStore from "@/store/modules/purchaseStore";
import purchaseItemStore from "@/store/modules/purchaseItemStore";
export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        purchaseStore,
        purchaseItemStore
    }
})