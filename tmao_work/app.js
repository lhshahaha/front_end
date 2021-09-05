const fs = require("fs");
const http = require("http");
const querystring = require("querystring");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { send } = require("process");
const tokenkey = "csa";
var getmime = function (extname) {
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/x-javascript";
    case ".jpg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".json":
      return "application/json";
  }
};
const server = http.createServer((req, res) => {
  let { url, method } = req;

  let extname = path.extname(url);
  const query = JSON.parse(
    JSON.stringify(querystring.parse(url.split("?")[1]))
  );
  url = url.split("?")[0];
  url = url == "/" ? "/index.html" : url;
  if (url != "/favicon.ico") {
    if (method === "GET") {
      fs.readFile("." + url, (err) => {
        if (err) {
          res.writeHead(404, { "Content-Type": 'text/html;charset="utf-8"' });
          res.end("404这个页面不存在");
        } else if (query.way == "getsearch") {
          fs.readFile("./data/goods.json", (error, data) => {
            if (error) {
              console.log(error);
            } else {
              gooddata = JSON.parse(data.toString());
              var senddata = [];

              for (item in gooddata) {
                console.log(
                  query.goodname,
                  gooddata[item].name,
                  gooddata[item].name.search(query.goodname)
                );
                if (
                  gooddata[item].city == query.city &&
                  gooddata[item].name.search(query.goodname) >= 0
                ) {
                  senddata.push(gooddata[item]);
                  console.log(gooddata[item]);
                }
              }
              res.end(JSON.stringify(senddata));
              console.log("senddata", senddata);
            }
          });
        } else if (query.way == "autologin") {
          const raw = String(req.headers.authorization).split(" ").pop();
          console.log("123", raw);
          console.log("222", jwt.verify(raw, tokenkey));
          const { token } = jwt.verify(raw, tokenkey);
          console.log("tokenname", token);
          fs.readFile("./user/" + token + ".json", (err, data) => {
            if (!err) {
              var Data = JSON.parse(data.toString());
              var senddata = {};
              senddata.name = Data.name;
              senddata.goods = Data.goods;
              senddata=JSON.stringify(senddata)
              res.end(senddata);
              console.log(senddata);
            }
          });
        } else {
          let mime = getmime(extname);
          res.writeHead(200, {
            "Content-Type": "" + mime + ';charset="utf-8"',
          });
          var Data = [];
          var rs = fs.createReadStream("." + url);
          rs.once("open", () => {});
          rs.on("data", (data) => {
            Data.push(data);
          });
          rs.once("close", () => {
            res.end(Buffer.concat(Data));
          });
        }
      });
    }
    if (method === "POST") {
      let postData = "";
      req.on("data", (chunk) => {
        postData += chunk;
      });
      req.on("end", () => {
        postData = JSON.parse(postData);
        console.log("post", postData);
      });
      fs.readdir("./user", function (err, files) {
        if (!err) {
          if (query.way == "register") {
            var wheexit = true;
            for (item in files) {
              if (files[item] == postData.name + ".json") {
                res.end("0");
                var wheexit = false;
              }
            }
            if (wheexit) {
              postData.goods = [];
              postData.password = bcrypt.hashSync(postData.password, 10);
              fs.writeFile(
                "./user/" + postData.name + ".json",
                JSON.stringify(postData),
                (error) => {
                  if (error) console.log(error);
                }
              );
              res.end("1");
            }
          }
          if (query.way == "enterin") {
            var wheexit = true;
            for (item in files) {
              if (files[item] == postData.name + ".json") {
                var wheexit = false;
                fs.readFile(
                  "./user/" + postData.name + ".json",
                  (err, data) => {
                    if (!err) {
                      Data = JSON.parse(data.toString());

                      if (
                        bcrypt.compareSync(postData.password, Data.password)
                      ) {
                        var sendtoken = jwt.sign(
                          { token: Data.name },
                          tokenkey
                        );

                        res.end(sendtoken);
                      } else {
                        res.end("0");
                      }
                    }
                  }
                );
              }
            }
            if (wheexit) {
              res.end("0");
            }
          }
          if (query.way == "update") {
            fs.readFile("./user/" + postData.name + ".json", (err, data) => {
              if (!err) {
                var Data = JSON.parse(data.toString());
                postData.password = Data.password;
                fs.writeFile(
                  "./user/" + postData.name + ".json",
                  JSON.stringify(postData),
                  (error) => {
                    if (error) console.log(error);
                  }
                );
              }
            });
          }
        }
      });
    }
  }
});

//监听8000端口,等待连接
server.listen(8000, () => {
  console.log("server is running at http://localhost:8000");
});