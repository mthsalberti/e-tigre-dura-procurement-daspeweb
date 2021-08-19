import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1E417B',
                info: '#6C8EBF',
                secondary: '#999999',
                background: '#FAFAFA',
                text: '#596780',
                success: '#26FF26',
                warning: '#FFB570',
            }
        }
    }
})