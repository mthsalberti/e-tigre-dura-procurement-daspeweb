import Vue from "vue";
import VueI18n from "vue-i18n";
// import config from '@/config';
import es from "@/translations/languages/es";
import en from "@/translations/languages/en";

Vue.use(VueI18n);

export default new VueI18n({
    // locale: localStorage.getItem(config.STORAGE_LANGUAGE) ?? 'en',
    locale: 'en',
    messages: {
        en,
        es
    }
});