var app = new Vue({
  el: '#app',
  data:{
    query: '',
    apiKey: '61494116b9bd09ea4e4a494c360517b8'
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
          console.log(result.data);
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
          console.log(result.data);
        })
      .catch((error) => alert('errori'));
    }
  }
});
