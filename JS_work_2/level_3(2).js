function Animal() {
  this.species = "动物";
}
function Cat(name, color) {
  this.name = name;
  this.color = color;
}
var animal = new Animal();
//new一个猫的对象cat1也拥有了“动物”的species属性
var cat1 = new Cat("大毛", "黄色");
cat1.species = animal.species;
console.log(cat1.species); // 动物
