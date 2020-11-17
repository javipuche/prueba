<template>
    <div>
        <table>
            <tr>
                <th
                    v-for="attr in attributes"
                    :key="attr"
                    :class="{
                        'is-active' : sortBy === attr,
                        'is-desc' : sortDir === 'desc'
                    }"
                    @click="sort(attr)"
                >
                    {{ attr }}
                </th>
            </tr>
            <tr v-for="movie in movies.items" :key="movie.id">
                <td v-for="attr in attributes" :key="attr.id">
                    {{ movie[attr] }}
                </td>
            </tr>
        </table>
        <div class="pagination">
            <button v-if="movies.prev" @click="goTo(movies.prev)">
                Anterior
            </button>
            <button v-if="movies.next" @click="goTo(movies.next)">
                Siguiente
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TableMovies',
        props: {
            attributes: {
                type: Array,
                default: () => (['title', 'genre'])
            },
            page: {
                type: Number,
                default: 1
            },
            pages: {
                type: Number,
                default: 10
            }
        },
        data () {
            return {
                movies: [],
                data: [],
                sortDir: 'asc',
                sortBy: 'title',
                currentPage: this.page
            }
        },
        async created () {
            const { data } = await this.$repositories.movie.getMovies()
            this.data = data
            this.sort(this.sortBy)
            this.paginate()
        },
        methods: {
            sort (key) {
                if (key === this.sortBy) this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'
                const mod = this.sortDir === 'desc' ? 1 : -1
                this.sortBy = key
                this.data = this.data.sort((a, b) => (a[this.sortBy] === null) - (b[this.sortBy] === null) || +(a[this.sortBy] > b[this.sortBy]) * mod || -(a[this.sortBy] < b[this.sortBy]) * mod)
                this.paginate()
            },
            paginate (page) {
                this.movies = this.$pagination(this.data, this.pages, page || this.currentPage)
            },
            goTo (page) {
                this.paginate(page)
            }
        }
    }
</script>

<style lang="scss">
  table {
    width: 100%;
    overflow-x: auto;
    display: block;
  }

  tr {
    text-transform: uppercase;
    cursor: pointer;

    &:nth-child(even) {
      background-color: #ccc;
    }
  }

  td,
  th {
    padding: 8px 16px;
    text-align-last: left;
    width: calc(100% / 6);
  }

  th {
    &.is-active {
      &::before {
        content: "⬆️";
      }

      &.is-desc {
        &::before {
          content: "⬇️";
        }
      }
    }
  }

  .pagination {
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    grid-gap: 16px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
</style>
