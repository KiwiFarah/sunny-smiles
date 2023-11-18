//backend server.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const cors = require('cors');
const UserData = require('./models/userData');
const { getPrediction, loadModel } = require('./loadModel');


const app = express();
const PORT = 3000;



app.use(bodyParser.json());
app.use(cors());

// Health check route
app.get('/ping', (req, res) => {
    res.send('pong');
});
// Route to save game data
app.post('/api/userdata/add', async (req, res) => {
  console.log("Received data for saving:", req.body);
  try {
      const gameData = await UserData.create(req.body);
      console.log("Game data saved successfully:", gameData);
      res.status(201).json({ message: 'Game data added successfully', data: gameData });
  } catch (error) {
      console.error("Error occurred while saving game data: ", error);
      res.status(500).json({ message: 'Error saving game data', error });
  }
});

// Route to retrieve the latest game data for a specific user
app.get('/api/userdata/latest/:username', async (req, res) => {
  try {
      const { username } = req.params;
      const latestData = await UserData.findOne({
        where: { username },
        order: [['createdAt', 'DESC']]
      });

      if (!latestData) {
        return res.status(404).json({ message: 'No user data found for this username.' });
      }

      res.json(latestData);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching user data', error });
  }
});

// Route to retrieve the latest game data for a specific user and level
app.get('/api/userdata/latest/:username/:level', async (req, res) => {
  try {
    const { username, level } = req.params;
    const latestData = await UserData.findOne({
      where: { username, level },
      order: [['createdAt', 'DESC']]
    });

    if (!latestData) {
      return res.status(404).json({ message: 'No user data found for this username and level.' });
    }

    res.json(latestData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
});

// Route to retrieve all game data
app.get('/api/userdata/all', async (req, res) => {
  try {
      const allData = await UserData.findAll();
      res.json(allData);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching all user data', error });
  }
});

// Endpoint to get predictions
app.post('/api/predict', async (req, res) => {
  try {
    const { level } = req.body;
    const predictedReactionTimePerShape = await getPrediction(level);
    
    res.json({ predictedReactionTimePerShape });
  } catch (error) {
    res.status(500).json({ message: 'Error making prediction', error });
  }
});

// Initialize the model upon server start
loadModel().catch(console.error);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
  });
});
