export default {
    install (Vue, options) {
        Vue.prototype.$pagination = (array, pageSize, pageNumber) => {
            const items = array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
            const pages = Math.ceil(array.length / pageSize)

            return {
                page: pageNumber,
                pages,
                next: pageNumber + 1 > pages ? false : pageNumber + 1,
                prev: pageNumber - 1 > 0 ? pageNumber - 1 : false,
                items
            }
        }
    }
}
