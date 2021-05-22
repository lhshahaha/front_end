//首页湿度风向轮播图
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
    details.change = setInterval(function () {
      newtop -= 0.1;
      details.style.top = newtop + "vw";
      if (newtop <= positiontop) {
        newtop = positiontop;
        details.style.top = positiontop + "vw";
        clearInterval(details.change);
      }
    }, 10);
    txt[i].className = "minitxtdis";
    if (i == 0) {
      txt[2].className = "minitxtdis";
    }
    if (i == 1) {
      txt[0].className = "minitxt1";
    }
    i++;
    txt[i].className = "minitxt1";
  }, 5000);
}
//获取七天每一天的最大温度和最小温度
function getseventem(v) {
  return v.tempMax;
}
function getseventemn(v) {
  return v.tempMin;
}
//根据地区文本获取地区的id和名称
async function Getlocation(location) {
  var url =
    "https://geoapi.qweather.com/v2/city/lookup?key=4483090026b641b294d9e1d845d4e8bb&";

  try {
    const res = await fetch(url + "location=" + location);
    const json = await res.json();
    var loc = {};
    loc.name = json.location[0].name;
    loc.id = json.location[0].id;
    console.log("l", loc);
    return loc;
  } catch (error) {
    console.log(error);
  }
}
//获取当天信息（用于首页）
async function Gettitle(location) {
  var url =
    "https://devapi.qweather.com/v7/weather/now?key=4483090026b641b294d9e1d845d4e8bb&";
  try {
    console.log("lo", url + location.id);
    const res = await fetch(url + "location=" + location.id);
    const json = await res.json();
    var citynow = {};
    citynow = json.now;
    citynow.name = location.name;
    console.log(5, citynow);
    return citynow;
  } catch (error) {
    console.log(error);
  }
}
//获取当天空气状态
async function Getair(location) {
  var url =
    "https://devapi.qweather.com/v7/air/now?key=4483090026b641b294d9e1d845d4e8bb&";
  try {
    console.log("lo", url + location.id);
    const res = await fetch(url + "location=" + location.id);
    const json = await res.json();
    console.log('air', json.now);
    return json.now;
  } catch (error) {
    console.log(error);
  }
}
//获取各种生活指数
async function Getlifedata(location) {
  var url =
    "https://devapi.qweather.com/v7/indices/1d?key=4483090026b641b294d9e1d845d4e8bb&";
  try {
    console.log("lo", url + location.id);
    const res = await fetch(url + "location=" + location.id+"&type=0");
    const json = await res.json();
    console.log('daily', json.daily);
    return json.daily;
  } catch (error) {
    console.log(error);
  }
}
//获取热门城市
async function Gethotcity() {
  var url =
    "https://geoapi.qweather.com/v2/city/top?number=5&range=cn&key=4483090026b641b294d9e1d845d4e8bb&";
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log('hotcity', json.topCityList);
    return json.topCityList;
  } catch (error) {
    console.log(error);
  }
}
//获取一周的天气信息
async function getsevendays(location) {
  var url =
    "https://devapi.qweather.com/v7/weather/7d?key=4483090026b641b294d9e1d845d4e8bb&";
  try {
    const res = await fetch(url + "location=" + location.id);
    const json = await res.json();
    console.log("seven", url + "location=" + location.name, json);
    return json.daily;
  } catch (error) {
    console.log(error);
  }
}
//获取24小时信息
async function gethours(location) {
  var url =
    "https://devapi.qweather.com/v7/weather/24h?key=4483090026b641b294d9e1d845d4e8bb&";
  try {
    const res = await fetch(url + "location=" + location.id);
    const json = await res.json();
    console.log(json);
    return json.hourly;
  } catch (error) {
    console.log(error);
  }
}
//设置历史记录（通过Cookie）
function setCookie(cvalue) {
  var citys=getCookie();
  for(var i=0;i<citys.length;i++)
  {
    if(cvalue==citys[i])
    {
      return 0;
    }
  }
  var item = document.cookie;
  
  if (item) {
    item = "citys=" + cvalue + "+" + item;
    document.cookie = item;
    return 0;
  }
  document.cookie = "citys=" + cvalue;
  console.log("cookie", document.cookie);
}
//删除空格等
function trim(x) {
  return x.replace(/^\s+|\s+$/gm, "");
}
//获取存在Cookie中的历史记录
function getCookie() {
  var name = "citys=";
  var ca = document.cookie.split(";");
  var citys = [];
  if (ca == "") {
    return "";
  }
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].split("+");
    for (var j = 0; j < c.length; j++) {
      var city = c[j].split("=");
      var str = trim(city[0]);
      if (str.indexOf("citys") == 0) {
        citys.push(trim(city[1]));
      }
    }
  }
  return citys;
}
//删除历史记录（cookie）
function delCookie() {
  var keys = document.cookie.match(/[^ =;]+(?==)/g);
  if (keys) {
    for (var i = keys.length; i--; ) {
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }
}
//删除历史记录且从页面中去除历史记录栏
function deletehis()
{
  document.getElementsByClassName("history")[0].innerHTML = '';
  delCookie();
}
var option;
//初始化echart设置
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
//通过js将写入html等
async function writeinhtml(info = "重庆") {
  //获取地区id、名称并借此获取当天天气信息
  var location = await Getlocation(info);
  var res = await Gettitle(location);
  var html = "";
  //将获取的信息存入html
  html +=
    '<div id="content" style="filter: none">\
    <div class="photo">\
<img class="weatherbackground" src="./weather-background/' +
    res.text +
    '.jpg" alt="" />\
</div>\
<div class="photo photoinfo">\
<div class="headtitle">\
<div class="tiltetxt position">\
<img src="./wheather/定位.png" alt="" />\
<div class="txt">' +
    res.name +
    '</div>\
</div>\
</div>\
<div class="tiltetxt weatherinfo">\
<div class="temperature"> ' +
    "&nbsp;" +
    res.temp +
    '°</div>\
<div class="txt">' +
    res.text +
    '</div>\
<div class="slide">\
<div class="details"  style="top: 0vw;">\
<div id="txt1" class="minitxt1">' +
    res.windDir +
    " " +
    res.windScale +
    '级</div>\
<div id="txt2" class="minitxtdis">湿度' +
    " " +
    res.humidity +
    '%</div>\
<div id="txt3" class="minitxtdis">' +
    res.windDir +
    " " +
    res.windScale +
    '级</div>\
</div>\
</div>\
<div class="txt">光芒透过云缝，洒向大地~</div>\
</div>\
</div>';
//获取一周天气信息得到今明两天信息并存入html中
  var sevendays = await getsevendays(location);
  html +=
    '<div class="TodayAndTomo">\
  <div class="days">\
  <div class="dayinfo left">\
  <div class="txt">今天</div>\
  <div class="txt">' +
    sevendays[0].tempMax +
    "/" +
    sevendays[0].tempMin +
    '°</div>\
  </div>\
  <div class="condition left">\
  <div class="txt">' +
    sevendays[0].textDay +
    '</div>\
  <div class="conditionimg">\
  <img src="./wheather/' +
    sevendays[0].textDay +
    '.png" alt="" />\
  </div>\
  </div>\
  </div>\
  <div class="days">\
  <div class="dayinfo">\
  <div class="txt">明天</div>\
  <div class="txt">' +
    sevendays[1].tempMax +
    "/" +
    sevendays[1].tempMin +
    '°</div>\
  </div>\
  <div class="condition">\
  <div class="txt">' +
    sevendays[1].textDay +
    '</div>\
  <div class="conditionimg">\
  <img src="./wheather/' +
    sevendays[1].textDay +
    '.png" alt="" />\
  </div>\
  </div>\
  </div>\
  </div>';
//获取24小时信息并存入html中
  var hours = await gethours(location);
  html += '<div class="timeout"><div class="timein">';
  hours.forEach((v) => {
    time = new Date(v.fxTime);
    hour = time.getHours();
    if (hour < 10) {
      hour = "0" + hour;
    }
    min = time.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    time = hour + ":" + min;
    html +=
      '<div class="day">\
  <div class="txt">' +
      time +
      '</div>\
  <img src="./wheather/' +
      v.text +
      '.png" alt="" />\
  <div class="txt">' +
      v.temp +
      "°</div>\
</div>";
  });
  html += "</div></div>";

//模拟mock接口
async function mockapi() {
  var mocksevenday
const Random = Mock.Random;
Mock.mock(/\.json/, {
  "temphigh|7": [() => Random.integer(10, 30)],
  "templow|7": [() => Random.integer(-10, 10)],
});
const xhr = new XMLHttpRequest();
//初始化一个get请求
xhr.open("get", "hello.json", false);
//接收返回值
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      const res = JSON.parse(xhr.responseText);
      console.log(res);
      mocksevenday=res;
    } else {
      console.log("请求失败");
    }
  }
};
xhr.send();
return mocksevenday
}
 var mocksevenday=await mockapi()
 //把获取的七天天气信息存入echart中的option渲染表
 //获取的真实数据
  // var datahigh = sevendays.map(getseventem);
  // var datalow = sevendays.map(getseventemn);
  // option.series[0].data = datahigh;
  // option.series[1].data = datalow;
  // console.log(3, datahigh, datalow);
  //mock出的数据 
  console.log(3,mockapi());
  option.series[0].data = mocksevenday.temphigh;
  option.series[1].data = mocksevenday.templow;
 
  html +=
    '<div class="sevendaysout">\
    <div class="sevendaysin"><div class="sevendaysinfo">';
  sevendays.forEach((v) => {
    var time = v.fxDate;
    var week = new Date(v.fxDate);
    //将七天天气信息每天的时间信息转化为周数
    week = week.getDay();
    if (week == 1) {
      week = "周一";
    } else if (week == 2) {
      week = "周二";
    } else if (week == 3) {
      week = "周三";
    } else if (week == 4) {
      week = "周四";
    } else if (week == 5) {
      week = "周五";
    } else if (week == 6) {
      week = "周六";
    } else if (week == 0) {
      week = "周天";
    }
    //转换时间字符串样式
    time = time.substr(5, 9);
    time = time.replace("-", "/");
    //为echart图表添加 上x轴
    html +=
      '<div class="sevendayinfo">\
      <div class="minitxt">' +
      week +
      '</div>\
      <div class="minitxt">' +
      time +
      '</div>\
      <div class="minitxt">' +
      v.textDay +
      '</div>\
      <img src="./wheather/' +
      v.textDay +
      '.png" alt="" />\
    </div>';
  });
  //添加echart图表
  html +=
    ' </div>\
    <div id="main" class="sevendayschart"></div>\
    <div class="sevendaysinfo">';
    //添加 下x轴
  sevendays.forEach((v) => {
    var time = v.fxDate;
    time = time.substr(5, 9);
    time = time.replace("-", "/");
    html +=
      '<div class="sevendayinfo">\
        <img src="./wheather/' +
      v.textNight +
      '.png" alt="" />\
        <div class="minitxt">' +
      v.textNight +
      '</div>\
        <div class="minitxt">' +
      v.windDirDay +
      '</div>\
        <div class="minitxt">' +
      v.windScaleDay +
      "级</div>\
      </div>";
  });
  html +='</div></div></div>'
  var air=await Getair(location);
  //设置空气质量小图标
  html+='<div class="aircodition">\
  <div class="minitxt">'+air.aqi+'</div>\
  <div class="minitxt">'+air.category+'</div>\
</div>'
//获取生活指数并写入html中
var lifedata=await Getlifedata(location);
html+='<div class="lifedata">\
<div class="lifedatain">\
  <div class="lifedatainfo">\
  <div class="lifedatapart">'
