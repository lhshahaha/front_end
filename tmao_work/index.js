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
    wrapurl:[]
  },

  mounted() {
    var that = this;
    console.log("123", localStorage.getItem("csaaccount"));
    if (localStorage.getItem("csaaccount")) {
      var that = this;
      var token = localStorage.getItem("csaaccount");
      console.log("tocken", token);
      axios
        .get("http://localhost:8000/?way=autologin", {
          headers: { Authorization: "Bearer " + token },
        })
        .then(function (response) {
          console.log("userdata", response.data);
          that.user = response.data;
          for (item in that.user.goods) {
            that.shopcar.price +=
              that.user.goods[item].num * that.user.goods[item].price;
            that.shopcar.weight +=
              that.user.goods[item].num * that.user.goods[item].weight;
          }
        });
    }
    console.log(this.user);
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
        getwrapurl()
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
      );
  },
  watch: {
    searchgood: function () {
      var that = this;
      console.log(this.showsearch);
      if (this.searchgood) {
        this.showsearch = true;
      } else {
        this.showsearch = false;
      }

      axios
        .get(
          "http://localhost:8000/search.html?city=" +
            that.selectedcity +
            "&goodname=" +
            that.searchgood +
            "&way=getsearch"
        )
        .then((response) => {
          that.seargoods = response.data;
          console.log("goods", that.seargoods);
        });
    },
  },
  methods: {
    showsearchwords: function (words) {
      var repleacestring = "<span style='color: #999;'>" + this.searchgood+"</span>";

      return words.replace(this.searchgood,repleacestring);
    },
    focusbar: function () {
      if (this.searchgood) {
        this.showsearch = true;
        console.log(
          this.showsearch,
          this.seargoods,
          this.searchgood,
          this.selectcity
        );
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
      }
      else
      {
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
    putincar: function (itemgood) {
      if (this.user) {
        if (itemgood.issold) {
          alert("卖完了");
        } else {
          var isincar = true;
          for (item in this.user.goods) {
            if (this.user.goods[item] == itemgood.id) {
              this.user.goods[item].num++;
              isincar = false;
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
                      axios.post(
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
                  axios.post("http://localhost:8000/?way=update", that.user);
                  break;
                }
              }
            }
          }
        }
      }
    },
    minus: function (index) {
      var that = this;
      if (this.user.goods[index].num > 1) {
        this.user.goods[index].num--;
        this.shopcar.price -= this.user.goods[index].price;
        this.shopcar.weight -= this.user.goods[index].weight;
        axios.post("http://localhost:8000/?way=update", that.user);
      }
    },
    buyall:function()
    {
      var that = this;
      this.user.goods=[];
      this.shopcar.price=0;
      this.shopcar.weight=0;
      axios.post("http://localhost:8000/?way=update", that.user);
    },
    plus: function (index) {
      var that = this;
      this.user.goods[index].num++;
      this.shopcar.price += this.user.goods[index].price;
      this.shopcar.weight += this.user.goods[index].weight;
      axios.post("http://localhost:8000/?way=update", that.user);
    },
    deleted: function (index) {
      var that=this;
      this.shopcar.price -=
        this.user.goods[index].price * this.user.goods[index].num;
      this.shopcar.weight -=
        this.user.goods[index].weight * this.user.goods[index].num;
      this.user.goods.splice(index, 1);
      console.log(this.user.goods)
      axios.post("http://localhost:8000/?way=update", that.user);
    },
    changeletter: function (x) {
      this.isletter = x;
    },
    selectcity: function (cityname) {
      this.selectedcity = cityname;
      console.log(this.selectedcity);
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
var wrap = document.querySelector(".wrap");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
function animation(wrap_direction) {
  var newLeft = parseInt(wrap.style.left);
  clearInterval(wrap.change);
  if (wrap_direction) {
    if (newLeft <= -4500) {
      newLeft = 0;
    }
    wrap.style.left = newLeft + "px";
    var positionLeft = newLeft - 750;
    wrap.change = setInterval(function () {
      newLeft -= 10;
      wrap.style.left = newLeft + "px";
      if (newLeft <= positionLeft) {
        wrap.style.left = positionLeft + "px";
        clearInterval(wrap.change);
      }
    }, 5);
  } else {
    if (newLeft >= -750) {
      newLeft = -5250;
    }
    wrap.style.left = newLeft + "px";
    var positionLeft = newLeft + 750;
    wrap.change = setInterval(function () {
      newLeft += 10;
      wrap.style.left = newLeft + "px";
      if (newLeft >= positionLeft) {
        wrap.style.left = positionLeft + "px";
        clearInterval(wrap.change);
      }
    }, 5);
  }
}
var clickflag = 1;
next.onclick = function () {
  if (clickflag == 1) {
    next_pic();
    clickflag = 0;
    setTimeout(function () {
      clickflag = 1;
    }, 600);
  }
};
prev.onclick = function () {
  if (clickflag == 1) {
    prev_pic();
    clickflag = 0;
    setTimeout(function () {
      clickflag = 1;
    }, 600);
  }
};
function next_pic() {
  //var newLeft;
  if (wrap.style.left === "-4500px") {
    animation(1);
    index = 0;
  } else {
    animation(1);
    // newLeft = parseInt(wrap.style.left)-1000;
    index++;
  }
  showCurrentDot();
  // wrap.style.left = newLeft + "px";
}
function prev_pic() {
  //var newLeft;
  if (wrap.style.left === "-750px") {
    //newLeft = -4000;
    animation(0);
    index = 5;
  } else {
    //newLeft = parseInt(wrap.style.left) + 1000;
    animation(0);
    index--;
  }
  showCurrentDot();
  //wrap.style.left = newLeft + "px";
}
var timer = null;
function autoPlay() {
  clearInterval(timer)
  timer = setInterval(function () {
    clickflag = 0;
    setTimeout(function () {
      clickflag = 1;
    }, 600);
    next_pic();
  }, 4000);
  window.onfocus=function()
  {console.log("onfocus")
  clearInterval(timer)
      timer = setInterval(function () {
    clickflag = 0;
    setTimeout(function () {
      clickflag = 1;
    }, 600);
    next_pic();
  }, 4000);
  }
  window.onblur=function()
  {
    console.log("onblur")
    clearInterval(timer)
  }

}
var container = document.querySelector(".container");
container.onmouseenter = function () {
  clearInterval(timer);
};
container.onmouseleave = function () {
  autoPlay();
};
var index = 0;
var dots = document.querySelectorAll(".buttons>span");
function showCurrentDot() {
  for (var i = 0, len = dots.length; i < len; i++) {
    dots[i].className = "";
  }
  dots[index].className = "on";
}
for (var i = 0, len = dots.length; i < len; i++) {
  (function (i) {
    dots[i].onclick = function () {
      clearInterval(timer);
      wrap.style.left = -750 - i * 750 + "px";
      index = i;
      showCurrentDot();
      autoPlay();
    };
  })(i);
}
autoPlay();
showCurrentDot();
