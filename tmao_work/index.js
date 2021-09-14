var app = new Vue({
  el: "#app",
  data: {
    user: {},
    shopcar: {
      price: 0,
      weight: 0,
    },
    goods: [],
    isletter: 0,
    selectedcity: "北京",
    letters: [],
    hotcity: [],
    hotpoint: [],
    market: [],
    importfood: {},
    wrapimg: [],
    courtyard_ad: [],
    sidebar: [],
    good: [],
    backcolor: ["#b373fb", "#83cfff", "#ffbb00"],
    fronttittle: {},
    actindex: -1,
    color: -1,
    tittle: false,
    goodclass: false,
    sidegobar: false,
    pageposition: -1,
    searchgood: "",
    searchbaractive: false,
    showsearch: false,
    seargoods: [],
    wrapurl: [],
    loading:true
  },
  mounted() {
    var that = this;
    if (localStorage.getItem("csaaccount")) {
      var that = this;
      var token = localStorage.getItem("csaaccount");
      axios
        .get("http://localhost:8000/?way=autologin", {
          headers: { Authorization: "Bearer " + token },
        })
        .then(function (response) {
          if (response.data) {
            that.user = response.data;
            for (item in that.user.goods) {
              that.shopcar.price +=
                that.user.goods[item].num * that.user.goods[item].price;
              that.shopcar.weight +=
                that.user.goods[item].num * that.user.goods[item].weight;
            }
          }
        });
    }
    if (window.pageYOffset >= 225.6) {
      this.tittle = true;
    }
    if (window.pageYOffset >= 421) {
      this.sidegobar = true;
    }
    window.addEventListener("scroll", this.changeclass);
    window.addEventListener("click", function (item) {
      if (item.target.className != "searchinput") {
        that.$nextTick(() => {
          that.showsearch = false;
        });
      }
    });
    function getletters() {
      return axios.get("http://localhost:8000/data/letters.json");
    }
    function getfronttittle() {
      return axios.get("http://localhost:8000/data/front_tittle.json");
    }
    function getcourtyard_ad() {
      return axios.get("http://localhost:8000/data/courtyard_ad.json");
    }
    function getgood() {
      return axios.get("http://localhost:8000/data/good.json");
    }
    function gethotcity() {
      return axios.get("http://localhost:8000/data/hotcity.json");
    }
    function gethotpoint() {
      return axios.get("http://localhost:8000/data/hotpoint.json");
    }
    function getimportfood() {
      return axios.get("http://localhost:8000/data/importfood.json");
    }
    function getmarket() {
      return axios.get("http://localhost:8000/data/market.json");
    }
    function getsidebar() {
      return axios.get("http://localhost:8000/data/sidebar.json");
    }
    function getwrapimg() {
      return axios.get("http://localhost:8000/data/wrapimg.json");
    }
    function getwrapurl() {
      return axios.get("http://localhost:8000/data/wrapurl.json");
    }
    var that = this;
    axios
      .all([
        getletters(),
        getcourtyard_ad(),
        getgood(),
        gethotcity(),
        gethotpoint(),
        getimportfood(),
        getmarket(),
        getsidebar(),
        getwrapimg(),
        getfronttittle(),
        getwrapurl(),
      ])
      .then(
        axios.spread(function (
          letters,
          ad,
          good,
          hotcity,
          hotpoint,
          importfood,
          market,
          sidebar,
          wrapimg,
          fronttittle,
          wrapurl
        ) {
          that.letters = letters.data;
          that.courtyard_ad = ad.data;
          that.good = good.data;
          that.hotcity = hotcity.data;
          that.hotpoint = hotpoint.data;
          that.importfood = importfood.data;
          that.market = market.data;
          that.sidebar = sidebar.data;
          that.wrapimg = wrapimg.data;
          that.wrapurl = wrapurl.data;
          that.fronttittle = fronttittle.data;
        })
      )
      .catch((err) => console.log(err));
  },
  watch: {
    searchgood: function () {
      var that = this;
      if (this.searchgood) {
        this.showsearch = true;
      } else {
        this.showsearch = false;
      }

      axios
        .put(
          "http://localhost:8000/search.html?city=" +
            that.selectedcity +
            "&goodname=" +
            that.searchgood +
            "&way=getsearch"
        )
        .then((response) => {
          that.seargoods = response.data;
        });
    },
  },
  updated() {
    let imgList = document.getElementsByTagName('img');
    let imgCount = imgList.length;
    let imgLoad = 0;

    for (let i = 0; i < imgCount; i++) {
      imgList[i].onload = () => {
        imgLoad++;
        console.log(imgLoad);
        if (imgLoad === imgCount) {
          this.loading =false;
          console.log("图片加载完成 展示组件");
        }
      }
    }
  },
  methods: {
    showsearchwords: function (words) {
      var repleacestring =
        "<span style='color: #999;'>" + this.searchgood + "</span>";

      return words.replace(this.searchgood, repleacestring);
    },
    focusbar: function () {
      if (this.searchgood) {
        this.showsearch = true;
      }
    },
    clicksearchgood: function (name) {
      window.location.href =
        "http://localhost:8000/search.html?city=" +
        this.selectedcity +
        "&goodname=" +
        name;
    },
    searchgoods: function () {
      if (this.searchgood) {
        window.location.href =
          "http://localhost:8000/search.html?city=" +
          this.selectedcity +
          "&goodname=" +
          this.searchgood;
      } else {
        this.searchbaractive = !this.searchbaractive;
      }
    },
    gotobar: function (index) {
      window.scrollTo(0, 800 + 650 * index);
    },
    changeclass: function () {
      if (window.pageYOffset >= 225.6) {
        this.tittle = true;
      } else {
        this.tittle = false;
      }
      if (window.pageYOffset >= 421) {
        this.sidegobar = true;
      } else {
        this.sidegobar = false;
      }
      if (window.pageYOffset >= 800) {
        var temp = ((window.pageYOffset - 800) / 650).toFixed(1);
        this.pageposition = temp.substring(0, temp.lastIndexOf("."));
      } else {
        this.pageposition = -1;
      }
      if (window.pageYOffset < 848.6) {
        this.goodclass = false;
      }
    },
    showcategory: function () {
      if (window.pageYOffset >= 848.6) {
        this.goodclass = true;
      } else {
        this.goodclass = false;
      }
    },
    disappearcate: function () {
      if (window.pageYOffset >= 848.6) {
        this.goodclass = false;
      }
    },
    fixednum: function (x) {
      if (x != 0) {
        return x.toFixed(2);
      } else {
        return (0).toFixed(2);
      }
    },

    minus: function (index) {
      var that = this;
      if (this.user.goods[index].num > 1) {
        this.user.goods[index].num--;
        this.shopcar.price -= this.user.goods[index].price;
        this.shopcar.weight -= this.user.goods[index].weight;
        axios.put("http://localhost:8000/?way=update", that.user);
      }
    },
    buyall: function () {
      var that = this;
      this.user.goods = [];
      this.shopcar.price = 0;
      this.shopcar.weight = 0;
      axios.put("http://localhost:8000/?way=update", that.user);
    },
    plus: function (index) {
      var that = this;
      this.user.goods[index].num++;
      this.shopcar.price += this.user.goods[index].price;
      this.shopcar.weight += this.user.goods[index].weight;
      axios.put("http://localhost:8000/?way=update", that.user);
    },
    putincar: function (itemgood) {
      if (this.user.name) {
        if (itemgood.issold) {
          alert("卖完了");
        } else {
          var isincar = true;
          for (item in this.user.goods) {
            if (this.user.goods[item].id == itemgood.id) {
              this.plus(item);
              isincar = false;
              break;
            }
          }
          if (isincar) {
            var temp = {};
            var that = this;
            if (this.goods.length == 0) {
              axios
                .get("http://localhost:8000/data/goods.json")
                .then(function (response) {
                  that.goods = response.data;
                  for (item in that.goods) {
                    if (that.goods[item].id == itemgood.id) {
                      temp.id = that.goods[item].id;
                      temp.img = that.goods[item].img;
                      temp.price = that.goods[item].price;
                      temp.weight = that.goods[item].weight;
                      temp.num = 1;
                      that.user.goods.push(temp);
                      that.shopcar.price += itemgood.price;
                      that.shopcar.weight += that.goods[item].weight;
                      axios.put(
                        "http://localhost:8000/?way=update",
                        that.user
                      );
                      break;
                    }
                  }
                });
            } else {
              for (item in this.goods) {
                if (this.goods[item].id == itemgood.id) {
                  temp.id = this.goods[item].id;
                  temp.img = this.goods[item].img;
                  temp.num = 1;
                  temp.price = that.goods[item].price;
                  temp.weight = that.goods[item].weight;
                  this.user.goods.push(temp);
                  that.shopcar.price += itemgood.price;
                  that.shopcar.weight += that.goods[item].weight;
                  axios.put("http://localhost:8000/?way=update", that.user);
                  break;
                }
              }
            }
          }
        }
      }else
      {
        alert("请登录")
      }
    },
    deleted: function (index) {
      var that = this;
      this.shopcar.price -=
        this.user.goods[index].price * this.user.goods[index].num;
      this.shopcar.weight -=
        this.user.goods[index].weight * this.user.goods[index].num;
      this.user.goods.splice(index, 1);
      axios.put("http://localhost:8000/?way=update", that.user);
    },
    changeletter: function (x) {
      this.isletter = x;
    },
    selectcity: function (cityname) {
      this.selectedcity = cityname;

    },
    mouseover: function (index, color) {
      this.actindex = index;
      this.color = color;
    },
    mouseleave: function () {
      this.actindex = -1;
      this.color = -1;
    },
  },
});
