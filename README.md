# node-learning

##Morgan
"Tool" to get show the logs of every http request, it will help us to debug.

##Body-parser
We use this package to parse the body of the request because is not nicely formatted and not easy readable in nodejs.

Body-parser does not support files, it supports URL encoding, bodies and also JSON data. 

####body-parser.url-encoded(extended) --> param extended
If it's true, supports extended bodies with rich data init and if it's false, it just supports simple bodies.

Since express version ~v4.1, body-parser is not needed, express has it installed by default and you can use it express instead of body-parser. For example:
######BEFORE version 4.1:
```
app.use(body-parser.urlencoded({extended: false}));
app.use(body-parser.json()); 
```
######AFTER:
```
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
```


##CORS
Cross-Origin Resource Sharing
Security measure
If server and client have the same origin all goes well, but
if the server and the client have different origin, like restful api and an angular client, we do not have the same origin. 

In the case of the restful API, we have to send some headers from the server to the client that essentially tell the client --> 'yes, you can have acces'. That's how we overcome, "disable" this mechanism. Just ensure that you send the right headers back.

Not a protection mechanism, instead you can at least decide which urls you accept. 

It's a browser defend mechanism, that's why postman isn't affected by that because it is not a browser and it is just a testing tool.

## DataBase
### MongoDB Atlas
MongoDB database in the cloud, why we use that, because build a really scalable mongodb and classes, relations and a cluster with db replicating information, etc. That is done for you on mongoDB atlas. We can work with it like we work with the local mongoDB.np

Mongoose works with models and schemas. So first of all we need to create a mongoose model(js object).


The model then is the object itself or gives you a constructor based on the schema I could say.

You actually don't need exec() for save().

#### Patch
With patch we can not add any new properties to the DB object that we've created, just modify existent one's.

Possible errors handled --> Invalid object ID, we get 500.
                        --> Valid ID but no match found, we get 404.
                        --> Valid ID, with match found, we get 200.
## Creating relations between entities.
At the schema on the model file, you should use ref and ref should contain the name of the other model.