var wrap = document.querySelector(".wrap");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
function animation(wrap_direction) {
    var newLeft = parseInt(wrap.style.left);
    clearInterval(wrap.change);
    if(wrap_direction){
  if(newLeft==-5000)
  {
      newLeft=0;
  }
  wrap.style.left = newLeft + "px";
  var positionLeft = newLeft-1000;
  console.log(newLeft);
  wrap.change = setInterval(function () {
    newLeft -= 10;
    wrap.style.left = newLeft + "px";
    if (newLeft <= positionLeft) {
        clearInterval(wrap.change);
      }
  }, 10);}
  else
  {
    if(newLeft==-1000)
    {
        newLeft=-6000;
    }
    wrap.style.left = newLeft + "px";
    var positionLeft = newLeft+1000;
    console.log(newLeft);
    wrap.change = setInterval(function () {
      newLeft += 10;
      wrap.style.left = newLeft + "px";
      if (newLeft >= positionLeft) {
          clearInterval(wrap.change);
        }
    }, 10);
  }
}
var clickflag=1;
next.onclick = function () {
    if(clickflag==1)
    {
        next_pic();
        clickflag=0;
        next.style.cursor="wait";
        prev.style.cursor="wait";
        setTimeout(function()
        {
            clickflag=1;
            next.style.cursor="pointer";
        },2000);
    }
};
prev.onclick = function () {
    if(clickflag==1)
    {
        prev_pic()
        clickflag=0;
        next.style.cursor="wait";
        prev.style.cursor="wait";
        setTimeout(function()
        {
            clickflag=1;
            next.style.cursor="pointer";
        },2000);
    }
};
function next_pic() {
  //var newLeft;
  if (wrap.style.left === "-5000px") {
    animation(1);
    index = 0;
  } else {
    animation(1);
    // newLeft = parseInt(wrap.style.left)-1000;
    index++;
  }
  showCurrentDot();
  // wrap.style.left = newLeft + "px";
}
function prev_pic() {
  //var newLeft;
  if (wrap.style.left === "-1000px") {
    //newLeft = -4000;
    animation(0);
    index = 4;
  } else {
    //newLeft = parseInt(wrap.style.left) + 1000;
    animation(0);
    index--;
  }
  showCurrentDot();
  //wrap.style.left = newLeft + "px";
}
var timer = null;
function autoPlay() {
  timer = setInterval(function () {
    clickflag=0;
    next.style.cursor="wait";
    prev.style.cursor="wait";
    setTimeout(function()
    {
        clickflag=1;
        next.style.cursor="pointer";
    },2000);
    next_pic();
  }, 3000);
}
var container = document.querySelector(".container");
container.onmouseenter = function () {
  clearInterval(timer);
};
container.onmouseleave = function () {
autoPlay();
};
var index = 0;
var dots = document.getElementsByTagName("span");
function showCurrentDot() {
  for (var i = 0, len = dots.length; i < len; i++) {
    dots[i].className = "";
  }
  dots[index].className = "on";
}
for (var i = 0, len = dots.length; i < len; i++) {
  (function (i) {
    dots[i].onclick = function () {
      wrap.style.left = -1000-(i* 1000) + "px";
      index = i;
      showCurrentDot();
    };
  })(i);
}
autoPlay();
showCurrentDot();
