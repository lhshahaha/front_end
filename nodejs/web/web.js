const fs = require("fs");
const http = require("http");
const querystring = require("querystring");
const path = require("path");
const formidable =require("formidable")
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
  }
};
const server = http.createServer((req, res) => {
  let { url, method } = req;
  url = url == "/" ? "/index.html" : url;
  console.log('url',url)
  let extname = path.extname(url);
  const Path = url.split("?")[0];
  const query = querystring.parse(url.split("?")[1]);
  if (url != "/favicon.ico") {
    if (method === "GET") {
      // fs.readFile("." + url, (err, data) => {
      // if (err) {
      //   res.writeHead(404, { "Content-Type": 'text/html;charset="utf-8"' });
      //   res.end("404这个页面不存在");
      // }
      //   let mime = getmime(extname);
      //   res.writeHead(200, { "Content-Type": ''+mime+';charset="utf-8"' });
      //   res.end(data);
      // });
      fs.readFile("." + url, (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": 'text/html;charset="utf-8"' });
          res.end("404这个页面不存在");
        }
      });
      let mime = getmime(extname);
      res.writeHead(200, { "Content-Type": "" + mime + ';charset="utf-8"' });
      var Data=[];
      var rs = fs.createReadStream("." + url);
      rs.once("open", () => {
        console.log("流打开了");
      });
      rs.on("data", (data) => {
        Data.push(data);
      });
      rs.once("close", () => {
        console.log("流关闭了");
        res.end(Buffer.concat(Data));
      });
    }
    if (method === "POST") {
      // var tmp=''
      // var ws = fs.createWriteStream("./data/1.jpg");          
      //     ws.once("open", () => {console.log("写文件")});
      //     ws.once("close", () => {console.log("读文件");});
          
      // req
      //   .on("data", (chunk) => {
      //     ws.write(chunk);
      //     tmp+=chunk
      //   })
      //   .on("end", () => {
      //     res.end("上传成功");
      //     ws.end();
      //   });
      var form=new formidable.IncomingForm();
      console.log(1,form);
      form.uploadDir='./data/';
      form.parse(req,function(err,fields,files){
          if(err){
              console.log('解析失败')
          }
          console.log(2,fields)
          console.log(3,files);
          var oldpath=files.file.path;
          console.log(4,files.file.name);
          fs.rename(oldpath,'./data/'+files.file.name,function(err){
              if(err){
                  console.log('改名失败')
              }
          })
          res.end('ok');
      })
    }
  }
});

//监听8000端口,等待连接
server.listen(8000, () => {
  console.log("server is running at http://localhost:8000");
});
