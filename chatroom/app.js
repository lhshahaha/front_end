const websock = require("nodejs-websocket");
var server=websock.createServer(function (conn) {
    conn.on("text", function (str) {
      var data = JSON.parse(str);
      switch (data.type) {
        case "setname":
          conn.nickname = data.name;
          Broadcast(data.name + "加入了房间");
          break;
        case "text":
            Broadcast(data.text);
            break;
        default:
            Broadcast(data.nickname + "发生未知错误");
      }
    });
    conn.on('close',()=>
    {
        Broadcast(data.nickname + "退出房间");
    });
    conn.on('error',(err)=>
    {
        console.log(err);
    })

  })
  .listen(8000);
    function Broadcast(str) 
    {
        server.connections.forEach((conn) => {
            conn.sendText(str)
        });
    }
console.log("Server running at http://127.0.0.1:8000/");
