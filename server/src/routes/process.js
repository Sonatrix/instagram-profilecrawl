const express = require('express');
const path = require('path');
const {runCrawler} = require('../services/process');

const router = express.Router();

router.get('/run-analysis', async function(req, res, next) {
    // run crawler
    const {username} = req.query;
    if (!username) {
        res.send({error: true, message: "username field is required!"});
    } else {
        const {pid} = await runCrawler(username);
        res.send({success: true, message: `Process has been started ${username}`, process: pid});
    }
});

module.exports = router;
