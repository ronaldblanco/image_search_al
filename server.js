var port = process.env.PORT || 5000 || 8080;//FOR HEROKU port Asignation
var express = require('express');
var mongo = require('mongodb').MongoClient;
//var mongourl = "mongodb://localhost:27017/";//local
var mongourl = "mongodb://short:short@ds129281.mlab.com:29281/";//remote
var dbname = "urlshortener";
var url = require('url');
//var request = require('request');
var scrapinggooglesearch = require('./scrapinggooglesearch.js'); 
var app = express();



//var newDoc = undefined;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/imagesearch/*', function (req, res) {
    
    //req info VAR
    var href = url.parse(req.url).href; //all GET
    //imagesearch/lolcats%20funny?offset=10
    //var pahtname = url.parse(req.url).pahtname; //only path
    var criteria = url.parse(req.url).href.toString().split('?')[0].split('/')[2]; //only path
    var query = url.parse(req.url).query; //only query ?
    var cant_offset = parseInt(query.toString().split('=')[1]);
    //var method = req.method;
    //Loging Activity
    var mydate = new Date();
    console.log(mydate+'-->IMAGE SEARCH!');
    console.log(href.toString());
    //console.log(pahtname);
    console.log(criteria);
    console.log(query);
    console.log(cant_offset);
    //console.log(href.toString().split('/')[2]+'//'+href.toString().split('/')[href.toString().split('/').length - 1]);
    //res.redirect(href.toString().split('/')[2]+'//'+href.toString().split('/')[4]);//OK READY
    
    //Preparing json History of search
    var myJson;
    //myJson = JSON.stringify({
    myJson ={
        'search': criteria,// 3 dijits
        'date': mydate
    };
    
    function getModule(error,result,next,body){
        //console.log(error);
        //console.log({'result':result});
        console.log(next);
        res.send(body);
        //if(error === null) res.send({'result':result});
        //else res.send({'error':error});
    }
    
    scrapinggooglesearch(criteria,getModule);//using my module
    
  //res.send();
});

app.get('/checkurl/*', function (req, res) {
    
    var href = url.parse(req.url).href; //all GET
    var input = href.toString().split('/');
    /*console.log('input->'+input);
    console.log('input 2->'+input[2]);
    console.log('input last->'+input[input.length - 1]);*/
    var final = '';
    var check = input[2]+'//'+input[input.length - 1];
    //var final = '';
    check = check.match("^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]");
    //console.log('2->'+check);
    if(check != null)final = check[0];
    else final = check;
    
    if(check != null){//if the url is valid
    mongo.connect(mongourl+dbname,function(err,db){
        if(err)throw err;
        var collection = db.collection('shortener');
        
        collection.find({
            org_url: final
        }).toArray(function(err,doc){
            console.log('err->'+err);
            console.log('doc->'+doc);
            //if(doc != []){
                //console.log('Exist->'+doc[0].org_url);
                //add = false;
                //res.send({'shortened_URL':req.protocol + '://' + req.get('host') + '/' + doc[0].new_id});
                res.send({'docs':doc});
            //}else res.send({'shortened_URL':'NO DOC.'});
            //res.redirect(doc[0].org_url);//OK READY
        });

       db.close; 
    })
        
        
    }
    
    
});

app.get('/checkshort/*', function (req, res) {
    
    var href = url.parse(req.url).href; //all GET
    console.log(href.toString());
    var id = href.toString().split('/')[2];
    
    mongo.connect(mongourl+dbname,function(err,db){
        if(err)throw err;
        var collection = db.collection('shortener');
        
        collection.find({
            new_id: id
        }).toArray(function(err,doc){
            if(err)throw err;
            console.log(doc);
            res.send({'doc':doc});
            //res.redirect(doc[0].org_url);//OK READY
        })
        db.close();
    })
    
});

app.get('*', function (req, res) {
    
    var href = url.parse(req.url).href; //all GET
    console.log(href.toString());
    var id = href.toString().split('/')[1];
    
    //check if the short exist
    //fCheckurl(req.protocol + '://' + req.get('host') + '/checkurl/' + final);
    request(req.protocol + '://' + req.get('host') + '/checkshort/' + id, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred 
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        console.log('body:', JSON.parse(body).doc.length); // Print the HTML for the Google homepage. 
        //var newDoc = undefined;
        var checkurl = [];
        if(error == null){
            checkurl = JSON.parse(body);
            if(checkurl.doc.length > 0) res.redirect(checkurl.doc[0].org_url);//OK READY
            else if (checkurl.doc.length === 0) res.send("Not a Valid Shortener!");
            else res.send('Error Accesing Database!');
            //console.log('newDoc in function->'+newDoc);
        }
    });
    
    /*mongo.connect(mongourl+dbname,function(err,db){
        if(err)throw err;
        var collection = db.collection('shortener');
        
        collection.find({
            new_id: id
        }).toArray(function(err,doc){
            if(err)throw err;
            console.log(doc);
            //res.send(doc);
            res.redirect(doc[0].org_url);//OK READY
        })
        db.close();
    })*/
    
});

app.listen(port, function () {
  console.log('Image Search A Layer Api Server listening on port '+port+'!');
});



