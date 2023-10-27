//backend server.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const cors = require('cors');
const userdataroutes = require('./userdataroutes');


const app = express();
const PORT = 3000;
const UserData = require('./models/userData');



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


// Route to retrieve the latest game data
app.get('/api/userdata/user/:userId', async (req, res) => {
  try {
      // Your logic to fetch user data here
      const userData = await UserData.findOne({ where: { userId: req.params.userId } });
      if (!userData) return res.status(404).json({ message: 'No user data found.' });
      res.status(200).json(userData);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching user data', error });
  }
});

app.use('/api/userdata', userdataroutes);

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    });