import MovieRepository from './movieRepository'

export default {
    install (Vue, { axios }) {
        Vue.prototype.$repositories = {
            movie: MovieRepository(axios)
        }
    }
}
