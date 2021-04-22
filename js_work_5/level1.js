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
  function getmessage({
    method = "GET",
    url = "http://musicapi.leanapp.cn/personalized",
    syn = true,
    func = writepersonalized,
  }) {
    //实例化XMLHttpRequest对象
    const xhr = new XMLHttpRequest();
    //初始化一个get请求
    xhr.open(method, url, syn);
    //接收返回值
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          const res = JSON.parse(xhr.responseText);
          console.log(url);
          console.log(res.result);
          console.log("请求成功");
          func(res.result);

          // do something
        } else {
          console.log("请求失败");
          console.log(xhr.status);
        }
      }
    };
    //发送请求
    xhr.send();
  }