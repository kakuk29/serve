import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import router from './router'


const store = createStore({
    state() {
        return {
            nom: 'Dupond',
            prenom: 'Jean',
            age: 25
        }
    }, getters: {
        fullName: (state) => {
            return `${state.prenom} ${state.nom} âgé de ${state.age} ans`
        }
    }, mutations: {
        incrementAge(state) {
            state.age++
        }
    }
})

createApp(App).use(store).use(router).mount('#app')