var data = {
  age: 18,
  name: "liuruchao",
  education: ["小学", "初中", "高中", "大学", undefined, null],
  likesFood: new Set(["fish", "banana"]),
  friends: [
    { name: "summer", sex: "woman" },
    { name: "daWen", sex: "woman" },
    { name: "yang", sex: "man" },
  ],
  work: {
    time: "2019",
    project: { name: "test", obtain: ["css", "html", "js"] },
  },
  play: function () {
    console.log("玩滑板");
  },
};
var newdata = {};
function deepclone(newdata, data) {
  for (var k in data) {
    if (data[k] instanceof Array) {
      newdata[k] = [];
      deepclone(newdata[k], data[k]);
    } else if (typeof data[k] === "function") {
      newdata[k] = data[k].bind(newdata[k]);
    } else if (data[k] instanceof Object) {
      if (data[k].constructor == Set) {
        newdata[k] = new Set();
        for(var i of data[k]){
          newdata[k].add(i);
        }
      } else {
        newdata[k] = {};
        deepclone(newdata[k], data[k]);
      }
    } else {
      newdata[k] = data[k];
    }
  }
}
deepclone(newdata, data);
console.log(newdata);
