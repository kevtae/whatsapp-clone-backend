const express = require('express'); 
const router = express.Router();

const { postMessage, getMessage} = require("../controller/message")

router.post("/message/new", postMessage);
router.get("/message/sync", getMessage);


module.exports = router;