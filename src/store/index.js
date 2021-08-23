import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);

/*
*  Import store modules from child directory
* */

import purchaseStore from "@/store/modules/purchaseStore";
import purchaseItemStore from "@/store/modules/purchaseItemStore";
import departmentStore from "@/store/modules/departmentStore";
import userStore from "@/store/modules/userStore";
import vendorStore from "@/store/modules/vendorStore";
import purchaseStatusStore from "@/store/modules/purchaseStatusStore";

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        purchaseStore,
        vendorStore,
        purchaseStatusStore,
        departmentStore,
        purchaseItemStore,
        userStore
    }
})