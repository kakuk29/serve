<template>
  <div>
    <h3>mon Composant {{ msg }}</h3>
    <button @click="getDatas">recup donnée</button>
    <div v-for="article in articles" v-bind:key="article.id">
      <h4>{{ article.original_title }} / {{ article.title }}</h4>

      <img v-bind:src="article.image" v-bind:alt="article.title" />
      <p>{{ article.description }}</p>
      <p>released in {{ article.release_date }}</p>
      <p>director: {{ article.director }} producer: {{ article.producer }}</p>
      <p>RT scorce: {{ article.rt_score }}</p>

      <h5>list of peoples</h5>
      <div v-for="people in peoples" :key="people.id">
        <a v-bind:href="people.url">{{ people.name }}</a>
      </div>

      <hr />
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: "ghibli",
  data() {
    return {
      msg: "ghibli",
      articles: {},
      peoples: [],
    };
  },
  methods: {
    getDatas() {
      fetch("https://ghibliapi.herokuapp.com/films")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data[0].people);
          this.articles = data;
          const variable = this;
          data.forEach((people) => {
            people.people.forEach((person) => {
              fetch(person)
                .then((response) => response.json())
                .then((data) => {
                  variable.peoples = data;
                });
            });
          });
        });
    },
  },
};
</script>
