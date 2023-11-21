const tf = require('@tensorflow/tfjs-node');

// Load the trained model
const loadModel = async () => {
    try {
        const model = await tf.loadLayersModel('file://./model/model.json');
        return model;
    } catch (error) {
        console.error('Error loading the trained model', error);
        throw error;
    }
};

// Normalize function
const normalize = (value, min, max) => {
    return (value - min) / (max - min);
};

const getPrediction = async (level) => {
    const model = await loadModel();
    const normalizedLevel = normalize(level, 1, 7); 

    const inputTensor = tf.tensor2d([[normalizedLevel]]);
    const prediction = model.predict(inputTensor).dataSync()[0];

    const maxReactionTimePerShape = 4; 
    const deNormalizedPrediction = prediction * maxReactionTimePerShape;

    return Math.max(0, deNormalizedPrediction);
};

module.exports = { getPrediction };
