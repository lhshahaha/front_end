let str = "I'm?���going�??�to�?�take�??�a?�trip�?�to��?daocheng�?�on��May Day.";
function changeStr(str) {
  for (var i = 0; i < str.length; i++) {
    var n = str.search(/�\?[a-z]/i);
    if (n != -1) {
      temp = str[n + 2].toUpperCase();
      str = str.replace(str[n + 2], temp);
    }
    if (str[i] == "�" || str[i] == "?") {
      str = str.replace(str[i], " ");
    }
  }
  str = str.replace(/\s+/g, " ");
  return str;
}
txt = changeStr(str);
console.log(txt); // 'I'm going to take a trip to Daocheng on May Day.'
