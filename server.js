var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pd').pool;
var config = {
    user : 'sscsp489' ,
    database : 'sscsp489',
    host : 'db.imad.hasura-app.io',
    port : '5432'
    password : process.env.DB_PASSWORD 
};


var app = express();
app.use(morgan('combined'));



function createtemplate(data){
   var title = data.title;
   var heading = data.heading;
   var content = data.content;
    var htmltemplate = `<!DOCTYPE html>
  <html>
      <head>
          <title>
              ${title}
          </title>
          <link href="/ui/style.css" rel="stylesheet" />
         
        </head>
      <body>
          <h1>${heading}</h1>
          <p>${content}</p>
      </body>
      
  </html>
`;
return htmltemplate;
}

var counter = 0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  
});
var pool = new pool(config);

app.get('/test-db' , function (req,res) {
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err, toString());
            
        }else {
            res.send(JSON.stringify(result));
        }
    });
});
app.get('/article1',function (req, res) {
  res.send(createtemplate(article1));
});
app.get('/article2',function (req, res) {
    res.send(createtemplate(article2));  
});
app.get('/article3',function(req, res) {
     res.sendFile(path.join(__dirname, 'ui', 'article-third.html'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
  
});
app.get('/ui/main.js',function (req,res) {
    res.sendFile(path.join(__dirname, 'ui' , 'main.js'));
    
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
