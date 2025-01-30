const { Router, application } = require("express");
const { signup } = require("../controllers/authController");
const router = Router();

router.post("/signup", signup);

module.exports = router;
