function Ajax() {
    this.method = "GET";
    this.url = "http://musicapi.leanapp.cn/personalized";
    this.url2 = "http://musicapi.leanapp.cn/search?keywords=";
    this.syn = true;
    //实例化XMLHttpRequest对象
    this.getpersonalized = function () {
      const xhr = new XMLHttpRequest();
      //初始化一个get请求
      xhr.open(this.method, this.url, this.syn);
      //接收返回值
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (
            (xhr.status >= 200 && xhr.status < 300) ||
            xhr.status == 304
          ) {
            const res = JSON.parse(xhr.responseText);
            console.log(this.url);
            console.log(res.result);
            console.log("请求成功");
            var html = "";
            res.result.forEach((v) => {
              html +=
                '<div class="item"><img src=' +
                v.picUrl +
                ">" +
                '<div class="tittle">' +
                v.name +
                "</div></div>";
            });
            document.getElementById("container").innerHTML = html;

            // do something
          } else {
            console.log("请求失败");
            console.log(xhr.status);
          }
        }
      };
      //发送请求
      xhr.send();
    };
    this.getsearch = function (v) {
      this.url2 = this.url2 + v;
      const xhr = new XMLHttpRequest();
      //初始化一个get请求
      xhr.open(this.method, this.url2, this.syn);
      //接收返回值
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (
            (xhr.status >= 200 && xhr.status < 300) ||
            xhr.status == 304
          ) {
            const res = JSON.parse(xhr.responseText);
            console.log(this.url2);
            console.log(res.result);
            console.log("请求成功");
            var html = "";
            var i = 0;
            res.result.songs.forEach((v) => {
              html += '<div class="search_item"';
              if (i % 2 == 0) {
                html += ' style="background-color: bisque;"';
              }
              html += '><div class="songtittle">' + v.name + "</div>";
              html += "<div class=singgercom>";
              v.artists.forEach((v) => {
                html += '<div class="singger">' + v.name + "</div>";
              });
              html +=
                '</div><div class="album">' + v.album.name + "</div></div>";
              i++;
            });
            document.getElementById("container").innerHTML = html;
            // do something
          } else {
            console.log("请求失败");
            console.log(xhr.status);
          }
        }
      };
      //发送请求
      xhr.send();
    };
  }