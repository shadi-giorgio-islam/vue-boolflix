var app = new Vue({
  el: '#app',
  data:{
    query: '',
    apiKey: '61494116b9bd09ea4e4a494c360517b8',
    movies: [],
    search: 'movie',
    display: 'none',
    displayBox: 'none'
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
      this.search = 'show';
    },
    showBox(){
      this.displayBox = 'active';
    },
    closeBox(){
      this.displayBox = 'none';
    }
  }
});
