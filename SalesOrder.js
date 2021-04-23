// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

// here we define a schema for our document database
// mongo does not need this, but using mongoose and requiring a 
// schema will enforce consistency in all our documents (records)
const Schema = mongoose.Schema;

const SalesOrderSchema = new Schema({
  storeID: {
    type: Number,
    required: true
  },
  salesPersonID: {
    type: Number,
    required: true
  },
  cdID: {
    type: Number,
    required: true
  },
  pricePaid: {
    type: Number,
    required: true
  },
  hourPurch: {
    type: Number,
    required: true
  },
  dayPurch: {
    type: Int,
    required: true
  }
});

module.exports = mongoose.model("SalesOrderInt", SalesOrderSchema);