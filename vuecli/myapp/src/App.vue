<template>
  <div>
    <!-- Nom: {{ $store.state.nom }} <br>
    Prénom: {{ $store.state.prenom }} <br>
    Age: {{ $store.state.age }} <br> -->

    {{ $store.getters.fullName}}
  </div>
  <router-link to="/">Home </router-link>
  <router-link to="/monCompo01">Compo01 </router-link>
  <router-link to="/monCompo02">Compo02 </router-link>
  <router-link to="/monCompo03">Compo03 </router-link>
  <router-link to="/ghibli">ghibli </router-link>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>