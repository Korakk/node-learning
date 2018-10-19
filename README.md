# node-learning

## Morgan
"Tool" to get show the logs of every http request, it will help us to debug.

## Body-parser
We use this package to parse the body of the request because is not nicely formatted and not easy readable in nodejs.

Body-parser does not support files, it supports URL encoding, bodies and also JSON data. 

#### body-parser.url-encoded(extended) --> param extended
If it's true, supports extended bodies with rich data init and if it's false, it just supports simple bodies.

Since express version ~v4.1, body-parser is not needed, express has it installed by default and you can use it express instead of body-parser. For example:
###### BEFORE version 4.1:
```
app.use(body-parser.urlencoded({extended: false}));
app.use(body-parser.json()); 
```
###### AFTER:
```
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
```


## CORS
Cross-Origin Resource Sharing
Security measure
If server and client have the same origin all goes well, but
if the server and the client have different origin, like restful api and an angular client, we do not have the same origin. 

In the case of the restful API, we have to send some headers from the server to the client that essentially tell the client --> 'yes, you can have acces'. That's how we overcome, "disable" this mechanism. Just ensure that you send the right headers back.

Not a protection mechanism, instead you can at least decide which urls you accept. 

It's a browser defend mechanism, that's why postman isn't affected by that because it is not a browser and it is just a testing tool.
