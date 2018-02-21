var button = document.getElementById('counterr');
var counter= 0;

button.onclick = function () {
    
    
    
    
    counter = counter + 1 ;
    var span = document.getElementById('countt');
    span.innerHTML = counter.toString();
};