var app = new Vue({
  el: '#app',
  data:{
    query: '',
    apiKey: '61494116b9bd09ea4e4a494c360517b8',
    movies: [],
    search: 'movie',
    display: 'none',
    displayBox: 'none',
    indice: 0,
    cast: [],
    genres: [],
    selectedGenres: [],
    topRated: [],
    mostPopular: []
  },
  methods:{
    searchMovie(){
      axios
        .get('https://api.themoviedb.org/3/search/movie',{
          params:{
            api_key: this.apiKey,
            query: this.query,
            language: 'it-IT'
          }
        })
        .then((result)=>{
          this.movies = result.data.results;
          this.display = 'active';
        })
      .catch((error) => alert('errori'));
    },
    searchSerie(){
      axios
        .get('https://api.themoviedb.org/3/search/tv',{
          params:{
            api_key: this.apiKey,
            query: this.query,
            language: 'it-IT'
          }
        })
        .then((result)=>{
          this.movies = result.data.results;
          this.display = 'active';
        })
      .catch((error) => alert('errori'));
    },
    changeMovie(){
      this.search = 'movie';
    },
    changeTvshow(){
      this.search = 'tv';
    },
    showBox(index){
      this.displayBox = 'active';
      this.indice = index;
      // inizio generi
      this.selectedGenres = [];
      for (let i = 0; i < this.movies[this.indice].genre_ids.length; i++) {
        for (let j = 0; j < this.genres.length; j++) {
          if (this.genres[j].id == this.movies[this.indice].genre_ids[i]) {
            this.selectedGenres.push(this.genres[j].name);
          }
        }
      }
      // fine generi
      axios
        .get('https://api.themoviedb.org/3/'+ this.search +'/'+this.movies[index].id+'/credits',{
          params:{
            api_key: this.apiKey,
            language: 'it-IT'
          }
        })
        .then((result)=>{
          this.cast = result.data.cast;
        })
      .catch((error) => alert('errori'));
    },
    closeBox(){
      this.displayBox = 'none';
    }
  },
  mounted(){
    // lista generi movies
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list',{
        params:{
          api_key: this.apiKey,
          language: 'it-IT'
        }
      })
      .then((result)=>{
        this.genres = result.data.genres;
      })
    .catch((error) => alert('errori'));
    // fine lista generi tv shows
    // top rated
    axios
      .get('https://api.themoviedb.org/3/movie/top_rated',{
        params:{
          api_key: this.apiKey,
          language: 'it-IT'
        }
      })
      .then((result)=>{
        this.topRated = result.data.results;
        console.log(this.topRated);
      })
    .catch((error) => alert('errori'));
    // fine top rates
    // most popular
    axios
      .get('https://api.themoviedb.org/3/movie/popular',{
        params:{
          api_key: this.apiKey,
          language: 'it-IT'
        }
      })
      .then((result)=>{
        this.mostPopular = result.data.results;
        console.log(this.mostPopular);
      })
    .catch((error) => alert('errori'));
    // fine most popular
  }
});