for(var i=0;i<8;i++)
{
  if(lifedata[i].type==1){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/运动.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">运动</div>\
</div>'
}
else if(lifedata[i].type==2){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/洗车.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">洗车</div>\
</div>'
}
else if(lifedata[i].type==3){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/穿衣.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">穿衣</div>\
</div>'
}
else if(lifedata[i].type==4){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/钓鱼.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">钓鱼</div>\
</div>'
}
else if(lifedata[i].type==5){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/紫外线.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">紫外线</div>\
</div>'
}
else if(lifedata[i].type==6){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/旅游.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">旅游</div>\
</div>'
}
else if(lifedata[i].type==7){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/花粉过敏.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">花粉过敏</div>\
</div>'
}
else if(lifedata[i].type==8){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/舒适.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">舒适度</div>\
</div>'
}
else if(lifedata[i].type==9){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/感冒.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">感冒</div>\
</div>'
}
else if(lifedata[i].type==10){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/空气污染.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">空气污染</div>\
</div>'
}
else if(lifedata[i].type==11){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/空调.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">空调</div>\
</div>'
}
else if(lifedata[i].type==12){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/太阳镜.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">太阳镜</div>\
</div>'
}
else if(lifedata[i].type==13){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/化妆.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">化妆</div>\
</div>'
}
else if(lifedata[i].type==14){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/晾晒.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">晾晒</div>\
</div>'
}
else if(lifedata[i].type==15){
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/交通.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">交通</div>\
</div>'
}
else {
  html+='<div class="lifeitem">\
  <div class="lifeimg">\
    <img src="./wheather/防晒.png" alt="">\
  </div>\
  <div class="minitxt">'+lifedata[i].category+'</div>\
  <div class="minitxt">防晒</div>\
</div>'
}
}
  html+='</div>\
  <div class="lifedatapart">'
  for(var i=8;i<16;i++)
  {
    if(lifedata[i].type==1){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/运动.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">运动</div>\
  </div>'
  }
  else if(lifedata[i].type==2){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/洗车.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">洗车</div>\
  </div>'
  }
  else if(lifedata[i].type==3){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/穿衣.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">穿衣</div>\
  </div>'
  }
  else if(lifedata[i].type==4){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/钓鱼.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">钓鱼</div>\
  </div>'
  }
  else if(lifedata[i].type==5){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/紫外线.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">紫外线</div>\
  </div>'
  }
  else if(lifedata[i].type==6){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/旅游.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">旅游</div>\
  </div>'
  }
  else if(lifedata[i].type==7){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/花粉过敏.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">花粉过敏</div>\
  </div>'
  }
  else if(lifedata[i].type==8){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/舒适.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">舒适度</div>\
  </div>'
  }
  else if(lifedata[i].type==9){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/感冒.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">感冒</div>\
  </div>'
  }
  else if(lifedata[i].type==10){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/空气污染.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">空气污染</div>\
  </div>'
  }
  else if(lifedata[i].type==11){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/空调.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">空调</div>\
  </div>'
  }
  else if(lifedata[i].type==12){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/太阳镜.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">太阳镜</div>\
  </div>'
  }
  else if(lifedata[i].type==13){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/化妆.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">化妆</div>\
  </div>'
  }
  else if(lifedata[i].type==14){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/晾晒.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">晾晒</div>\
  </div>'
  }
  else if(lifedata[i].type==15){
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/交通.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">交通</div>\
  </div>'
  }
  else {
    html+='<div class="lifeitem">\
    <div class="lifeimg">\
      <img src="./wheather/防晒.png" alt="">\
    </div>\
    <div class="minitxt">'+lifedata[i].category+'</div>\
    <div class="minitxt">防晒</div>\
  </div>'
  }
  }
  //写入空气质量详情
  html+='</div>\
  </div>\
</div>\
</div>\
<div class="showlifepage">\
<div class="lifepage on"></div>\
<div class="lifepage"></div>\
</div>\
</div>\
<div class="airconditiondetailoff">\
<div class="airtittle">\
  <div class="airimg">\
    <img src="./weather-background/bg02.png" alt="" />\
  </div>\
  <div class="closeair">\
    <img src="./wheather/关闭.png" alt="" />\
  </div>\
  <div class="aircondetail">\
    <div class="txt">空气质量指数</div>\
    <div class="numtxt">'+air.aqi+'</div>\
    <div class="txt condi">'+air.category+'</div>\
  </div>\
</div>\
<div class="airdetails">\
  <div class="airdetail">\
    <div class="minitxt airtop">'+air.pm2p5+'</div>\
    <div class="minitxt">PM2.5</div>\
  </div>\
  <div class="airdetail">\
    <div class="minitxt airtop">'+air.pm10+'</div>\
    <div class="minitxt">PM10</div>\
  </div>\
  <div class="airdetail" style="border-right: none">\
    <div class="minitxt airtop">'+air.so2+'</div>\
    <div class="minitxt">SO2</div>\
  </div>\
  <div class="airdetail">\
    <div class="minitxt airtop">'+air.no2+'</div>\
    <div class="minitxt">NO2</div>\
  </div>\
  <div class="airdetail">\
    <div class="minitxt airtop">'+air.o3+'</div>\
    <div class="minitxt">03</div>\
  </div>\
  <div class="airdetail" style="border-right: none">\
    <div class="minitxt airtop">'+air.co+'</div>\
    <div class="minitxt">CO</div>\
  </div>\
</div></div>'
//添加搜索框
html+='<div class="search">\
<div class="searchinput">\
  <input type="search" id="search" name="position" placeholder="搜索地区">\
  <div class="searchtxt">取消</div>\
  <img src="./wheather/搜索.png" alt="">\
</div>';
var citys = getCookie();
//获取历史记录
console.log("citys", citys);
//判断有无历史记录
if (citys != "") {
  html +=
    '<div class="history">\
  <div class="historytittle">\
  <div class="historytxt">历史记录</div>\
  <div class="delete" id="delete">\
  <img src="./wheather/删 除 (1).png" alt="">\
  </div>\
  </div>\
  <div class="historyline">';
  //写入历史记录
  citys.forEach((v) => {
    html += '<div class="hisitem">' + v + "</div>";
  });
  html += "</div></div>";
}
var hotcitys=await Gethotcity();
//获取并写入热门城市
console.log('hot',hotcitys)
html+='<div class="hotcity"><div class="hotcitytxt">热门城市</div><div class="hotcityline">'
hotcitys.forEach((v)=>{
  html+='<div class="hotcityitem">'+v.name+'</div>'
})
html+='</div></div></div>'
//写入生活指数框架（便于后面点击事件时添加信息）
html+='<div class="lifedetailoff" id="lifedata"></div>'
//将上述html的信息写入文件中
  document.getElementById("container").innerHTML = html;
  //生活指数轮播图
