module.exports = function (ope,input,output,callback){
    
    var mongo = require('mongodb').MongoClient;
    //var mongourl = "mongodb://localhost:27017/";//local
    var mongourl = "mongodb://short:short@ds129281.mlab.com:29281/";//remote
    var dbname = "urlshortener";
    var cname = "imagesearchal";
    
    if(ope == "add"){
        
        mongo.connect(mongourl+dbname,function(err,db){
        console.log('mongo connect');
        if(err)throw err;
        var collection = db.collection(cname);
        //var add = undefined;

        //if(add === true && add != undefined){
            collection.insert(input,function(err,data){
                console.log('collection insert');
                //if(err)throw err;
                //console.log(data);
                callback(err,data);
                //res.send({'shortened_URL':req.protocol + '://' + req.get('host') + '/' + myJson.new_id});
                db.close;
            });
        //} 
        
        });
    }
    
}