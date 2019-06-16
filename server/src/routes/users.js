var express = require('express');
var router = express.Router();

const Profile = require('../models/profile');

/* GET users page. */
router.get('/', async function(req, res, next) {
  const profile = await Profile.find({},{created_at: 0, posts: 0, bio: 0, alias: 0, tags: 0});
  res.send(profile);
});

/* GET search profile details. */
router.get('/search/:id', async function(req, res, next) {

  const profile = await Profile.findOne({_id: req.params.id}, {created_at: 0, tags: 0, bio: 0, alias: 0});
  res.send(profile);
});

router.get('/export-details', async (req, res) => {
  const profile = await Profile.find({username: req.query.name}, {_id: 0, created_at: 0, posts: 0, tags: 0, alias: 0});
  const result = profile.map((data)=> {
    return {
      username: data.username,
      bio: data.bio,
      prof_img: data.prof_img,
      bio_url: data.bio_url,
      followers: data.followers.count,
      following: data.following.count,
      created_on: data.scraped,
      tags: data.tags
    }
  });

  res.setHeader('Content-disposition', `attachment; filename=${req.query.name}-insta-report.csv`);
  res.set('Content-Type', 'text/csv');

  res.status(200).csv(result, true);
})

module.exports = router;
