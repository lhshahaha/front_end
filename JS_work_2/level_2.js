var ary = [1, [2, [3, [4, 5]]], 6];
var arr_method1=[];
var arr_method2=[];
function even(arr) {
    var newarr = [];
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        newarr = newarr.concat(even(arr[i]));
      } else {
        newarr.push(arr[i]);
      }
    }
    return newarr;
  }
function even_2(arr){
    var newarr=[];
    newarr=arr.toString().split(",");
    return newarr;
}
arr_method1=even(ary);
arr_method2=even_2(ary);