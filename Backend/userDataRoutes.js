//backend userdataroutes.js
const { getPrediction } = require('./mlModel.js');
const UserData = require('./models/userData'); 
const express = require('express');
const router = express.Router();

router.get('/report', async (req, res) => {
  try {
    const latestUserData = await UserData.findOne({ order: [['createdAt', 'DESC']] });
    if (!latestUserData) return res.status(404).json({ message: 'No user data found.' });

    const prediction = getPrediction(model, latestUserData.timeTaken, latestUserData.correctMatches, latestUserData.incorrectAttempts);

    res.json({
      timeTaken: latestUserData.timeTaken,
      correctMatches: latestUserData.correctMatches,
      incorrectAttempts: latestUserData.incorrectAttempts,
      prediction
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
});add:
module.exports = router;
