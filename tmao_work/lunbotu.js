var wrap = document.querySelector(".wrap");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
var clickflag = 1;
function animation(wrap_direction) {
  var newLeft = parseInt(wrap.style.left);
  clearInterval(wrap.change);
  clickflag = 0;
  if (wrap_direction) {
    if (newLeft <= -4500) {
      newLeft = 0;
    }
    wrap.style.left = newLeft + "px";
    var positionLeft = newLeft - 750;
    wrap.change = setInterval(function () {
      newLeft -= 20;
      wrap.style.left = newLeft + "px";
      if (newLeft <= positionLeft) {
        wrap.style.left = positionLeft + "px";
        clearInterval(wrap.change);
        clickflag = 1;
      }
    }, 1);
  } else {
    if (newLeft >= -750) {
      newLeft = -5250;
    }
    wrap.style.left = newLeft + "px";
    var positionLeft = newLeft + 750;
    wrap.change = setInterval(function () {
      newLeft += 20;
      wrap.style.left = newLeft + "px";
      if (newLeft >= positionLeft) {
        wrap.style.left = positionLeft + "px";
        clearInterval(wrap.change);
        clickflag = 1;
      }
    }, 1);
  }
}

function next_pic() {
  //var newLeft;
  if (wrap.style.left === "-4500px") {
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
  if (wrap.style.left === "-750px") {
    //newLeft = -4000;
    animation(0);
    index = 5;
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
  clearInterval(timer);
  timer = setInterval(function () {
    next_pic();
  }, 3000);
  window.onfocus = function () {
    console.log("onfocus");
    clearInterval(timer);
    timer = setInterval(function () {
      next_pic();
    }, 4000);
  };
  window.onblur = function () {
    console.log("onblur");
    clearInterval(timer);
  };
}
next.onclick = function () {
  if (clickflag == 1) {
    clearInterval(timer);
    next_pic();
  }
};
prev.onclick = function () {
  if (clickflag == 1) {
    clearInterval(timer);
    prev_pic();
  }
};
var container = document.querySelector(".container");
var containeron = 1;
container.onmouseenter = function () {
  containeron = 0;
  if (clickflag) {
    containeron = 1;
    clearInterval(timer);
  }
};
container.onmouseleave = function () {
  if (containeron) {
    autoPlay();
  }
};
var index = 0;
var dots = document.querySelectorAll(".buttons>span");
function showCurrentDot() {
  for (var i = 0, len = dots.length; i < len; i++) {
    dots[i].className = "";
  }
  dots[index].className = "on";
}
var hoverindex = -1;
var jumppoint = null;
for (var i = 0, len = dots.length; i < len; i++) {
  (function (i) {
    dots[i].onmouseenter = function () {
      hoverindex = i;
      (function (i) {
        clearTimeout(jumppoint);
        jumppoint = setTimeout(() => {
          console.log(123,i,hoverindex)
          if (i == hoverindex&&clickflag) {
            clearInterval(timer);
            clickflag=0;
            var newLeft = parseInt(wrap.style.left);
            var positionLeft = -750 - i * 750;
            if (newLeft > positionLeft) {
              console.log(clickflag);
              dotsclick = setInterval(function () {
                newLeft -= 20;
                wrap.style.left = newLeft + "px";
                if (newLeft <= positionLeft) {
                  wrap.style.left = positionLeft + "px";
                  clickflag = 1;
                  clearInterval(dotsclick);
                  hoverindex = -1;
                }
              }, 1);
            } else if (newLeft < positionLeft) {
              console.log(clickflag);
              dotsclick = setInterval(function () {
                newLeft += 20;
                wrap.style.left = newLeft + "px";
                if (newLeft >= positionLeft) {
                  wrap.style.left = positionLeft + "px";
                  clickflag = 1;
                  clearInterval(dotsclick);
                  hoverindex = -1;
                }
              }, 1);
            }else
            {
              clickflag=1;
            }
            index = i;
            showCurrentDot();
            autoPlay();
          }
        }, 300);
      })(i);
    };
  })(i);
}
autoPlay();
showCurrentDot();
