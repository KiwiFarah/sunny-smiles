// trainModel.js

const tf = require('@tensorflow/tfjs-node'); // Make sure to use tfjs-node for better performance on the backend
const axios = require('axios');
const BASE_URL = 'http://localhost:3000/api';

// Function to fetch all user data from your server
const fetchDataForTraining = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/userdata/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data for training', error);
        throw error;
    }
};

// Process the data to the format needed for training
const processData = (data) => {
    return data.map(d => {
        const reactionTimePerShape = d.timeTaken / d.correctMatches; // Calculate reaction time per shape
        return {
            reactionTimePerShape,
            level: d.level
        };
    });
};

// Define the model architecture
const createModel = () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [1] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 }));
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'adam'
    });
    return model;
};

// Train the model with the processed data
const trainAndSaveModel = async () => {
    const rawData = await fetchDataForTraining();
    const processedData = processData(rawData);
    const inputs = tf.tensor2d(processedData.map(d => [d.level]));
    const labels = tf.tensor2d(processedData.map(d => [d.reactionTimePerShape]));

    const model = createModel();
    await model.fit(inputs, labels, {
        epochs: 100,
        callbacks: {
            onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}`)
        }
    });
    await model.save('file://./model'); // Saves the model to the 'model' directory
    console.log('Model trained and saved successfully.');
};

trainAndSaveModel().catch(error => {
    console.error('Failed to train the model', error);
});
