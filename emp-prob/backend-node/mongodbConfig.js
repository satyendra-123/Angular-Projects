const mongoClient = require('mongodb').MongoClient
const assert = require('assert');

var db;

/* var mlabMongoUsr = 'admin';
var mlabMongoPwd = 'kotiys'  */
var connectionInfo = {
    useNewUrlParser: true,
    mlabMongoUrl : "",
    dbName : 'monglabdb'
}

if(process.env.VCAP_SERVICES){
    var services = JSON.parse(process.env.VCAP_SERVICES);
    var mongoConfig = services["user-provided"];
    if(mongoConfig){
        var node = mongoConfig[0];
        connectionInfo.mlabMongoUrl = node.credentials.uri
    }
}else{
    connectionInfo.mlabMongoUrl = '<put uri here>'
}

 mongoClient.connect(connectionInfo.mlabMongoUrl, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to mongo lab ms azure us west server");
    db = client.db(connectionInfo.dbName);

    //insert document query
  /*    insertDocuments(db, function(){
        client.close();
    })  */
    //client.close();
});


//retrive data query
var retrieveResultQry = function(mysort, callback){
    const collection = db.collection('employees');
    console.log('test logger '+JSON.stringify(mysort))
    collection.find().sort(mysort).toArray(function(err, docs) {
        console.log('recieved documents from employees db {} ',docs);
        callback(err, docs);
    });
  }

var insertQry = function(data, callback){
    const collection = db.collection('employees');
    collection.insertOne(data, function(err, res){
      if (err) throw err;
      console.log("1 document inserted");
      callback(err, 'employee data inserted {}');
    })
  }

exports.qry = retrieveResultQry
exports.insrtQry = insertQry

//module.exports = db