function lifeslides(){
  const swiperEl = document.querySelector(".lifedatain");
  // 在视图层里边查找容器元素
  const containerEl = swiperEl.querySelector(".lifedatainfo");
  
  let state = 0; // 默认状态
  let oldEvent = null; // 用来记录手指上次的位置
  // 获取容器的初始left值
  let left = containerEl.offsetLeft;
  let index = 0;
  let beforeindex=index
  console.log(left);
  containerEl.addEventListener("touchstart", (event) => {
    state = 1; 
    oldEvent = event; 
    beforeindex=index
    console.log("手指按下了");
  });
  
  containerEl.addEventListener("touchmove", (event) => {
    if (state != 1) return; // 只有当state == 1时候才允许执行该事件
    if (event.changedTouches[0].clientX < oldEvent.changedTouches[0].clientX) {
      left -=
        oldEvent.changedTouches[0].clientX - event.changedTouches[0].clientX;
        index = 1;
    } else {
      left +=
        event.changedTouches[0].clientX - oldEvent.changedTouches[0].clientX;
        index = 0;
    }
    oldEvent = event;
    console.log(1, containerEl.style.left);
    containerEl.style.left = left*0.5  + "vw";
    console.log(2, containerEl.style.left);
    console.log("手指移动了");
  });
  var lifepage=document.getElementsByClassName("lifepage")
  containerEl.addEventListener("touchend", (event) => {
    state = 0; // 恢复默认状态
    console.log(index);
    console.log('b',beforeindex)
    console.log("in",index)
    lifepage[beforeindex].className = lifepage[beforeindex].className.replace(/\s+on/, "");
    lifepage[index].className += " on";
    containerEl.className += " move";
    containerEl.addEventListener("transitionend", () => {
      // 正则替换 \s+ 表示一个或多个空白字符
      containerEl.className = containerEl.className.replace(/\s+move/, "");
    });
    left = 0 - 100 * index;
    containerEl.style.left = left + "vw";
    console.log("手指抬起了");
  });
  }
  lifeslides();
  //获取空气质量小图标方便后续点击
    var aircondition=document.getElementsByClassName("aircodition");
