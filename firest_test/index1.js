function animation() {
  var details = document.querySelector(".details");
  var txt1 = document.getElementById("txt1");
  var txt2 = document.getElementById("txt2");
  var txt3 = document.getElementById("txt3");
  var txt = [txt1, txt2, txt3];
  var i = 0;
  setInterval(function () {
    var newtop = parseInt(details.style.top);
    clearInterval(details.change);
    if (newtop <= -10) {
      i = 0;
      newtop = 0;
    }
    details.style.top = newtop + "vw";
    var positiontop = newtop - 5;
    console.log(newtop);

    details.change = setInterval(function () {
      newtop -= 0.1;
      details.style.top = newtop + "vw";
      if (newtop <= positiontop) {
        newtop = positiontop;
        details.style.top = positiontop + "vw";
        clearInterval(details.change);
      }
    }, 10);
    console.log(i);
    txt[i].className = "minitxtdis";
    if (i == 0) {
      txt[2].className = "minitxtdis";
    }
    if (i == 1) {
      txt[0].className = "minitxt1";
    }
    i++;
    txt[i].className = "minitxt1";
    console.log(1, i);
  }, 5000);
}
var option;
option = {
  xAxis: {
    type: "category",
    data: ["昨天", "今天", "明天", "后天", "第四天", "第五天", "第六天"],
    show: false,
  },
  yAxis: {
    show: false,
    type: "value",
  },
  grid: {
    top: "20%",
    bottom: "20%",
    x: 0,
    x2: 0,
  },
  series: [
    {
      smooth: true,
      type: "line",
      //   symbolSize: 30,
      data: [10, 11, 13, 11, 12, 12, 9],
      label: {
        show: true,
        position: "top",
        // fontSize: 60,
        formatter: "{c}°",
      },
      //   lineStyle: {
      //     width: 10,
      //   },
    },
    {
      smooth: true,
      //   symbolSize: 30,
      //   lineStyle: {
      //     width: 10,
      //   },
      type: "line",
      data: [1, -2, 2, 5, 3, 2, 0],
      label: {
        show: true,
        position: "bottom",
        // fontSize: 60,
        formatter: "{c}°",
      },
    },
  ],
};
var chartDom = document.getElementById("main");
var myChart = echarts.init(chartDom);
animation();
option && myChart.setOption(option);
var position = document.getElementsByClassName("position");
var searchconsle = document.getElementsByClassName("searchtxt");
var slide = document.getElementsByClassName("slide");
function search() {
  var searchcontent = document.getElementsByClassName("search");
  searchcontent[0].className = "searchon";
}
function searchconsl() {
  var searchcontent = document.getElementsByClassName("searchon");
  searchcontent[0].className = "search";
}
position[0].addEventListener("touchstart", search);
searchconsle[0].addEventListener("touchstart", searchconsl);
var slide = document.getElementsByClassName("hisitem");
console.log(10, slide);
var aircondition = document.getElementsByClassName("aircodition");
var airdetail = document.getElementsByClassName("airconditiondetailoff");
var closeail = document.getElementsByClassName("closeair");
var container = document.getElementById("container");
function openair() {
  airdetail[0].className = "airconditiondetailon";
  container.style.filter = "blur(1vw)";
}
function cloair() {
  var airdetailon = document.getElementsByClassName("airconditiondetailon");
  airdetailon[0].className = "airconditiondetailoff";
  container.style.filter = "none";
}
aircondition[0].addEventListener("touchstart", openair);
closeail[0].addEventListener("touchstart", cloair);

function lifeshow(){
const swiperEl = document.querySelector(".lifedatain");
// 在视图层里边查找容器元素
const containerEl = swiperEl.querySelector(".lifedatainfo");

let state = 0; // 鼠标默认状态
let oldEvent = null; // 用来记录鼠标上次的位置
// 获取容器的初始left值
let left = containerEl.offsetLeft;
let index = 0;
let beforeindex=index
console.log(left);
containerEl.addEventListener("touchstart", (event) => {
  state = 1; // 设置为1表示按下了鼠标
  oldEvent = event; // 当鼠标按下时候记录初始位置
  beforeindex=index
  console.log("鼠标按下了");
});

containerEl.addEventListener("touchmove", (event) => {
  if (state != 1) return; // 只有当state == 1时候才允许执行该事件
  // 用当前鼠标的位置来和上次鼠标的位置作比较
  // 如果当前鼠标的pageX小于上次鼠标的pageX，那就表示鼠标在向左拖动，就需要把容器left值减去鼠标移动的距离
  if (event.changedTouches[0].clientX < oldEvent.changedTouches[0].clientX) {
    left -=
      oldEvent.changedTouches[0].clientX - event.changedTouches[0].clientX;
      index = 1;
  } else {
    left +=
      event.changedTouches[0].clientX - oldEvent.changedTouches[0].clientX;
      index = 0;
  }
  // 完事之后记得把当前鼠标的位置赋值给oldEvent
  oldEvent = event;
  // 最后再把left赋值给容器
  console.log(1, containerEl.style.left);
  containerEl.style.left = left  + "vw";
  console.log(2, containerEl.style.left);
  console.log("鼠标移动了");
});
var lifepage=document.getElementsByClassName("lifepage")
containerEl.addEventListener("touchend", (event) => {
  state = 0; // 恢复默认状态
  console.log(index);
  // 追加一个move样式
  console.log('b',beforeindex)
  console.log("in",index)
  lifepage[beforeindex].className = lifepage[beforeindex].className.replace(/\s+on/, "");
  lifepage[index].className += " on";
  containerEl.className += " move";
  // 当过度动画结束后，一定要把这个类给移除掉
  containerEl.addEventListener("transitionend", () => {
    // 正则替换 \s+ 表示一个或多个空白字符
    containerEl.className = containerEl.className.replace(/\s+move/, "");
  });
  left = 0 - 100 * index;
  containerEl.style.left = left + "vw";
  console.log("鼠标抬起了");
  console.log("鼠标抬起了");
});
}
lifeshow();
