import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'


const store = createStore({
    state() {
        return {
            nom: 'Dupond',
            prenom: 'Jean',
            age: 25
        }
    },
    getters: {
        fullName: (state) => {
            return `${state.prenom} ${state.nom} âgé de ${state.age} ans`
        }
    },
    mutations: {
        /*
        L'objectif des mutations est d'apporter des modifications atomiques à l'état du store.
        Chaque mutation doit contenir un nombre reduit de modifications,
        le moin de logique possible et doit absolument s'executer de maniere synchrone.
        On va privilégier le fait de toujour éxécuter (commit) les mutation a l'i
        mutation ont seulemnt le state et le payload.
        */
        incrementAge(state) {
            state.age++
        },
        AJOUTE_X(state,payload) {
            state.age += payload
        }
    },
    actions: {
        /*
        les action contiennent la logique du store,
        sont appelés par les composants, et surtout
        coordonnent avec les appels aux mutations
        et d'éventuels appels asynchrones.
        */
        updateAge(context,x) {
            context.commit('incrementAge')
            context.commit('AJOUTE_X',x)
        }
    }
});

createApp(App).use(store).use(router).mount("#app");
