module.exports = function (criteria,cant_offset,callback){

var scrapinggooglesearch = require('./scrapinggooglesearch.js');
var newResult = [];

function adjust(result){
    if(result.length > cant_offset){
        var diff = result.length - cant_offset;
        for(var a = 0; a < diff; a++){
            result.pop();
        }
    }
    return result;
}

 function getModule(error,result,body){
        //console.log('getModule');
        //console.log(error);
        if(error === null){
            
            if(newResult.length >= cant_offset) callback(error,adjust(newResult));
            if(newResult.length < cant_offset){
                for(var a = 0; a < (result.length); a++){
                    newResult.push(result[a]); 
                }
                //newResult.push(result); //res.send({'result':allResult});
                //console.log(newResult.length +' > '+cant_offset);
                //console.log(newResult.length +' > '+cant_offset);
                if(newResult.length > cant_offset){
                    //res.send({'result':newResult});
                    callback(error,adjust(newResult));
                    //break;
                } 
            } //else callback(error,adjust(newResult));//res.send({'result':newResult});
        } //callback(result);//res.send(body);
        //else res.send({'error':error});
    }
    
    var start = 1;
    for(start = 1; start < (cant_offset); start = start + 19){
        scrapinggooglesearch(criteria,start.toString(),cant_offset,getModule);//using my module
    }
 
    
}