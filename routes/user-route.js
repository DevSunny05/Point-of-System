const express = require("express");
const {
    loginController,registerController
} = require("../controllers/user-controller");
const router = express.Router();

// routers
// get items

router.post("/login", loginController);

// post items
router.post("/register", registerController);

module.exports = router;
