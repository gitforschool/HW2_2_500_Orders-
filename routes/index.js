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

/* GET all ToDos */
router.get('/SalesOrder', function(req, res) {
  // find {  takes values, but leaving it blank gets all}
  SalesOrders.find({}, (err, AllSalesOrder) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(AllSalesOrder);
  });
});




/* post a new ToDo and push to Mongo */
router.post('/NewSales', function(req, res) {

    let oneNewSalesOrder = new SalesOrders(req.body); 
    
    // call constuctor in ToDos code that makes a new mongo ToDo object


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



router.put('/UpdateSalesOrder/:id', function (req, res) {
  SalesOrders.findOneAndUpdate(
    { _id: req.params.id },
    { assignment: req.body.assignment, class: req.body.class, grade: req.body.grade,   completed: req.body.completed },
   { new: true },
    (err, assignment) => {
      if (err) {
        res.status(500).send(err);
    }
    res.status(200).json(assignment);
    })
  });


  /* GET one ToDos */
router.get('/FindSalesOrderID/:id', function(req, res) {
  console.log(req.params.id );
  SalesOrders.find({ _id: req.params.id }, (err, oneSalesOrder) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(oneSalesOrder);
  });
});

module.exports = router;