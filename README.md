Created by Ronald Blanco.

mailto:pnald.blanco@gmail.com<br>
https://github.com/ronaldblanco<br>
https://www.linkedin.com/in/ronald-blanco-carrazana-5b506268/<br>
http://codepen.io/ronaldblanco/#<br>
https://www.freecodecamp.com/ronaldblanco<br>

Image Search Abstraction Layer

Using Google Search Images:
User Story: I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
User Story: I can paginate through the responses by adding a ?offset=2 parameter to the URL.
User Story: I can get a list of the most recently submitted search strings.

If page does not finish loading is becouse there is not the amount of images you are asking for, in that case try less amount in offset.

Example usage:

    https://.../imagesearch/lolcats%20funny?offset=10
    https://.../latest/imagesearch/
    
Example output:
    
    {"result":
        [{"img":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRrTlU1tCIvPCZiLka4iE42P9HDWFquFY3MWqi2NE0jn1TTLAFybdpBylKX","search":"Image result for lolcats funny","website":"lolcats.com","desc":"LOLCats - Funny cat pictures","info":"490 x 379 - 45k - jpg"},
        {"img":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRwC1Qu-zMGPmny2gkfRQHiZOy8-Jp46SUBmmuwdfq0yD6J_lBSzt-xBQ","search":"Image result for lolcats funny","website":"lolcats.com","desc":"LOLCats - Page 6 - Funny cat pictures","info":"450 x 411 - 42k - jpg"},
        {"img":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTJ5GIiMhfQUp8My-DX0dHwPLrw5VjFhpIhn9iQcD03VKuDYVNCDt3Vu8w","search":"Image result for lolcats funny","website":"funnyjunk.com","desc":"Lolcats funny","info":"500 x 375 - 41k - jpg"},
        {"img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpc77esnVyfsIaFN3oueSdtD-2RcaBe5y_SP8XR0k_kDCNalerFXw32TM","search":"Image result for lolcats funny","website":"yadbw.com","desc":"Lolcats Funny Cat Pictures | yadbw.com","info":"500 x 392 - 62k - jpg"},
        {"img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLLyOSNmTA-97DH2gQiNgjtkCowZXF7qRZpqdPceVyt6bzfCMPLJ3g-h4p","search":"Image result for lolcats funny","website":"pinterest.com","desc":"Funniest Lolcats | LOLCAts funny cats | Animal Memes | Pinterest ...","info":"500 x 325 - 44k - jpg"}]
    }
    
    [{"search":"lolcats%20funny","date":"2017-05-08T12:43:04.176Z"},
    {"search":"lolcats%20funny","date":"2017-05-08T00:47:44.582Z"},
    {"search":"lolcats%20funny","date":"2017-05-08T00:34:03.918Z"},
    {"search":"lolcats%20funny","date":"2017-05-08T00:28:21.952Z"},
    {"search":"lolcats%20funny","date":"2017-05-08T00:27:07.424Z"},
    {"search":"lolcats%20funny","date":"2017-05-07T23:53:40.165Z"}]
    


