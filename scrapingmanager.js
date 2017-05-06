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
        console.log('getModule');
        console.log(error);
        if(error === null){
            
            if(newResult.length < cant_offset){
                for(var a = 0; a < (result.length); a++){
                    newResult.push(result[a]); 
                }
                //newResult.push(result); //res.send({'result':allResult});
                //console.log(newResult.length +' > '+cant_offset);
                console.log(newResult.length +' > '+cant_offset);
                if(newResult.length > cant_offset){
                    //res.send({'result':newResult});
                    callback(error,adjust(newResult));
                    //break;
                } 
            } else callback(error,adjust(newResult));//res.send({'result':newResult});
        } //callback(result);//res.send(body);
        //else res.send({'error':error});
    }
    
    var start = 1;
 
    scrapinggooglesearch(criteria,start.toString(),cant_offset,getModule);//using my module
    if(cant_offset > (start + 18)) scrapinggooglesearch(criteria,(start + 18).toString(),cant_offset,getModule);//using my module
    if(cant_offset > 38) scrapinggooglesearch(criteria,'39',cant_offset,getModule);//using my module
    if(cant_offset > 57) scrapinggooglesearch(criteria,'58',cant_offset,getModule);//using my module
    if(cant_offset > 76) scrapinggooglesearch(criteria,'77',cant_offset,getModule);//using my module
    if(cant_offset > 95) scrapinggooglesearch(criteria,'95',cant_offset,getModule);//using my module
    if(cant_offset > 114) scrapinggooglesearch(criteria,'114',cant_offset,getModule);//using my module
    if(cant_offset > 133) scrapinggooglesearch(criteria,'133',cant_offset,getModule);//using my module
    if(cant_offset > 152) scrapinggooglesearch(criteria,'152',cant_offset,getModule);//using my module
    if(cant_offset > 171) scrapinggooglesearch(criteria,'171',cant_offset,getModule);//using my module
    if(cant_offset > 190) scrapinggooglesearch(criteria,'190',cant_offset,getModule);//using my module
    if(cant_offset > 209) scrapinggooglesearch(criteria,'209',cant_offset,getModule);//using my module
  
}