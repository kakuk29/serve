<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
  <main>
    <form action="post">
      <input type="text" name="firstname" placeholder="firstname" /><br />
      <input type="text" name="lastname" placeholder="lastname" /><br />
      <input type="text" name="mail" placeholder="mail" /><br />
      <input type="password" name="password" placeholder="password" /><br />
      <input type="submit" value="submit" />
    </form>
  </main>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: "register",
  data() {
    return {
      title: "Inscription",
    };
  },
  methods: {
    register() {
      fetch("localhost:8080/user/register")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    },
  },
};
</script>
`;
