//console.log('http://www.example.com-> ' + /^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/.test('http://www.example.com'));
//console.log('UNIX_PARAMETER-> ' + /[^a-zA-Z%,_]{12}/.test(href.replace('/','')));

var check = 'http://foo.com:80'.match("^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]");
if(check != null){
console.log(check[0]);
} else check;
