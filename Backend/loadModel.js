const tf = require('@tensorflow/tfjs-node');

let model;

const loadModel = async () => {
  model = await tf.loadLayersModel('file://./model/model.json');
};

const getPrediction = async (level) => {
  if (!model) {
    await loadModel(); // Load model if it's not already loaded
  }
  const inputTensor = tf.tensor2d([[level]]);
  const prediction = model.predict(inputTensor);
  return prediction.dataSync()[0]; // Return the predicted reaction time per shape
};

module.exports = {
  getPrediction,
  loadModel
};
