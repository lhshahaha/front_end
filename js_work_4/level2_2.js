for (var i = 0; i < 5; i++) {
    (function(i){
        setTimeout(function() {
            console.log(new Date, i);
        }, 1000*i);
    })(i);
}
setTimeout(function() {
    console.log(new Date, i);
}, 5000);
