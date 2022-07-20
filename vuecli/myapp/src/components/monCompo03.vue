<template>
    <div>
        <h3>mon Composant {{ msg }}</h3>
        <button @click="getDatas">recup donnée</button>
        <ul>
            <li v-for="unarticle in articles" v-bind:key="unarticle">
                {{ unarticle }}
            </li>
        </ul>

    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'monCompo03',
        data() {
            axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                    this.articles = response.data
                })
            return {
                msg: '03',
                articles: []
            }
        }
    }
</script>

<style scoped>
    h3 {color: #2c5034;}
    ul {width: 300px;}
</style>


