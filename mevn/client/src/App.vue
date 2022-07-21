<template>
        <router-link to="/">nom du site </router-link>
        <router-link to="/liste">liste</router-link>
        <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#header {
  height: 50px;
  border: 1px black solid;
}
#main {
  height: 500px;
  border: 1px black solid;
}
</style>
