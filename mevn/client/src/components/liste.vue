<template>
  <header>
    <div id="header">
      <h1>{{ title }}</h1>
    </div>
  </header>
  <main>
    <h3>
        <button @click="getDatas">recup donnée</button>
    </h3>
  </main>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: "liste",
  data() {
    return {
        title: "liste",
        liste: {}
    };
  },
  methods: {
    getDatas() {
      fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
    },
  },
};
</script>
