var express = require("express");
var getBranch = require("../controller/branchController");

var router = express.Router();
router.get("/branch", getBranch);
module.exports = router;
