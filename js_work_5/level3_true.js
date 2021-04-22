console.log("调用成功！！");
function writesearch(res) {
  var html = "";
  var i = 0;
  res.songs.forEach((v) => {
    html += '<div class="search_item"';
    if (i % 2 == 0) {
      html += ' style="background-color: bisque;"';
    }
    html += '><div class="songtittle">' + v.name + "</div>";
    html += "<div class=singgercom>";
    v.artists.forEach((v) => {
      html += '<div class="singger">' + v.name + "</div>";
    });
    html += '</div><div class="album">' + v.album.name + "</div></div>";
    i++;
  });
  document.getElementById("container").innerHTML = html;
}
function writepersonalized(res) {
  var html = "";
  res.forEach((v) => {
    html +=
      '<div class="item"><img src=' +
      v.picUrl +
      ">" +
      '<div class="tittle">' +
      v.name +
      "</div></div>";
  });
  document.getElementById("container").innerHTML = html;
}
function Ajax(obj) {
  this.get = function (url, get_obj) {
    if (url.indexOf("search") != -1) {
      console.log("search");
      var arr = [];
      for (var i in get_obj.data) {
        var str = i + "=" + get_obj.data[i];
        arr.push(str);
      }
      var Str = arr.join("&");
      url += "?" + Str;
      console.log(url);
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      //接收返回值
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            const res = JSON.parse(xhr.responseText);
            get_obj.success();
            writesearch(res.result);
            console.log(url);
            console.log(res.result);
          } else {
            get_obj.error();
            console.log(url);
            console.log(res.result);
          }
        }
      };
      xhr.send();
    } else {
      console.log("personalized");
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            const res = JSON.parse(xhr.responseText);
            get_obj.success();
            writepersonalized(res.result);
            console.log(url);
            console.log(res.result);
          } else {
            get_obj.error();
          }
        }
      };
      //发送请求
      xhr.send();
    }
  };
  this.post = function (url, post_obj) {
    console.log("search");
    var arr = [];
    for (var i in post_obj.data) {
      var str = i + "=" + post_obj.data[i];
      arr.push(str);
    }
    var Str = arr.join("&");
    url += "?" + Str;
    console.log(url);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    //接收返回值
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          const res = JSON.parse(xhr.responseText);
          post_obj.success();
          writesearch(res.result);
          console.log(url);
          console.log(res.result);
        } else {
          post_obj.error();
          console.log(url);
          console.log(res.result);
        }
      }
    };
    xhr.send();
  };
}
