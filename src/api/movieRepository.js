export default $axios => ({
    getMovies (params) {
        return $axios.get('https://raw.githubusercontent.com/getmanfred/codechallenges/main/vue/movies.json', { params })
    }
})
