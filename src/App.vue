<template>
    <div id="app">
        <TableMovies :attributes="['title','genre','year','cast','director','notes']" />
    </div>
</template>

<script>
    import TableMovies from './components/TableMovies.vue'

    export default {
        name: 'App',
        components: {
            TableMovies
        }
    }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
