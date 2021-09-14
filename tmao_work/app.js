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
      case ".ico":
        return "image/png";
      case ".gif":
        return "image/gif";
  }
};
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000"); // 设置可访问的源
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  let { url, method } = req;
  let extname = path.extname(url);
  const query = JSON.parse(
    JSON.stringify(querystring.parse(url.split("?")[1]))
  );
  url = url.split("?")[0];
  url = url == "/" ? "/index.html" : url;
    if (method === "GET") {
      fs.readFile("." + url, (err) => {
        if (err) {
          res.writeHead(404, { "Content-Type": 'text/html;charset="utf-8"' });
          res.end("404这个页面不存在");
        } else if (query.way == "autologin") {
          const raw = String(req.headers.authorization).split(" ").pop();
          const { token } = jwt.verify(raw, tokenkey);
          fs.readFile("./user/" + token + ".json", (err, data) => {
            if (!err) {
              var Data = JSON.parse(data.toString());
              if (Data.ip == req.socket.remoteAddress) {
                var senddata = {};
                senddata.name = Data.name;
                senddata.goods = Data.goods;
                senddata = JSON.stringify(senddata);
                res.end(senddata);
              } else {
                res.end(0);
              }
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
    if (method === "PUT") {
      if (query.way == "update") {
        let putData = "";
        req.on("data", (chunk) => {
          putData += chunk;
        });
        req.on("end", () => {
          putData = JSON.parse(putData);

          fs.readFile("./user/" + putData.name + ".json", (err, data) => {
            if (!err) {
              var Data = JSON.parse(data.toString());
              putData.password = Data.password;
              putData.ip = Data.ip;
              fs.writeFile(
                "./user/" + putData.name + ".json",
                JSON.stringify(putData),
                (error) => {
                  if (error) console.log(error);
                }
              );
              res.end(0);
            }
          });
        });
      } else if (query.way == "getsearch") {
        fs.readFile("./data/goods.json", (error, data) => {
          if (error) {
            console.log(error);
          } else {
            gooddata = JSON.parse(data.toString());
            var senddata = [];

            for (item in gooddata) {
              if (
                gooddata[item].city == query.city &&
                gooddata[item].name.search(query.goodname) >= 0
              ) {
                senddata.push(gooddata[item]);
              }
            }
            res.end(JSON.stringify(senddata));
          }
        });
      }
    }
    if (method === "POST") {
      let postData = "";
      req.on("data", (chunk) => {
        postData += chunk;
      });
      req.on("end", () => {
        postData = JSON.parse(postData);
      });
      fs.readdir("./user", function (err, files) {
        if (!err) {
          if (query.way == "register") {
            var wheexit = true;
            for (item in files) {
              if (files[item] == postData.name + ".json") {
                res.end(0);
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
                        Data.ip = req.socket.remoteAddress;
                        fs.writeFile(
                          "./user/" + postData.name + ".json",
                          JSON.stringify(Data),
                          (error) => {
                            if (error) console.log(error);
                          }
                        );
                        res.end(sendtoken);
                      } else {
                        res.end(0);
                      }
                    }
                  }
                );
              }
            }
            if (wheexit) {
              res.end(0);
            }
          }
        }
      });
    }
  
});

//监听8000端口,等待连接
server.listen(8000, () => {
  console.log("server is running at http://localhost:8000");
});
