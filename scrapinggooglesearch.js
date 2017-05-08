//Module that scrap google search of photos
//20 at time

module.exports = function (search,start,end,callback){
    
    var request = require('request');
    var unhtml = require('unhtml');
    var result = [];
    var temp =[];
    //var gBody = undefined;
    //var gError = null;
    var urlsearch = '';
    
    /*if(urlfull === null) */urlsearch = 'https://www.google.com/search?q='+ search +'&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiyocuqvNTTAhWGNSYKHUrjDiQQ_AUIBigB&biw=2910&bih=966&start='+ start +'&sa=N';
    //else urlsearch = urlfull;

    function cleanCite(cite){
        var result = [];
        cite[0] = cite[0].split('">')[0];
        for(var a = 0; a < cite.length; a++){
            result.push(unhtml(cite[a].toString().replace('"','').replace('</cite>','').replace('&times;','x').replace('&nbsp;-&nbsp;',' - ').replace('&#8211;','-')));
            //result.push(unhtml(cite[a]));
        }
        /*result.push({'website':refine(cite[0])});
        result.push({'description':refine(cite[1])});
        result.push({'propertis':refine(cite[2])});*/
        return result;
    }
    
    request(urlsearch, function (error, response, body) {
            //console.log(response);
            
            if(error) throw error;
            
            //gBody = body;
            /*var next = body.toString().split('<a class="fl" href="');
            //next = 'https://www.google.com' + next[next.length - 1].split('"')[0];
            next = 'https://www.google.com' + next[1].split('"')[0];*/
            
            var tbody = body.toString().split('<tbody')[1];
            tbody = tbody.split("</tbody>")[0];
            //var table = tbody.split('<table')[1];
            var tr = tbody.split("<tr>"); //many tr
        
            for(var a = 2; a < tr.length; a++){
                var td = tr[a].split("<td>");//begining, many 2
                //console.log(td);
            
                var td2 = td[0].split("<td style=");//begining, 0
                //console.log(td2);
                
                for(var b = 1; b < td2.length; b++){
                    //refining process
                    var aHref = td2[b].split("<a href=");
                    aHref = aHref[1].split('</a><br>')[0];
                    var img = aHref.split("<img height=")[1].split(' ')[1].replace('src="','').replace('"','');//ready
                    var citeT = td2[b].split('<cite title=');
                    citeT = citeT[1].split('</td>')[0].split('<br>');//the last 2, comment and dimensions and size, first is website
                    var search = aHref.split('alt="')[1].replace('>','').replace('"',''); //ready
                    //var title = td2[1].split('</cite><br>');
                
                    temp.push({'img': img, 'search': unhtml(search), 'website': cleanCite(citeT)[0], 'desc':cleanCite(citeT)[1], 'info':cleanCite(citeT)[2]});
                
                }
            }
            
        //console.log('scrapinggooglesearch');
        //console.log(end - parseInt(start));
        for(var c = 0; c < (temp.length); c++){
            result.push(temp[c]);
        }   
        
        //newResult.push(result);
            
        //console.log(result.length);
        //console.log(result);
        callback(error,result,body);
    });

    
};