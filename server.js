var port = process.env.PORT || 5000 || 8080;//FOR HEROKU port Asignation
var express = require('express');
var url = require('url');
var scrapingmanager = require('./scrapingmanager.js');
var mongoccontrol = require('./mongoccontrol.js');
var app = express();

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/imagesearch/*', function (req, res) {
    
    //req info VAR
    var send = false;
    //finalResult = [];
    var href = url.parse(req.url).href; //all GET
    //imagesearch/lolcats%20funny?offset=10
    //var pahtname = url.parse(req.url).pahtname; //only path
    var criteria = url.parse(req.url).href.toString().split('?')[0].split('/')[2]; //only path
    var query = url.parse(req.url).query; //only query ?
    var cant_offset = 10;//parseInt(query.toString().split('=')[1]);
    if(query) cant_offset = parseInt(query.toString().split('=')[1]);
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
    
    function callbackmongo(err,data){
        if(err == null)console.log(data);
        else console.log(err);
    }
    
    mongoccontrol("add",myJson,null,callbackmongo);
    
    function callback(error,result){
        //console.log(newResult);
        //console.log(allResult);
        if(error == null && send == false){
            res.send({'result':result});
            console.log('result.length->'+result.length);
            send = true;
        } 
        //else res.send({'error':error});
    }
    
    scrapingmanager(criteria,cant_offset,callback);//using my module
   
});

app.get('/latest/imagesearch/*', function (req, res) {
    
    var href = url.parse(req.url).href; //all GET
    var input = href.toString().split('/')[3];
    console.log('input->'+input);
    
      var myJson = {
          //search : input
      };
      
      /*var myAgg = [
        {$sort: { date: -1 }},
        {$group: { _id: "$itemId", 
            date: {$first: "$date"},
            search: {$first: "$search" }//,
            //date: {$second: "$date"},
            //search: {$second: "$search" }//,
            //field2: {$first: "$field2" }
        }},
        {$match: { search: input }}
    ];*/
      
      function callbackmongo(err,data){
        if(err == null){
           var output = [];
           if(data.length <= 10){
               for(var a = (data.length - 1); a > -1; a--){
                    output.push({search: data[a].search, date: data[a].date.toISOString()});
                }
           }else{
               for(var a = (data.length - 1); a > data.length - 11; a--){
                    output.push({search: data[a].search, date: data[a].date.toISOString()});
                }
           }
           
           res.send(output);
        }
        else console.log(err);
    }
    
    //mongoccontrol("agg",myAgg,null,callbackmongo);
    mongoccontrol("find",myJson,null,callbackmongo);
    
});

app.get('*', function (req, res) {
    
    var href = url.parse(req.url).href; //all GET
    console.log(href.toString());
    var id = href.toString().split('/')[1];
    
    res.send(id+" it is Not a Valid Page!");
    
    //check if the short exist
    //fCheckurl(req.protocol + '://' + req.get('host') + '/checkurl/' + final);
    /*request(req.protocol + '://' + req.get('host') + '/checkshort/' + id, function (error, response, body) {
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
    });*/
    
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



