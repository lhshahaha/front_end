for (var i = 0; i < 5; i++) {
    (function(j){
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000);
    })(i);
}
console.log(new Date, i);