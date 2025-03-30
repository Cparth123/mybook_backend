// const express = require('express');
// const router = express.Router();
// const itemsController = require('../controllers/intemsController');

// // All Data Route
// router.get('/alldata', itemsController.allData);

// // Income routes
// router.post('/income', itemsController.addIncome);
// router.get('/income', itemsController.getIncome);
// router.put('/income/:id', itemsController.updateIncome);
// router.delete('/income/:id', itemsController.deleteIncome);

// // Expanse routes
// router.post('/expanse', itemsController.addExpanse);
// router.get('/expanse', itemsController.getExpanse);
// router.put('/expanse/:id', itemsController.updateExpanse);
// router.delete('/expanse/:id', itemsController.deleteExpanse);

// // Custom Icon routes
// router.post('/customIconIncome', itemsController.addCustomIconIncome);
// router.get('/customIconIncome', itemsController.getCustomIconIncome);
// router.put('/customIconIncome/:id', itemsController.updateCustomIconIncome);
// router.delete('/customIconIncome/:id', itemsController.deleteCustomIconIncome);

// router.post('/customIconExpanse', itemsController.addCustomIconExpanse);
// router.get('/customIconExpanse', itemsController.getCustomIconExpanse);
// router.put('/customIconExpanse/:id', itemsController.updateCustomIconExpanse);
// router.delete('/customIconExpanse/:id', itemsController.deleteCustomIconExpanse);

// // Single Icon routes
// router.post('/singleIcon', itemsController.addSingleIcon);
// router.get('/singleIcon', itemsController.getSingleIcon);
// router.put('/singleIcon/:id', itemsController.updateSingleIcon);
// router.delete('/singleIcon/:id', itemsController.deleteSingleIcon);

// // Days routes
// router.post('/days', itemsController.addDaysItem);
// router.get('/days', itemsController.getDaysItems);
// router.put('/days/:id', itemsController.updateDaysItem);
// router.delete('/days/:id', itemsController.deleteDaysItem);

// // Half-Month routes
// router.post('/halfMonth', itemsController.addHalfMonthItem);
// router.get('/halfMonth', itemsController.getHalfMonthItems);
// router.put('/halfMonth/:id', itemsController.updateHalfMonthItem);
// router.delete('/halfMonth/:id', itemsController.deleteHalfMonthItem);

// // Monthly routes
// router.post('/monthly', itemsController.addMonthlyItem);
// router.get('/monthly', itemsController.getMonthlyItems);
// router.put('/monthly/:id', itemsController.updateMonthlyItem);
// router.delete('/monthly/:id', itemsController.deleteMonthlyItem);

// // Yearly routes
// router.post('/yearly', itemsController.addYearlyItem);
// router.get('/yearly', itemsController.getYearlyItems);
// router.put('/yearly/:id', itemsController.updateYearlyItem);
// router.delete('/yearly/:id', itemsController.deleteYearlyItem);

// module.exports = router;

const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/intemsController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware for authentication
const MainModel = require("../models/item");

// All Data Route (User-wise)
router.get("/alldata", authMiddleware, itemsController.allData);

// Income routes
router.post("/income", authMiddleware, itemsController.addIncome);
router.get("/income", authMiddleware, itemsController.getIncome);
router.put("/income/:id", authMiddleware, itemsController.updateIncome);
router.delete("/income/:id", authMiddleware, itemsController.deleteIncome);

// Expanse routes
router.post("/expanse", authMiddleware, itemsController.addExpanse);
router.get("/expanse", authMiddleware, itemsController.getExpanse);
router.put("/expanse/:id", authMiddleware, itemsController.updateExpanse);
router.delete("/expanse/:id", authMiddleware, itemsController.deleteExpanse);

// Custom Icon routes
router.post(
  "/customIconIncome",
  authMiddleware,
  itemsController.addCustomIconIncome
);
router.get(
  "/customIconIncome",
  authMiddleware,
  itemsController.getCustomIconIncome
);
router.put(
  "/customIconIncome/:id",
  authMiddleware,
  itemsController.updateCustomIconIncome
);
router.delete(
  "/customIconIncome/:id",
  authMiddleware,
  itemsController.deleteCustomIconIncome
);

router.post(
  "/customIconExpanse",
  authMiddleware,
  itemsController.addCustomIconExpanse
);
router.get(
  "/customIconExpanse",
  authMiddleware,
  itemsController.getCustomIconExpanse
);
router.put(
  "/customIconExpanse/:id",
  authMiddleware,
  itemsController.updateCustomIconExpanse
);
router.delete(
  "/customIconExpanse/:id",
  authMiddleware,
  itemsController.deleteCustomIconExpanse
);

// Single Icon routes
router.post("/singleIcon", authMiddleware, itemsController.addSingleIcon);
router.get("/singleIcon", authMiddleware, itemsController.getSingleIcon);
router.put("/singleIcon/:id", authMiddleware, itemsController.updateSingleIcon);
router.delete(
  "/singleIcon/:id",
  authMiddleware,
  itemsController.deleteSingleIcon
);

// Days routes
router.post("/days", authMiddleware, itemsController.addDaysItem);
router.get("/days", authMiddleware, itemsController.getDaysItems);
router.put("/days/:id", authMiddleware, itemsController.updateDaysItem);
router.delete("/days/:id", authMiddleware, itemsController.deleteDaysItem);

// Half-Month routes
router.post("/halfMonth", authMiddleware, itemsController.addHalfMonthItem);
router.get("/halfMonth", authMiddleware, itemsController.getHalfMonthItems);
router.put(
  "/halfMonth/:id",
  authMiddleware,
  itemsController.updateHalfMonthItem
);
router.delete(
  "/halfMonth/:id",
  authMiddleware,
  itemsController.deleteHalfMonthItem
);

// Monthly routes
router.post("/monthly", authMiddleware, itemsController.addMonthlyItem);
router.get("/monthly", authMiddleware, itemsController.getMonthlyItems);
router.put("/monthly/:id", authMiddleware, itemsController.updateMonthlyItem);
router.delete(
  "/monthly/:id",
  authMiddleware,
  itemsController.deleteMonthlyItem
);

// Yearly routes
router.post("/yearly", authMiddleware, itemsController.addYearlyItem);
router.get("/yearly", authMiddleware, itemsController.getYearlyItems);
router.put("/yearly/:id", authMiddleware, itemsController.updateYearlyItem);
router.delete("/yearly/:id", authMiddleware, itemsController.deleteYearlyItem);

// Delete multiple categories
router.delete("/clear-multiple", authMiddleware, async (req, res) => {
  try {
    const { categories } = req.body; // Expecting ["income", "expanse", "customIconIncome", ...]

    if (!categories || !Array.isArray(categories)) {
      return res.status(400).json({ message: "Invalid categories format" });
    }

    const userId = req.user.id;

    // Build the update object dynamically
    let updateQuery = {};
    categories.forEach((category) => {
      updateQuery[category] = [];
    });

    const updatedData = await MainModel.findOneAndUpdate(
      { userId },
      { $set: updateQuery },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "User data not found" });
    }

    return res.status(200).json({
      message: "Selected categories cleared successfully",
      updatedData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;

module.exports = router;
