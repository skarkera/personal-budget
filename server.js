//Budget API
const express = require('express');
//const cors = require('cors');
const app = express();
const port = 3002;
const mongoose = require("mongoose");

const Budget = require("./restapi/budgetModel");
const path = require('path');
const bodyParser = require('body-parser');


mongoose.connect("mongodb://localhost:27017/budget", {useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
    console.log("Connected to database");

    Budget.find({})
            .then((data)=>{
                console.log(data)
            })
            .catch((connectionError)=>{
                console.log(connectionError)
            })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
var routes = require('./restapi/budgetRoutes');
routes(app);
//app.use(cors());

const budget = require("./budget-data.json");

 app.get('/budget', (req, res) => {
    res.send(budget);
}); 

app.get('/',function(req,res){ 
    res.sendFile(path.join(__dirname+'/public/index.html')); 
  });

app.listen(port, () => {
   console.log(`API served at http://localhost:${port}`);
});

console.log('Budget data-  RESTful web services with Nodejs started on: ' + port);

})
.catch((connectionError)=>{
 console.log(connectionError)
})
