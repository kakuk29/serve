<template>
  <div>
    <h3>mon Composant {{ msg }}</h3>
    <button @click="getDatas">recup donnée</button>
    <div v-for="article in articles" v-bind:key="article.id">
      <h3>{{ article.id }}. {{ article.title }}</h3>
        <p>{{ article.body }}</p>
      <hr>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "monCompo03",
  data(){
    return {
      msg: "03",
      articles: {},
    };
  },
  methods: {
    getDatas() {
      axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
        this.articles = response.data;
      });
    },
  },
};
</script>

<style scoped>
h3 {
  color: #2c5034;
}
ul {
  width: 300px;
}
</style>