//获取空气质量详情页方便操作
    var airdetail=document.getElementsByClassName("airconditiondetailoff")
    //获取关闭空气质量的div方便操作
    var closeail=document.getElementsByClassName("closeair")
    //获取底层页面可以改变底层模糊度等
    var container=document.getElementById("content")
    //显示空气质量详情页
    function openair()
    {
      airdetail[0].className='airconditiondetailon'
      container.style.filter="blur(1vw)"
    
    }
    //关闭空气质量详情页
    function cloair()
    {
      var airdetailon=document.getElementsByClassName("airconditiondetailon")
      airdetailon[0].className='airconditiondetailoff' 
      container.style.filter="none"
    }
    //显示搜素页
    function search() {
      var searchcontent = document.getElementsByClassName("search");
      searchcontent[0].className = "searchon";
      container.style.display="none"
      
    }
    //关闭搜素页
    function searchconsl() {
      var searchcontent = document.getElementsByClassName("searchon");
      searchcontent[0].className = "search";
      container.style.display="block"
    }
    //添加空气质量图标点击事件
    aircondition[0].addEventListener("touchstart",openair)
    //添加空气质量详情页关闭图标的点击事件
    closeail[0].addEventListener("touchstart",cloair)
    //显示echart图表
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
    //轮播图动画
    animation();
    //获取首页顶部地区的div
  var position = document.getElementsByClassName("position");
  //获取搜索页的“取消”div
  var searchconsle = document.getElementsByClassName("searchtxt");
  //获取轮播图div
  var slide = document.getElementsByClassName("slide");
  //向首页顶端地区div添加点击事件打开搜索页
  position[0].addEventListener("touchstart", search);
  //添加关闭搜索页点击事件
  searchconsle[0].addEventListener("touchstart", searchconsl);
  //获取每个历史记录div
  var historyitems = document.getElementsByClassName("hisitem");
  //获取每个热门城市div
  var hotcityitems = document.getElementsByClassName("hotcityitem");
 //添加点击历史记录点击事件
  for(var i=0;i<hotcityitems.length;i++)
{
  var v=hotcityitems[i];
  v.addEventListener("touchstart", function () {
    setCookie(this.innerText);
    console.log(this.innerText);
    writeinhtml(this.innerText);
    searchconsl();
  });
}
  console.log(historyitems)
  for(var i=0;i<historyitems.length;i++)
{
  var v=historyitems[i];
  console.log('smg',v);
  v.addEventListener("touchstart", function () {
    console.log(this.innerText);
    writeinhtml(this.innerText);
    searchconsl();
  });
}
//获取删除div
var hisdele=document.getElementById("delete");
console.log(hisdele)
//如果有删除div，添加删除点击事件
if(hisdele){
hisdele.addEventListener("touchstart",deletehis);
}
//搜索框搜索完成时回车事件
  document.onkeydown = async function (e) {
    if (e.which == 13) {
      var info = document.getElementById("search");
      info = info.value;
      console.log('putseccess')
      if (await Getlocation(info)) {
        setCookie(info);
        writeinhtml(info);
        searchconsl();
      }
    }
  };
  //获取每个生活指数div
  var lifeitems=document.getElementsByClassName("lifeitem");
  console.log("lifedata",lifeitems[0])
  //点击生活指数div是显示详情页函数
  function lifeshow(i,v)
  {
    var oldevent=0;
v.addEventListener("touchstart",(event)=>
{
oldevent=event.changedTouches[0].clientX
} 
);
v.addEventListener("touchend",(event)=> {
  var temp=oldevent-event.changedTouches[0].clientX
  if(temp<10&&temp>-10){
    console.log('1234',temp)
  var life=document.getElementsByClassName("lifedetailoff")[0];
  var html1=''
  console.log('click',lifedata[i])
  html1='<div class="lifetittle">'+lifedata[i].name+'</div>\
  <div class="lifetxt">'+lifedata[i].text+'</div>\
  <div class="closelife">我知道了</div>'
  life.innerHTML=html1;
  life.className="lifedetailon"
  container.style.filter="blur(1vw)"
  //关闭生活指数详情页
  var conslelife=document.getElementsByClassName("closelife")[0]
  conslelife.addEventListener("touchstart",function()
  {
    var lifeon=document.getElementsByClassName("lifedetailon")[0];
    lifeon.innerHTML=''
    lifeon.className="lifedetailoff"
    container.style.filter="none"
    
  })  
  }
})
  }
  //为每个生活指数div添加显示函数点击事件
for(var i=0;i<lifeitems.length;i++)
{
  var v=lifeitems[i];
  lifeshow(i,v)
}
}
writeinhtml();
