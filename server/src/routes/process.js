const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/run-analysis', function(req, res, next) {

    const {spawn} = require("child_process"); 
    const process = spawn('python3',[path.join(__dirname,"/../../../", "crawl_profile.py"), 
                              req.query.username] );
    process.stdout.on('data', (data) => {
        console.log(data.toString());
        //res.send({success: true, message: `Process has been started ${req.query.username}`, data: data.toString()});
    });
    
    process.stderr.on('data', (data) => {
        console.log(data.toString());
        //res.send({success: false, message: `Error while executing  ${req.query.username}`, data: data.toString()});
      });
    
    process.on('close', (code) => {
        if (code !== 0) {
          console.log(`grep process exited with code ${code}`);
        }
    });
    res.send({success: true, message: `Process has been started ${req.query.username}`, process: process.id});
});

module.exports = router;
