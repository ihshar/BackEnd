const express = require('express');
const router = express.Router();

const {dummyLikeController} = require('../controllers/LikeController');

router.get("/dummyroute",dummyLikeController);

module.exports = router;