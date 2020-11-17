import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import repositories from './api/repository'
import pagination from './plugins/pagination'

Vue.config.productionTip = false
Vue.use(repositories, { axios })
Vue.use(pagination)

new Vue({
    render: h => h(App)
}).$mount('#app')
