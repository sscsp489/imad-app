var button = document.getElementByClass('counterr');


button.onclick = function () {
    var request = new XMLHttprequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttprequest.DONE){
            if(request.status === 200 ) {
                var counter = request.responseText;
                var span = document.getElementByClass('countt');
                span.innerHTML = counter.toString();
                
            }
        }
        
    };
    
request.open('GET','http://sscsp489.imad.hasura-app.io/counter',true);
request.send(null);

    
   
};