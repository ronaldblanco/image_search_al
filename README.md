Created by Ronald Blanco.

mailto:pnald.blanco@gmail.com<br>
https://github.com/ronaldblanco<br>
https://www.linkedin.com/in/ronald-blanco-carrazana-5b506268/<br>
http://codepen.io/ronaldblanco/#<br>
https://www.freecodecamp.com/ronaldblanco<br>

Image Search Abstraction Layer

User Story: I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
User Story: I can paginate through the responses by adding a ?offset=2 parameter to the URL.
User Story: I can get a list of the most recently submitted search strings.

Example usage:

    https://.../api/imagesearch/lolcats%20funny?offset=10
    https://.../api/latest/imagesearch/
    
Example output:
    
    [{"url":"https://s-media-cache-ak0.pinimg.com/236x/7b/3e/88/7b3e88f0f685954ac5ea9b262b81afa5.jpg","snippet":"ha! I sleep for like 40 hours on weekends, especially Sunday! Me ...","thumbnail":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQZ4VMAxUX5i9ybT3-_W3i_SiXZKCSU2XnhHpxRC0A_mGPtOvrpjkqhzQ","context":"https://www.pinterest.com/pin/524176844101016092/"},
    {"url":"https://img.scoop.it/f-tKCNgJWPoGzbrK5LCQhTl72eJkfbmt4t8yenImKBVvK0kTmF0xjctABnaLJIm9","snippet":"Lolcats: Ohai hooman - Lolcats - Funny Pictures...","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnKqxoHtHn8b0dYvy4VKUKWZ3obuPs3O2agntOwGzNscV-mJghnsMEQgE","context":"http://www.scoop.it/t/pictures/p/1665736655/2012/04/25/lolcats-ohai-hooman-lolcats-funny-pictures-of-cats-i-can-has"},
    ......]
    
    [{"term":"dogo","when":"2017-05-03T12:30:17.128Z"},
    {"term":"lolcats funny","when":"2017-05-03T12:27:53.653Z"},
    {"term":"lolcats funny","when":"2017-05-03T12:06:33.727Z"},
    {"term":"lolcats funny","when":"2017-05-03T12:04:10.712Z"},
    {"term":"lolcats funny","when":"2017-05-03T12:03:38.291Z"},
    {"term":"lolcats funny","when":"2017-05-03T09:52:08.174Z"},
    {"term":"lolcats funny","when":"2017-05-03T08:04:22.358Z"},
    ....]