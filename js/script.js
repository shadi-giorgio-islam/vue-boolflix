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
    selectedGenres: []
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
          console.log(this.movies);
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
          console.log(this.movies);
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
      console.log(this.selectedGenres);
      axios
        .get('https://api.themoviedb.org/3/'+ this.search +'/'+this.movies[index].id+'/credits',{
          params:{
            api_key: this.apiKey,
            language: 'it-IT'
          }
        })
        .then((result)=>{
          this.cast = result.data.cast;
          console.log(this.cast);
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
        console.log(this.genres);
      })
    .catch((error) => alert('errori'));
    // lista generi tv shows
  }
});
