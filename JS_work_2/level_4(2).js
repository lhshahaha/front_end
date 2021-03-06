var data = {
    age: 18,
    name: "liuruchao",
    education: ["小学", "初中", "高中", "大学", undefined, null],
    likesFood: new Set(["fish", "banana"]),
    friends: [
          { name: "summer",  sex: "woman"},
          { name: "daWen",   sex: "woman"},
          { name: "yang",    sex: "man" }  ], 
    work: { 
            time: "2019", 
            project: { name: "test",obtain: ["css", "html", "js"]} 
          }, 
    play: function() {    console.log("玩滑板");  }
}
let deepClone = function (data) {
      var newdata = Object.create(Object.getPrototypeOf(data));
      var dataNames = Object.getOwnPropertyNames(data);
      dataNames.forEach(function (Names) {
          let name_information = Object.getOwnPropertyDescriptor(data, Names);
          Object.defineProperty(newdata, Names, name_information);
  
      });
      return newdata;
  };
  let newdata = deepClone(data);
  console.log(newdata);