const express = require('express');
var path = require('path');
var db = require('./backend-node/dbConfig');
var mongo = require('./backend-node/mongodbConfig');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.use(express.static(path.join(__dirname, './dist/emp-prob')));
 //const port = process.env.PORT || 8080;

//controller
list_data = function(req, res) {
    //callDb('select * from emp', res)
    var mysort = { fname: 1 };
    callMongoDb(mysort, res)
};

var callDb = function(sendQry, res){
    let result;
    db.query(sendQry, function (error, results, fields) {
        if (error) throw error;
        result = JSON.stringify(results)
        console.log('Mysql response:', result)
        res.send(JSON.parse(result))
      });
}

var callMongoDb = function (mysort, res) {
  let result;

  mongo.qry(mysort, function (error, results, fields) {
      if (error) throw error;
      result = JSON.stringify(results)
      console.log('Mongo response:', result)
      res.send(JSON.parse(result))
  })
}

//backend service
app.route('/api/emp')
.get(list_data)

app.route('/api/emp')
.post(function(req, res){
   var employee = new Object();
   employee.fname = req.body.fname
   employee.lname = req.body.lname
   employee.gender = req.body.password;
   employee.email = req.body.email;
   employee.phone = req.body.phone;
   employee.gender = req.body.gender;
   employee.department = req.body.department
   employee.dob = req.body.dob

   console.log("User name = "+employee.fname+", email is "+employee.email);

   let result = {success: false, summaryMessage: ''};
   mongo.insrtQry(employee , function (error, results, fields) {
      if (error) throw error;
      result = JSON.stringify(results)
      if(result){
        result.success = true
        result.summaryMessage = 'Employee is registred successfully'
      }
      console.log('Mongo response:', result)
   })
   res.json(result)
})



 //server startup
//app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;

