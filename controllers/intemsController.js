
const MainModel = require("../models/item");

// Reusable function for adding items
const addItem = async (field, req, res) => {
  try {
    const userId = req.user.id;
    const newItem = req.body;
    let main = await MainModel.findOne({ userId });

    if (!main) {
      main = new MainModel({ userId, [field]: [newItem] });
      await main.save();
      return res.status(201).json(main);
    }

    main[field].push(newItem);
    await main.save();
    res.status(201).json(main);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reusable function for updating items
const updateItem = async (field, req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const updatedData = req.body;

    const main = await MainModel.findOneAndUpdate(
      { userId, [`${field}._id`]: id },
      { $set: { [`${field}.$`]: updatedData } },
      { new: true }
    );

    if (!main) {
      return res.status(404).json({ error: `${field} item not found` });
    }

    res.json(main);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reusable function for deleting items
const deleteItem = async (field, req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const main = await MainModel.findOneAndUpdate(
      { userId },
      { $pull: { [field]: { _id: id } } },
      { new: true }
    );

    if (!main) {
      return res.status(404).json({ error: `${field} item not found` });
    }

    res.json(main);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reusable function to get items
const getItems = async (field, req, res) => {
  try {
    const userId = req.user.id;
    const main = await MainModel.findOne({ userId });
    if (!main || !main[field]) {
      return res.status(404).json({ error: `${field} items not found` });
    }
    res.json(main[field]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete all


// Income controllers
exports.addIncome = (req, res) => addItem("income", req, res);
exports.getIncome = (req, res) => getItems("income", req, res);
exports.updateIncome = (req, res) => updateItem("income", req, res);
exports.deleteIncome = (req, res) => deleteItem("income", req, res);

// Expense controllers
exports.addExpanse = (req, res) => addItem("expanse", req, res);
exports.getExpanse = (req, res) => getItems("expanse", req, res);
exports.updateExpanse = (req, res) => updateItem("expanse", req, res);
exports.deleteExpanse = (req, res) => deleteItem("expanse", req, res);

// Custom Icon controllers
exports.addCustomIconIncome = (req, res) => addItem("customIconIncome", req, res);
exports.getCustomIconIncome = (req, res) => getItems("customIconIncome", req, res);
exports.updateCustomIconIncome = (req, res) => updateItem("customIconIncome", req, res);
exports.deleteCustomIconIncome = (req, res) => deleteItem("customIconIncome", req, res);

exports.addCustomIconExpanse = (req, res) => addItem("customIconExpanse", req, res);
exports.getCustomIconExpanse = (req, res) => getItems("customIconExpanse", req, res);
exports.updateCustomIconExpanse = (req, res) => updateItem("customIconExpanse", req, res);
exports.deleteCustomIconExpanse = (req, res) => deleteItem("customIconExpanse", req, res);

// Single Icon controllers
exports.addSingleIcon = (req, res) => addItem("singalIcon", req, res);
exports.getSingleIcon = (req, res) => getItems("singalIcon", req, res);
exports.updateSingleIcon = (req, res) => updateItem("singalIcon", req, res);
exports.deleteSingleIcon = (req, res) => deleteItem("singalIcon", req, res);

// CRUD operations for 'days' items
exports.addDaysItem = (req, res) => addItem("days", req, res);
exports.getDaysItems = (req, res) => getItems("days", req, res);
exports.updateDaysItem = (req, res) => updateItem("days", req, res);
exports.deleteDaysItem = (req, res) => deleteItem("days", req, res);

// CRUD operations for 'halfMonth' items
exports.addHalfMonthItem = (req, res) => addItem("halfMonth", req, res);
exports.getHalfMonthItems = (req, res) => getItems("halfMonth", req, res);
exports.updateHalfMonthItem = (req, res) => updateItem("halfMonth", req, res);
exports.deleteHalfMonthItem = (req, res) => deleteItem("halfMonth", req, res);

// CRUD operations for 'monthly' items
exports.addMonthlyItem = (req, res) => addItem("monthly", req, res);
exports.getMonthlyItems = (req, res) => getItems("monthly", req, res);
exports.updateMonthlyItem = (req, res) => updateItem("monthly", req, res);
exports.deleteMonthlyItem = (req, res) => deleteItem("monthly", req, res);

// CRUD operations for 'yearly' items
exports.addYearlyItem = (req, res) => addItem("yearly", req, res);
exports.getYearlyItems = (req, res) => getItems("yearly", req, res);
exports.updateYearlyItem = (req, res) => updateItem("yearly", req, res);
exports.deleteYearlyItem = (req, res) => deleteItem("yearly", req, res);

// Get all data
exports.allData = async (req, res) => {
  try {
    const userId = req.user.id;
    const main = await MainModel.findOne({ userId });
    res.json(main);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};