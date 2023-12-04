// backend/loadModel.js
const tf = require('@tensorflow/tfjs-node');

let trainedModel;

const loadModel = async () => {
    try {
        trainedModel = await tf.loadLayersModel('file://./model/model.json');
        console.log("Model loaded successfully.");
    } catch (error) {
        console.error("Error loading the model: ", error);
    }
};

const getPrediction = async (level) => {
    if (!trainedModel) {
        console.error("Model not loaded.");
        return null;
    }

    try {
        const inputTensor = tf.tensor2d([[level]]);
        const prediction = trainedModel.predict(inputTensor).dataSync()[0];
        return prediction;
    } catch (error) {
        console.error("Error making prediction: ", error);
        return null;
    }
};

module.exports = { loadModel, getPrediction };
