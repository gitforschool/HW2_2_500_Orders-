var express = require('express');
var router = express.Router();

// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

const SalesOrders = require('../SalesOrder');

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection
const dbURI =
 " mongodb+srv://Nicole922:1982_Benji@cluster.17qlh.mongodb.net/SalesOrderInt?retryWrites=true&w=majority";

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});
 
/* post a new Order and push to Mongo */
router.post('/NewSales', function(req, res) {

  let oneNewSalesOrder = new SalesOrders(req.body); 
    console.log(req.body);
    oneNewSalesOrder.save((err, salesOrder) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
      console.log(salesOrder);
     
      res.status(201).json(salesOrder);
      }
    });
});


module.exports = router;