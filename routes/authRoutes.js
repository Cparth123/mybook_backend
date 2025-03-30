const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.delete("/delete", authMiddleware, authController.deleteAccount);

// Google OAuth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.json({ user: req.user, token: "Google OAuth token here" });
  }
);

module.exports = router;
