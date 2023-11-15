const tf = require('@tensorflow/tfjs-node');
const axios = require('axios');
const BASE_URL = 'http://localhost:3000/api';

const shapesPerLevel = { 1: 3, 2: 4, 3: 5, 4: 6, 5: 7, 6: 8, 7: 9 };

// Function to fetch all user data
const fetchDataForTraining = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/userdata/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data for training', error);
        throw error;
    }
};

// Normalize function
const normalize = (value, min, max) => {
    return (value - min) / (max - min);
};

// Process and normalize the data
const processData = (data) => {
    const reactionTimes = data.map(d => d.timeTaken / shapesPerLevel[d.level]);
    const maxReactionTime = Math.max(...reactionTimes);

    return data.map(d => {
        return {
            normalizedLevel: normalize(d.level, 0, 7),
            normalizedReactionTime: normalize(d.timeTaken / shapesPerLevel[d.level], 0, maxReactionTime)
        };
    });
};

// Define the model architecture with LeakyReLU
const createModel = () => {
    const model = tf.sequential();

    model.add(tf.layers.dense({ units: 128, inputShape: [1] }));
    model.add(tf.layers.leakyReLU({ alpha: 0.01 }));
    model.add(tf.layers.dense({ units: 64 }));
    model.add(tf.layers.leakyReLU({ alpha: 0.01 }));
    model.add(tf.layers.dense({ units: 1 }));

    const optimizer = tf.train.adam(0.0001);

    model.compile({
        loss: 'meanSquaredError',
        optimizer: optimizer,
        metrics: ['mae']
    });

    return model;
};

const trainAndSaveModel = async () => {
    const rawData = await fetchDataForTraining();
    const processedData = processData(rawData);
    const inputs = tf.tensor2d(processedData.map(d => [d.normalizedLevel]));
    const labels = tf.tensor2d(processedData.map(d => [d.normalizedReactionTime]));

    const model = createModel();
    await model.fit(inputs, labels, {
        epochs: 200,
        validationSplit: 0.2,
        callbacks: {
            onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}`)
        }
    });

    await model.save('file://./model');
    console.log('Model trained and saved successfully.');
};

trainAndSaveModel().catch(error => console.error('Failed to train the model', error));