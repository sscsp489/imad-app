var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var article1 = {
    title: 'article one',
    heading: 'first-article',
    content: 'this is the first article i am going to write on my first web app',
} ;  
var article2 = {
    title: 'article second',
    heading: 'second-article',
    content: 'this is the second article i am going to write on my first web app',
}  ;  

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




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
