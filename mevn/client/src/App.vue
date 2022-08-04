<template>
    <router-link to="/">nom du site </router-link>
    <router-link to="/liste">liste</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/register">register</router-link>
    <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
header {
  height: 50px;
}
main {
  height: 500px;
}
footer {
  height: 50px;
  background-color: grey;
}
</style>
