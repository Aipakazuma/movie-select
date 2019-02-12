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
    setTimeout(this.get, 1000);
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
      param = JSON.parse(this.param);

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
    post: function(clicked_title) {
      config = {
        headers:{
          // 'X-Requested-With': 'XMLHttpRequest',
          'Content-Type':'application/json',
          // 'Access-Control-Allow-Origin': 'http://localhost:8000'
        },
        // withCredentials: true,
      }
      _param = {
        'title1': app.results[0].title,
        'title2': app.results[1].title,
        'clicked': app.results[0].title == clicked_title ? 0 : 1
      };
      param = JSON.stringify(_param);
      axios.post(this.url, param, config)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(res) {
          console.log(res);
        });

      this.reLoading();
    },
    reLoading: function(event) {
      app.loading = true;
      setTimeout(this.get, 3000);
    }
  }
});

app;
