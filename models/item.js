const mongoose = require("mongoose");

// Define item schema
const ItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: false,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  icon: {
    type: String,
    default: "",
  },
});

// Define single icon schema
const SingleIconSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  qly: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

//

const savaData = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now,
  },
  income: [ItemSchema],
  expanse: [ItemSchema],
  singalIcon: [SingleIconSchema],
});

// Define the main schema
const MainSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  income: [ItemSchema],
  expanse: [ItemSchema],
  customIconIncome: [ItemSchema],
  customIconExpanse: [ItemSchema],
  singalIcon: [SingleIconSchema],
  days: [savaData],
  halfMonth: [savaData],
  monthly: [savaData],
  yearly: [savaData],
  filterItem: {
    type: Object,
    default: {},
  },
  status: {
    type: String,
    enum: ["idle", "loading", "succeeded", "failed"],
    default: "idle",
  },
  error: {
    type: String,
    default: null,
  },
});

// Define the model
const MainModel = mongoose.model("Main", MainSchema);

module.exports = MainModel;
