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
  function getmessage(url = "http://musicapi.leanapp.cn/personalized") {
    fetch(url, { method: "GET" }).then((res) => {
      res
        .json(() => {})
        .then((res) => {
          if (url.indexOf("keywords")!=-1) {
            console.log("search");
            writesearch(res.result);
          } else {
              console.log("load");
            writepersonalized(res.result);
          }
        })
        .catch(() => {console.log("fall");});
    });
  }