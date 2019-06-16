const cron = require('node-cron');
const path = require('path');
const {spawn} = require("child_process"); 

const User = require('../models/users');

const registerCronJob = function registerCronJob(data) {
    const task = cron.schedule(data.schedule, () => {
        console.log('cron job running ', data.username);
        runCrawler(data.username);
    });

    task.start();

    console.log(`Cron job registered ${data.username}`);
}

const addProfileToCron = function addProfileToCron() {

    User.find({active: true},{instagram: 1, _id: 0}, function(error, response) {
        if (error) {
            console.log("No User Found")
        } else {
            const result = response.map((data)=> data.instagram).flat();
            result.forEach(function(username) {
                console.log(`Registering cron job ${username}`);
                registerCronJob({
                    username,
                    schedule: '0 1 * * *'
                })
            })
        }
    })
}

const runCrawler = function runCrawler(username) {
    if (username) {
        const process = spawn('python3',[path.join(__dirname,"/../../../", "crawl_profile.py"), 
                              username] );
        process.stdout.on('data', (data) => {
            console.log(data.toString());
            return data.toString();
        });
        
        process.stderr.on('data', (data) => {
            console.log(data.toString());
            return data.toString();
        });
        
        process.on('close', (code) => {
            if (code !== 0) {
              console.log(`grep process exited with code ${code}`);
            }
        });

        return process;
    }

    return 0;
}

module.exports = {
    runCrawler,
    addProfileToCron,
    registerCronJob
}