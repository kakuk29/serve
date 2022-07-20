<template>
    <div>
        <h3>mon Composant {{ msg }}</h3>
        <ul>
            <li v-for="unarticle in articles" v-bind:key="unarticle">
                {{ unarticle }}
            </li>
        </ul>

    </div>
</template>
<script>
    export default {
        name: 'monCompo01',
        data() {
            return {
                msg: '',
                articles: [
                    'velo',
                    'bus',
                    'train'
                ]
            }
        }
    }
</script>

<style scoped>
    h3 {color: #2c5034;}
    ul {width: 300px;}
</style>


