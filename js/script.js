//Vueのインスタンスの定義

var app = new Vue({
  el: "#app",　// vueのインスタンスが紐づくDOM要素ののセレクタ
  data:{　　　// ここで定義した値がv-model="hoge"や{{hoge}}の初期値に反映される
    url: 'https://159oyrsgc0.execute-api.ap-northeast-1.amazonaws.com/lt_test', // v-model="url"の初期値
    selected_movie: {},
    param: "{}",              // v-model="param"の初期値
    results: [],              // v-model="result"の初期値
    loading: true
  },
  mounted: function() {
    this.get();
  },
  methods: {
    get: function(event) {
      // Axiosを使ったAJAX
      // リクエスト時のオプションの定義
      config = {
        headers:{
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8000'
        },
        withCredentials: true,
      }
      // vueでバインドされた値はmethodの中ではthisで取得できる
      param = JSON.parse(this.param)

      // Ajaxリクエスト
      axios.get(this.url, param, config)
        .then(function(res) {
          // vueにバインドされている値を書き換えると表示に反映される
          app.results = JSON.parse(res.data['body'])[0]['results'];
          app.loading = false;
          console.log(app.results);
        })
        .catch(function(res){
          // vueにバインドされている値を書き換えると表示に反映される
  　　　  app.result = res.data;
          console.log(res);
        });
    },
    reLoading: function(event) {
      this.get(event);
    }
  }
});

app;
