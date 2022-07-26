<template>
  <header>
    <div id="header">
      <h1>{{ title }}</h1>
    </div>
  </header>
  <main>
    <button @click="getDatas"></button>
    <div v-for="membre in membres" v-bind:key="membre._id">
      <h3>{{ membre.firstname }} {{ membre.lastname }}</h3>
      {{ membre.mail }}
    </div>
  </main>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: "membre",
  data() {
    return {
      title: "liste des membres",
      membres: {},
    };
  },
  methods: {
    getDatas() {
      fetch("http://localhost:8080/users")
        .then((response) => response.json())
        .then((data) => {
          this.membres = data;
        }
      );
    },
  },
};
</script>
