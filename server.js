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
var articles = {
    'article-one' : {
        title : 'article 1',
        heading : 'first article',
        date : 'feb 1,2018',
        content : 'this my first article'
        
        
    },
    'article-second' : {
        title : 'article 2',
        heading : 'second article',
        date : 'feb 3,2018',
        content : 'this my second article'
        
        
    },
     'article-third' : {
        title : 'article 3',
        heading : 'third article',
        date : 'feb 10,2018',
        content : 'this my third article'
        
        
    }
    
    
};




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
          <div>${date.toDateString()}
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
appp.get('/articles/:articleName',function(err,result){
    
    
    pool.query("SELECT * FROM article WHERE title = '"+req.params.articleName"'",function(req,res ){
        if (err){
            res.status(500).send(err,toString());
        } else {
            if (result.row.length === 0)
            { res.status(404).send('article not found');
            }
            else{
                var articleData = result.rows[0];
                res.send(createtemplate(articleData));
                
            }
        }
    } );
    
    
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
